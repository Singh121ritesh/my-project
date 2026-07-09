import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

const Dashboard = () => {
  const chat = useChat();

  const { user } = useSelector((state) => state.auth);

  const chats = useSelector((state) => state.chat.chats);

  const currentChatId = useSelector(
    (state) => state.chat.currentChatId
  );

  const isLoading = useSelector(
    (state) => state.chat.isLoading
  );

  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.loadChats();
  }, []);

  const currentMessages =
    chats[currentChatId]?.messages || [];

  return (
    <main className="h-screen flex bg-[#212121] text-white">

      {/* Sidebar */}

      <aside className="w-72 bg-[#171717] border-r border-[#303030] flex flex-col">

        <div className="p-4 border-b border-[#303030] flex items-center gap-3">

          

          <div>
            <h2 className="font-semibold">
              {user?.name || "My Profile"}
            </h2>

            <p className="text-sm text-gray-400">
              {user?.email}
            </p>
          </div>

        </div>

        <div className="p-4">

          <button
            onClick={() => setChatInput("")}
            className="w-full py-3 rounded-xl bg-[#2F2F2F] hover:bg-[#3a3a3a] transition"
          >
            + New Chat
          </button>

        </div>

        <div className="flex-1 overflow-y-auto px-2">

          {Object.values(chats).map((item) => (

            <div
              key={item._id}
              onClick={() => chat.loadMessages(item._id)}
              className={`p-3 rounded-xl cursor-pointer mb-2 transition ${
                currentChatId === item._id
                  ? "bg-[#3a3a3a]"
                  : "hover:bg-[#2F2F2F]"
              }`}
            >

              <h3 className="font-medium">
                {item.title}
              </h3>

            </div>

          ))}

        </div>

      </aside>

      {/* Chat Area */}

      <section className="flex-1 flex flex-col">

        <header className="h-16 border-b border-[#303030] flex items-center px-6">

          <div>

            <h2 className="font-semibold text-lg">
              AI Assistant
            </h2>

            <p className="text-sm text-green-400">
              Online
            </p>

          </div>

        </header>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8">

          {currentMessages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`w-fit max-w-[80%] rounded-2xl px-6 py-5 shadow-md ${
                  msg.role === "user"
                    ? "bg-[#303030]"
                    : "bg-[#2B2B2B] border border-[#3A3A3A]"
                }`}
              >

                <p className="text-xs text-gray-400 mb-3 font-semibold">
                  {msg.role === "user"
                    ? "You"
                    : "AI Assistant"}
                </p>

                <div
                  className="
                    prose
                    prose-invert
                    max-w-none
                    prose-headings:text-white
                    prose-headings:font-bold
                    prose-p:text-gray-200
                    prose-p:leading-8
                    prose-strong:text-white
                    prose-ul:my-4
                    prose-ol:my-4
                    prose-li:text-gray-200
                    prose-code:text-green-400
                    prose-code:bg-[#171717]
                    prose-code:px-1
                    prose-code:rounded
                    prose-pre:bg-[#171717]
                    prose-pre:border
                    prose-pre:border-gray-700
                    prose-pre:rounded-xl
                    prose-pre:p-4
                    prose-blockquote:border-l-4
                    prose-blockquote:border-green-500
                    prose-blockquote:pl-4
                    prose-table:border
                    prose-th:border
                    prose-td:border
                  "
                >

                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {msg.content}
                  </ReactMarkdown>

                </div>

              </div>

            </div>

          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#2B2B2B] border border-[#3A3A3A] px-6 py-4 rounded-2xl animate-pulse">
                 Thinking...
              </div>
            </div>
          )}
                  </div>

        {/* Input */}

        <div className="border-t border-[#303030] bg-[#212121] p-5">

          <div className="flex items-center gap-3 bg-[#2F2F2F] rounded-2xl px-5 py-2">

            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && chatInput.trim()) {
                  chat.handleSendMessage(chatInput, currentChatId);
                  setChatInput("");
                }
              }}
              placeholder="Message AI Assistant..."
              className="flex-1 bg-transparent py-3 outline-none text-white placeholder:text-gray-400"
            />

            <button
              onClick={() => {
                if (!chatInput.trim()) return;

                chat.handleSendMessage(chatInput, currentChatId);
                setChatInput("");
              }}
              className="bg-white text-black px-6 py-2 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Send
            </button>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Dashboard;