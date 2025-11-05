# Gemini Code Helper

Gemini Code Helper is a web-based, conversational AI chat application designed to assist developers in solving coding problems, debugging, and generating code snippets. Powered by Google's Gemini Pro model, it provides a dynamic and interactive interface for a seamless coding assistance experience.

## Features

- **Conversational Interface**: Engage in a natural, back-and-forth chat to refine solutions and ask follow-up questions.
- **Context-Aware Responses**: The application sends the recent conversation history with each request, allowing the AI to provide contextually relevant answers.
- **Syntax Highlighting**: Code blocks in the AI's responses are automatically formatted and highlighted for readability.
- **Secure API Key Handling**: Your Gemini API key is stored securely in your browser's local storage and is never exposed on the client-side.
- **Session Management**: Easily start a new conversation and clear the chat history with the "New Chat" button.
- **Loading Indicator**: A "Gemini is typing..." indicator provides real-time feedback while the AI is generating a response.
- **Error Handling**: The application provides clear error messages for common issues like invalid API keys or network problems.

## Technology Stack

- **Frontend**: React.js
- **UI Library**: Material-UI (MUI) for a clean and modern user interface.
- **AI Model**: Google Gemini 2.5 Flash via the `@google/generative-ai` SDK.
- **Code Formatting**: `react-syntax-highlighter` for beautiful and readable code snippets.

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Node.js (v14 or later)
- npm (or yarn)

### Installation & Setup

1.  **Clone the repository (or download the source code)**.

2.  **Navigate to the project directory**:
    ```sh
    cd code-helper
    ```

3.  **Install NPM packages**:
    ```sh
    npm install
    ```

4.  **Get a Gemini API Key**:
    - Visit the [Google AI for Developers](https://ai.google.dev/) website to create your API key.

### Running the Application

1.  **Start the development server**:
    ```sh
    npm start
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

## How to Use

1.  **Enter API Key**: Upon first launch, a dialog will appear. Enter your Gemini API key and click "Save". This will be stored in your browser's local storage for future sessions. You can change the key at any time by clicking the "API Key" button in the header.

2.  **Submit a Problem**: Fill out the initial form with your problem statement, any relevant test cases, the expected output, and the programming language you are working with. Click "Get Solution" to start the conversation.

3.  **Interact with the Chat**: Once the initial response is received, the form will be replaced by a chat input field. Use this to ask follow-up questions, request modifications to the code, or ask for further clarification.

4.  **Start a New Chat**: To begin a new problem, click the "New Chat" icon in the top-right corner of the application. This will clear the current conversation and bring back the initial problem form.

## Project Structure

The application is organized into a `src` directory with the following key components:

- **`App.js`**: The main component that manages the application's state, logic, and layout.
- **`utils/geminiApi.js`**: A utility module that handles all communication with the Google Gemini API.
- **`components/`**: A directory containing all the reusable React components:
  - **`ApiKeyDialog.js`**: The modal for entering the API key.
  - **`ProblemForm.js`**: The initial form for submitting a new problem.
  - **`ChatWindow.js`**: The container that displays the chat history.
  - **`Message.js`**: The component that renders a single chat message with syntax highlighting.
  - **`ChatInput.js`**: The input field for sending follow-up messages.