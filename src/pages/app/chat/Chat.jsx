import React, { useState, useEffect } from "react";
import ChatList from "../../../components/app/chat/ChatList";
import ChatScreen from "../../../components/app/chat/ChatScreen";
import { useChats } from "../../../hooks/api/Get";
import axios from "../../../axios";
import { collection, db, onSnapshot, query } from "../../../firebase";

// Spinner component (you can replace this with a spinner from a library like react-spinners)
const LoadingSpinner = () => (
  <div className="w-full h-16 flex justify-center items-center">
    <div className="w-8 h-8 border-4 border-t-transparent border-[#46656E] rounded-full animate-spin"></div>
  </div>
);

const Chat = () => {
  const { loading, chats, pagination } = useChats();  // chats fetching hook
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);  // State to track loading for messages

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    if (!chatMessages[chat.id]) {
      fetchMessages(chat.id);
    }
  };

  const fetchMessages = async (chatId) => {
    setMessagesLoading(true);  // Set loading to true when fetching messages
    try {
      const chatData = chats.find((chat) => chat.id === chatId);
      setSelectedChat(chatData);

      const messagesRef = collection(db, "chats", chatId, "messages");
      const q = query(messagesRef);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const chatMessage = [];
        querySnapshot.forEach((doc) => {
          chatMessage.push({ id: doc.id, ...doc.data() });
        });
        setMessages(chatMessage);
        setMessagesLoading(false);  // Set loading to false after messages are fetched
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessagesLoading(false);  // Set loading to false on error
    }
  };

  const handleSendMessage = async (message) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    try {
      await axios.post(`/admin/chats/${selectedChat.id}/messages`, {
        text: message,
        sender: "support",
        time,
      });

      setChatMessages((prev) => ({
        ...prev,
        [selectedChat.id]: [
          ...(prev[selectedChat.id] || []),
          { sender: "support", text: message, time },
        ],
      }));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const enhancedChats = chats.map((chat) => ({
    ...chat,
    user_name: `User ${chat.id.slice(0, 5)}`,
    user_avatar: "https://ui-avatars.com/api/?name=User&background=46656E&color=fff",
    email: "user@example.com",
    is_deactivate: false,
    messages: chatMessages[chat.id] || [],
  }));

  return (
    <div className="flex h-full bg-gradient-to-br from-gray-100 to-white text-gray-800 border rounded-md shadow-sm">
      {/* Chat List Loading */}
      {loading ? (
        <div className="w-1/3 max-w-sm p-4 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <ChatList
          chats={enhancedChats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
        />
      )}

      {/* Chat Screen Loading */}
      {selectedChat && messagesLoading ? (
        <div className="w-full p-4 flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <ChatScreen
          selectedChat={selectedChat && messages}
          onSendMessage={handleSendMessage}
          userChat={selectedChat}
        />
      )}
    </div>
  );
};

export default Chat;
