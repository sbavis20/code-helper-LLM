import { GoogleGenerativeAI } from '@google/generative-ai';

const getGeminiChatResponse = async (apiKey, chatHistory, newMessage) => {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const chat = model.startChat({
  history: chatHistory.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.message }],
  })),
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0.4,  // lower = more deterministic, safer for code
    topP: 0.9,         // gives minor creative flexibility (naming/refactoring)
  },
});


    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    let errorMessage = "Error: Unable to get a response from Gemini API. ";

    if (error.message && error.message.includes('API key not valid')) {
      errorMessage += "Please check your API key.";
    } else if (error.message && error.message.includes('network error')) {
      errorMessage += "Please check your internet connection.";
    } else {
      errorMessage += "Please try again.";
    }
    return errorMessage;
  }
};

export default getGeminiChatResponse;