"use client";

import React, { useState } from "react";
import { MessageCircle, Plus, ArrowLeft, Trash2, Send } from "lucide-react";


type Message = {
  id: number;
  text: string;
  sender: "me" | "them"; 
  timestamp: string;
};

type Chat = {
  id: number;
  name: string;
  avatar: string;
  messages: Message[];
};

const Home = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Caressa Jessalin",
      avatar: "/Ellipse 14.jpg",
      messages: [
        { id: 1, text: "Hello! 👋", sender: "them", timestamp: "12:01 PM" },
        { id: 2, text: "How can I help you?", sender: "them", timestamp: "12:02 PM" },
        { id: 3, text: "I need some assistance", sender: "me", timestamp: "12:03 PM" },
      ],
    },
    {
      id: 2,
      name: "Letty Bride",
      avatar: "/Ellipse 14.jpg",
      messages: [
        { id: 1, text: "Hi there!", sender: "them", timestamp: "11:30 AM" },
        { id: 2, text: "Sure, what do you need?", sender: "me", timestamp: "11:31 AM" },
      ],
    },
  ]);

  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat.id) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              id: chat.messages.length + 1,
              text: newMessage,
              sender: "me",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ],
        };
      }
      return chat;
    });

    setChats(updatedChats);
    const updatedActiveChat = updatedChats.find((chat) => chat.id === activeChat.id) || null;
    setActiveChat(updatedActiveChat);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBack = () => {
    setActiveChat(null);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
    
      <div className="w-80 border-r border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-semibold mb-4">ALL YOUR CHATS</h1>
          <div className="bg-pink-200 bg-opacity-20 p-3 rounded-lg mb-4">
            <div className="flex items-center text-pink-300">
              <MessageCircle className="w-5 h-5 mr-2" />
              <span>Chat Images: ON</span>
            </div>
          </div>
          <div className="space-y-4">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                  activeChat?.id === chat.id ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
                onClick={() => setActiveChat(chat)}
              >
                <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <p className="font-medium">{chat.name}</p>
                  <p className="text-sm text-gray-400 truncate">
                    {chat.messages[chat.messages.length - 1]?.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center space-x-2 mt-4 text-pink-300">
            <Plus className="w-5 h-5" />
            <span>Create new bot</span>
          </button>
        </div>
      </div>

   
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
         
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
                <span className="font-medium">{activeChat.name}</span>
              </div>
              <div className="flex space-x-4">
                <button
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={handleBack}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

        
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === "me"
                        ? "bg-pink-200 bg-opacity-20 text-pink-300"
                        : "bg-gray-800"
                    }`}
                  >
                    <div>{message.text}</div>
                    <div className="text-xs text-gray-400 mt-1">{message.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>

         
            <div className="p-4 border-t border-gray-800">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Message"
                  className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-pink-500 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h2 className="text-xl font-semibold mb-2">Welcome to Messages</h2>
              <p>Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
