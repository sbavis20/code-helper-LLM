import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import ApiKeyDialog from './components/ApiKeyDialog';
import ImageSlideshow from './components/ImageSlideshow';
import PromptEditDialog from './components/PromptEditDialog';
import Header from './components/Header';
import InitialView from './components/InitialView';
import MainView from './components/MainView';
import getGeminiChatResponse from './utils/geminiApi';
import './App.css';

function App() {
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(localStorage.getItem('geminiApiKey') || '');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [problemData, setProblemData] = useState(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState(30);
  const [isResizing, setIsResizing] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [showPromptDialog, setShowPromptDialog] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(() => {
    return localStorage.getItem('systemPrompt') || `You are **CodeMate**, an expert AI pair programmer collaborating with an experienced developer.

## Your Role
You are not a full solution generator, but an active coding collaborator.
You discuss, refine, and evolve the user's code while respecting their logic, naming conventions, and style.
When appropriate, you may offer concise hints or targeted code fragments that align with the user’s own reasoning.

## Collaboration Principles
1. Always **anchor your responses in the user's provided code, problem, and logic**.
2. You may provide **brief, relevant suggestions or code fragments**, but never rewrite the full program unless explicitly requested.
3. Focus only on the **specific change, refinement, or idea** the user wants to improve.
4. If the user’s intent is unclear, first clarify before suggesting code.
5. When suggesting code:
   - Show only **the modified fragment or diff**, not the whole file.
   - Add **brief inline comments** to explain why a change helps.
6. Keep tone conversational — like two developers pair-programming.
7. Avoid generic or historical solutions unless directly relevant to the user's approach.
8. Balance curiosity with initiative — don’t just ask questions; add value through small, thoughtful suggestions.`;
  });
  const containerRef = useRef(null);

  // Array of images for slideshow
  const images = ['/IMG1.jpg', '/IMG2.jpg', '/IMG3.jpg', '/IMG4.jpg'];

  useEffect(() => {
    if (!geminiApiKey) {
      setShowApiKeyDialog(true);
    }
  }, [geminiApiKey]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('systemPrompt', systemPrompt);
  }, [systemPrompt]);

  // Slideshow effect - rotates images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Auto-advance slideshow in modal
  useEffect(() => {
    if (!showSlideshow) return;

    const interval = setInterval(() => {
      setSlideshowIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showSlideshow, images.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      if (newWidth >= 20 && newWidth <= 50) {
        setLeftPanelWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleApiKeyClose = () => {
    setShowApiKeyDialog(false);
    setGeminiApiKey(localStorage.getItem('geminiApiKey') || '');
  };

  const handleNewChat = () => {
    setChatHistory([]);
    setConversationStarted(false);
    setProblemData(null);
    setLeftPanelWidth(30);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOpenSlideshow = () => {
    setSlideshowIndex(currentImageIndex);
    setShowSlideshow(true);
  };

  const handleCloseSlideshow = () => {
    setShowSlideshow(false);
  };

  const handleSavePrompt = (newPrompt) => {
    setSystemPrompt(newPrompt);
    setShowPromptDialog(false);
  };

  const callGeminiApi = async (history, message) => {
    if (!geminiApiKey) {
      alert('Please enter your Gemini API key first.');
      setShowApiKeyDialog(true);
      return;
    }

    setLoading(true);
    const updatedHistory = [...history, { message, sender: 'user' }];
    setChatHistory(updatedHistory.slice(-20));

    try {
      const llmResponseText = await getGeminiChatResponse(geminiApiKey, updatedHistory, message);
      if (llmResponseText && llmResponseText.trim()) {
        const llmResponse = { message: llmResponseText, sender: 'llm' };
        setChatHistory(prev => [...prev, llmResponse].slice(-20));
      }
    } catch (error) {
      console.error("Error fetching solution:", error);
      const errorMessage = { message: "Error: Could not fetch solution. Please try again.", sender: 'llm' };
      setChatHistory(prev => [...prev, errorMessage].slice(-20));
    } finally {
      setLoading(false);
    }
  };

  const handleProblemSubmit = async (formData) => {
    setProblemData(formData);
    const initialPrompt = `
${systemPrompt}

## Context Provided
- Problem Statement: ${formData.problemStatement}
- Test Cases: ${formData.testCases}
- Expected Output: ${formData.expectedOutput}
- Language: ${formData.language}

## Start
1. Briefly acknowledge the problem and summarize your understanding (1–2 lines).
2. Offer one concise observation, suggestion, or improvement based on the provided context.
3. Then invite the user to guide the next step (e.g., “Would you like to refine this part or explore an alternative?”).
`;
    setConversationStarted(true);
    await callGeminiApi([], initialPrompt);
  };

  const handleSendMessage = async (message) => {
    await callGeminiApi(chatHistory, message);
  };

  // Theme colors
  const theme = {
    bg: darkMode ? '#0a0e14' : '#ffffff',
    bgGradient: darkMode
      ? 'radial-gradient(circle at 50% 0%, rgba(102, 126, 234, 0.08) 0%, transparent 50%)'
      : 'radial-gradient(circle at 50% 0%, rgba(102, 126, 234, 0.03) 0%, transparent 50%)',
    leftPanelBg: darkMode ? '#161b22' : '#fafbfc',
    cardBg: darkMode ? '#0d1117' : 'white',
    text: darkMode ? '#e6edf3' : '#333',
    textSecondary: darkMode ? '#8b949e' : '#555',
    border: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(102, 126, 234, 0.15)',
    chatBg: darkMode ? '#0d1117' : 'white',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: theme.bg,
        backgroundImage: theme.bgGradient,
        transition: 'background-color 0.3s ease',
      }}
    >
      <Header
        geminiApiKey={geminiApiKey}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        handleNewChat={handleNewChat}
        setShowApiKeyDialog={setShowApiKeyDialog}
        setShowPromptDialog={setShowPromptDialog}
        handleOpenSlideshow={handleOpenSlideshow}
        images={images}
        currentImageIndex={currentImageIndex}
      />

      {/* Main Content */}
      {!conversationStarted ? (
        <InitialView
          handleProblemSubmit={handleProblemSubmit}
          loading={loading}
          darkMode={darkMode}
        />
      ) : (
        <MainView
          containerRef={containerRef}
          isResizing={isResizing}
          leftPanelWidth={leftPanelWidth}
          theme={theme}
          problemData={problemData}
          setIsResizing={setIsResizing}
          chatHistory={chatHistory}
          loading={loading}
          darkMode={darkMode}
          handleSendMessage={handleSendMessage}
        />
      )}

      {/* Dialogs */}
      <ApiKeyDialog open={showApiKeyDialog} onClose={handleApiKeyClose} />
      <PromptEditDialog
        open={showPromptDialog}
        onClose={() => setShowPromptDialog(false)}
        onSave={handleSavePrompt}
        prompt={systemPrompt}
      />

      {/* Full-Screen Slideshow Modal */}
      {showSlideshow && (
        <ImageSlideshow
          images={images}
          initialIndex={slideshowIndex}
          onClose={handleCloseSlideshow}
        />
      )}
    </Box>
  );
}

export default App;
