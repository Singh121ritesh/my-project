import { Router } from "express";
import { sendMessage, getChatMessages,getChats, deleteChat, deleteAllChats } from "../controllers/chat.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/message", authUser, sendMessage);
chatRouter.get("/", authUser, getChats);
chatRouter.get("/:chatId/messages", authUser, getChatMessages);
chatRouter.delete("/:chatId", authUser, deleteChat);
chatRouter.delete("/", authUser, deleteAllChats);


export default chatRouter;