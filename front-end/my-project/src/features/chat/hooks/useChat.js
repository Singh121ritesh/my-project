import {
  setChats,
  setCurrentChatId,
  setLoading,
  setError,
} from "../chat.slice";

import { initSocketConnection } from "../service/chat.socket";

import {
  sendMessage,
  getChats,
  getChatById,
  deleteChat,
} from "../service/chat.api";

import { useDispatch, useSelector } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chat.chats);

  // ------------------------
  // Socket
  // ------------------------

  const initializeSocketConnection = () => {
    initSocketConnection();
  };

  // ------------------------
  // Send Message
  // ------------------------

  const handleSendMessage = async (message, currentChatId) => {
    if (!message.trim()) return;

    try {
      dispatch(setLoading(true));

      const data = await sendMessage({
        message,
        chatId: currentChatId,
      });

      const chatId = data.chatId;

      const assistantMessage = {
        role: "assistant",
        content: data.response,
      };

      const userMessage = {
        role: "user",
        content: message,
      };

      const oldChat = chats[chatId] || {
        _id: chatId,
        title: data.chatTitle,
        messages: [],
      };

      const updatedChats = {
        ...chats,

        [chatId]: {
          ...oldChat,

          _id: chatId,

          title: data.chatTitle,

          messages: [
            ...oldChat.messages,
            userMessage,
            assistantMessage,
          ],
        },
      };

      dispatch(setChats(updatedChats));

      dispatch(setCurrentChatId(chatId));
    } catch (err) {
      console.log(err);

      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ------------------------
  // Load All Chats
  // ------------------------

  const loadChats = async () => {
    try {
      const data = await getChats();

      const formattedChats = {};

      data.chats.forEach((chat) => {
        formattedChats[chat._id] = {
          ...chat,
          messages: [],
        };
      });

      dispatch(setChats(formattedChats));
    } catch (err) {
      console.log(err);
    }
  };

  // ------------------------
  // Load Messages
  // ------------------------

  const loadMessages = async (chatId) => {
    try {
      const data = await getChatById(chatId);

      const updatedChats = {
        ...chats,

        [chatId]: {
          ...chats[chatId],
          messages: data.messages,
        },
      };

      dispatch(setChats(updatedChats));

      dispatch(setCurrentChatId(chatId));
    } catch (err) {
      console.log(err);
    }
  };

  // ------------------------
  // Delete Chat
  // ------------------------

  const removeChat = async (chatId) => {
    try {
      await deleteChat(chatId);

      const updatedChats = { ...chats };

      delete updatedChats[chatId];

      dispatch(setChats(updatedChats));

      dispatch(setCurrentChatId(null));
    } catch (err) {
      console.log(err);
    }
  };

  return {
    initializeSocketConnection,
    handleSendMessage,
    loadChats,
    loadMessages,
    removeChat,
  };
};