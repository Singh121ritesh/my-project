import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { ChatMistralAI } from "@langchain/mistralai";

const Geminimodel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GAMINI_API_KEY,
});

const model = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateResponse(messages) {

    const formattedMessages = messages.map((msg) => {

        if (msg.role === "user") {
            return new HumanMessage(msg.content);
        }

        if (msg.role === "assistant") {
            return new AIMessage(msg.content);
        }

        return new SystemMessage(msg.content);
    });

    const response = await Geminimodel.invoke(formattedMessages);

    return response.text;
}

export async function generateChatTitle(message) {

    const response = await model.invoke([
        new SystemMessage(
            "Generate a short chat title in 3 to 6 words based on the user's message."
        ),
        new HumanMessage(message),
    ]);

    return response.text;
}