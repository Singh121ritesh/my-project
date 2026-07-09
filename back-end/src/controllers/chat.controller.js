import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatmodel from "../models/chat.model.js";
import Message from "../models/massage.model.js";

export async function sendMessage(req, res) {
    try {
        const { message, chat: chatId } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        let currentChat;
        let chatTitle = null;

        if (chatId) {
            currentChat = await chatmodel.findById(chatId);

            if (!currentChat) {
                return res.status(404).json({
                    success: false,
                    message: "Chat not found"
                });
            }
        } else {
            chatTitle = await generateChatTitle(message);

            currentChat = await chatmodel.create({
                user: req.user.id,
                title: chatTitle
            });
        }

        // Purani history nikalo
        const oldMessages = await Message.find({
            chatId: currentChat._id
        }).sort({ createdAt: 1 });

        const chatHistory = oldMessages.map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        // Current user message add karo
        chatHistory.push({
            role: "user",
            content: message
        });

        // User message save karo
        await Message.create({
            chatId: currentChat._id,
            sender: req.user.id,
            content: message,
            role: "user"
        });

        // AI response generate karo
        const aiResponse = await generateResponse(chatHistory);

        // AI response save karo
        const savedMessage = await Message.create({
            chatId: currentChat._id,
            sender: req.user.id,
            content: aiResponse,
            role: "assistant"
        });

        return res.status(200).json({
            success: true,
            chatId: currentChat._id,
            chatTitle: currentChat.title,
            response: aiResponse,
            savedMessage
        });

    } catch (error) {
        console.error("Send Message Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export async function getChats(req, res) {
const user = req.user;
const chats = await chatmodel.find({ user: user.id }).sort({ createdAt: -1 });
return res.status(200).json({
    message: "Chats fetched successfully",
    success: true,
    chats   
})
}

export async function getChatMessages(req, res) {
    try {
        const { chatId } = req.params;

        const chat = await chatmodel.findOne({
            _id: chatId,
            user: req.user.id
        });

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        const messages = await Message.find({
            chatId: chat._id
        }).sort({ createdAt: 1 });

        return res.status(200).json({
            success: true,
            count: messages.length,
            messages
        });

    } catch (error) {
        console.error("Get Chat Messages Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function deleteChat(req, res) {
    try {
        const { chatId } = req.params;

        const chat = await chatmodel.findOne({
            _id: chatId,
            user: req.user.id
        });

        if (!chat) {            
            return res.status(404).json({   
                success: false, 
                message: "Chat not found"   
            });
        }

        await Message.deleteMany({ chatId: chat._id });
        await chatmodel.deleteOne({ _id: chat._id });   
        return res.status(200).json({
            success: true,
            message: "Chat deleted successfully"
        }); 
    } catch (error) {
        console.error("Delete Chat Error:", error); 
        return res.status(500).json({
            success: false, 
            message: error.message
        });
    }       
}

export async function deleteAllChats(req, res) {
    try {
        const chats = await chatmodel.find({
            user: req.user.id
        });

        const chatIds = chats.map(chat => chat._id);

        await Message.deleteMany({
            chatId: { $in: chatIds }
        });

        await chatmodel.deleteMany({
            user: req.user.id
        });

        return res.status(200).json({
            success: true,
            message: "All chats deleted successfully"
        });

    } catch (error) {
        console.error("Delete All Chats Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}