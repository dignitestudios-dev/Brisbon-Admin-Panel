import React from "react";

const ChatList = ({ chats, selectedChat, onSelectChat }) => {
  return (
    <aside className="w-1/3 max-w-sm bg-white border-r flex flex-col">
      <div className="px-6 py-5 bg-[#46656E] rounded-l-sm rounded-b-sm">
        <h2 className="text-2xl font-semibold text-white">Chats</h2>
      </div>
      <div className="overflow-y-auto flex-1">
        {chats.map((chat) =>
        {
          if (chat?.user?.name) {
            
          }
          return(
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className={`flex items-center gap-4 p-4 transition-all cursor-pointer border-b hover:bg-gray-50 ${
                selectedChat?.id === chat.id
                  ? "bg-gray-50 border-l-4 border-[#46656E]"
                  : ""
              }`}
            >
              <div className="relative">
    <img
      src={chat?.user?.profilePicture}
      alt={chat?.user?.name}
      className="w-11 h-11 rounded-full object-cover"
    />
    {/* <span
      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
        chat.is_deactivate ? "bg-gray-400" : "bg-green-500"
      }`}
    /> */}
  </div>
  
              <div>
                <p className="font-medium">{chat?.user?.name}</p>
                {/* <p className="text-sm text-gray-500">{chat?.email}</p> */}
              </div>
            </div>
          )

        }
        
        )}
      </div>
    </aside>
  );
};

export default ChatList;
