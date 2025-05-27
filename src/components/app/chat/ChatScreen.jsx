import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { addDoc, collection, db, serverTimestamp } from "../../../firebase";
import { SuccessToast } from "../../global/Toaster";

const ChatScreen = ({ selectedChat, onSendMessage, userChat }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state for the send button

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    const chatId = userChat?.id;

    const messageData = {
      sender_id: "0pou1K5DCgZGcE3GOUinUgoxp0V2",
      text: message,
      type: "Text",
      created_at: serverTimestamp(),
      client_created_at: new Date().toISOString(),
      seen: false,
    };

    setLoading(true);  // Start loading when sending the message

    try {
      const messagesRef = collection(db, "chats", chatId, "messages");
      await addDoc(messagesRef, messageData);
      SuccessToast("Message sent successfully!");
      setMessage("");  // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message: ", error);
    } finally {
      setLoading(false);  // Stop loading when done
    }
  };

  const sortedChats = selectedChat
    ?.slice()
    ?.sort((a, b) => {
      const getDate = (msg) =>
        msg.created_at?.toDate?.() ||
        (msg.client_created_at ? new Date(msg.client_created_at) : new Date(0));
      return getDate(a) - getDate(b);
    });

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior (e.g., form submission)
      handleSendMessage(); // Send message on Enter key press
    }
  };
  console.log(sortedChats, "abc")
  return (
    <main className="w-full flex flex-col bg-white overflow-y-auto">
      {selectedChat ? (
        <>
          {/* Header */}
          <header className="px-6 py-4 flex items-center justify-between bg-white border-b">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {userChat?.user?.name}
              </h3>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto bg-gray-50">
            {sortedChats?.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">
                No messages yet. Start the conversation.
              </div>
            ) : (
              sortedChats.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${chat?.sender_id === "0pou1K5DCgZGcE3GOUinUgoxp0V2"
                      ? "justify-end"
                      : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 text-sm rounded-2xl shadow ${chat?.sender_id === "0pou1K5DCgZGcE3GOUinUgoxp0V2"
                        ? "bg-[#46656E] text-white"
                        : "bg-white border border-gray-200 text-gray-800"
                      }`}
                  >
                    {
                      chat?.type == "media" ? (
                        <img src={chat.text} className="w-40 h-40" alt="" srcset="" />
                      ) : (
                        <p>{chat?.text}</p>
                      )
                    }
                    <span className="text-[10px] mt-1 block text-right text-gray-400">
                      {chat?.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input */}
          <div className="px-6 py-4 border-t bg-white bottom-0 flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-5 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#46656E]"
              onKeyDown={handleKeyPress} // Add keyDown event handler
            />
            <button
              onClick={handleSendMessage}
              className="p-2.5 rounded-md bg-[#46656E] hover:bg-[#3a545b] transition-colors text-white"
              disabled={loading}  // Disable button while loading
            >
              {loading ? (
                <div className="animate-spin rounded-full border-2 border-t-2 border-white w-5 h-5"></div>
              ) : (
                <IoSend size={20} />
              )}
            </button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 px-4">
          <p className="text-xl font-medium">Select a chat to start messaging</p>
          <p className="text-sm mt-2">Click a user from the left panel</p>
        </div>
      )}
    </main>
  );
};

export default ChatScreen;
