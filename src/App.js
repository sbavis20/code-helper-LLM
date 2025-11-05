import React, { useState, useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, IconButton, Chip, Switch, FormControlLabel } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import KeyIcon from '@mui/icons-material/Key';
import CodeIcon from '@mui/icons-material/Code';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ApiKeyDialog from './components/ApiKeyDialog';
import ProblemForm from './components/ProblemForm';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
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
  const containerRef = useRef(null);

  useEffect(() => {
    if (!geminiApiKey) {
      setShowApiKeyDialog(true);
    }
  }, [geminiApiKey]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

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
You are **CodeMate**, an AI pair programmer assisting professional developers in refining and evolving their code.

Context:
The user is an experienced developer who shares a problem statement, test cases, expected output, and possibly an existing code snippet.
They do NOT want a complete solution — instead, they expect adaptive collaboration to shape the code according to their own logic and design philosophy.

Your Core Principles:
1. Understand the user's problem, constraints, and coding intent deeply.
2. Never replace or rewrite full programs unless explicitly asked.
3. When modifying or refactoring code:
   - Retain the user’s logic, naming conventions, and structure.
   - Focus on the **specific change or behavior** the user requests.
4. If something is unclear, ask short, precise clarification questions before making assumptions.
5. When responding:
   - Provide **only the relevant code fragment(s)** or concise diffs.
   - Include brief inline comments explaining the rationale.
6. Maintain full language syntax, indentation, and formatting.
7. Suggest performance or readability improvements **only** if they align with the user's direction.

Input Context:
- Problem Statement: ${formData.problemStatement}
- Test Cases: ${formData.testCases}
- Expected Output: ${formData.expectedOutput}
- Language: ${formData.language}

Your Task:
Start by acknowledging the problem briefly and ask the user what specific modification or refinement they’d like to make next.
Do not output a full solution until explicitly asked.
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
      {/* Modern AppBar */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 24px rgba(102, 126, 234, 0.3)',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          {/* Logo/Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
            <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <CodeIcon sx={{ fontSize: 24, color: 'white' }} />
            </Box>
            <Box>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                  fontSize: '20px',
                }}
              >
                Gemini Code Helper
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '11px',
                  fontWeight: 500,
                }}
              >
                AI-Powered Coding Assistant
              </Typography>
            </Box>
          </Box>

          {/* Status Chip */}
          {geminiApiKey && (
            <Chip
              label="API Connected"
              size="small"
              sx={{
                mr: 2,
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                color: '#4caf50',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                fontWeight: 600,
                fontSize: '11px',
              }}
            />
          )}

          {/* Dark Mode Toggle */}
          <IconButton 
            color="inherit" 
            onClick={toggleDarkMode}
            sx={{ 
              mr: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease',
            }}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Action Buttons */}
          <IconButton 
            color="inherit" 
            onClick={handleNewChat}
            sx={{ 
              mr: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease',
            }}
            title="New Chat"
          >
            <AddCommentIcon />
          </IconButton>
          <Button 
            color="inherit" 
            onClick={() => setShowApiKeyDialog(true)}
            startIcon={<KeyIcon />}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '10px',
              px: 2,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateY(-1px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            API Key
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      {!conversationStarted ? (
        // Initial state - centered form
        <Container 
          maxWidth="md" 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            py: 3,
            px: { xs: 2, sm: 3 },
          }}
        >
          <Box 
            sx={{ 
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ProblemForm onSubmit={handleProblemSubmit} disabled={loading} darkMode={darkMode} />
          </Box>
        </Container>
      ) : (
        // Split view - resizable
        <Box 
          ref={containerRef}
          sx={{ 
            flexGrow: 1, 
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            cursor: isResizing ? 'col-resize' : 'default',
            userSelect: isResizing ? 'none' : 'auto',
          }}
        >
          {/* Left Panel - Problem Details */}
          <Box
            sx={{
              width: `${leftPanelWidth}%`,
              borderRight: `1px solid ${theme.border}`,
              backgroundColor: theme.leftPanelBg,
              overflowY: 'auto',
              p: 3,
              transition: isResizing ? 'none' : 'width 0.2s ease, background-color 0.3s ease',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(102, 126, 234, 0.2)',
                borderRadius: '10px',
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.3)',
                },
              },
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                fontWeight: 700,
                color: '#667eea',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <CodeIcon sx={{ fontSize: 24 }} />
              Problem Details
            </Typography>

            {problemData && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1, 
                      color: theme.text,
                      textTransform: 'uppercase',
                      fontSize: '11px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Problem Statement
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: theme.cardBg,
                      borderRadius: '12px',
                      border: `1px solid ${theme.border}`,
                      boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        whiteSpace: 'pre-wrap', 
                        color: theme.textSecondary,
                        lineHeight: 1.7,
                      }}
                    >
                      {problemData.problemStatement}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1, 
                      color: theme.text,
                      textTransform: 'uppercase',
                      fontSize: '11px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Test Cases
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: theme.cardBg,
                      borderRadius: '12px',
                      border: `1px solid ${theme.border}`,
                      boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        whiteSpace: 'pre-wrap', 
                        color: theme.textSecondary,
                        fontFamily: 'monospace',
                        lineHeight: 1.7,
                      }}
                    >
                      {problemData.testCases}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1, 
                      color: theme.text,
                      textTransform: 'uppercase',
                      fontSize: '11px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Expected Output
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: theme.cardBg,
                      borderRadius: '12px',
                      border: `1px solid ${theme.border}`,
                      boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        whiteSpace: 'pre-wrap', 
                        color: theme.textSecondary,
                        fontFamily: 'monospace',
                        lineHeight: 1.7,
                      }}
                    >
                      {problemData.expectedOutput}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1, 
                      color: theme.text,
                      textTransform: 'uppercase',
                      fontSize: '11px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Language
                  </Typography>
                  <Chip
                    label={problemData.language}
                    sx={{
                      backgroundColor: '#667eea',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '13px',
                      px: 1,
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>

          {/* Resizable Divider */}
          <Box
            onMouseDown={() => setIsResizing(true)}
            sx={{
              width: '8px',
              cursor: 'col-resize',
              backgroundColor: 'transparent',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
              },
              '&:hover .drag-indicator': {
                opacity: 1,
              },
            }}
          >
            <Box
              className="drag-indicator"
              sx={{
                width: '4px',
                height: '40px',
                borderRadius: '2px',
                backgroundColor: '#667eea',
                opacity: 0,
                transition: 'opacity 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DragIndicatorIcon 
                sx={{ 
                  fontSize: 16, 
                  color: 'white',
                }} 
              />
            </Box>
          </Box>

          {/* Right Panel - Chat Area */}
          <Box
            sx={{
              width: `${100 - leftPanelWidth}%`,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: theme.chatBg,
              transition: isResizing ? 'none' : 'width 0.2s ease, background-color 0.3s ease',
            }}
          >
            <Container 
              maxWidth="xl" 
              sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                py: 3,
                px: 3,
                height: '100%',
              }}
            >
              <ChatWindow messages={chatHistory} loading={loading} darkMode={darkMode} />
              
              {/* Input Area */}
              <Box sx={{ mt: 'auto', pt: 2 }}>
                <ChatInput onSendMessage={handleSendMessage} disabled={loading} darkMode={darkMode} />
              </Box>
            </Container>
          </Box>
        </Box>
      )}

      {/* Dialogs */}
      <ApiKeyDialog open={showApiKeyDialog} onClose={handleApiKeyClose} />
    </Box>
  );
}

export default App;