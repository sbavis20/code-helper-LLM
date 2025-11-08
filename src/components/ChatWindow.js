import React, { useRef, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import Message from './Message';

const ChatWindow = ({ messages, loading, darkMode }) => {
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  // Your EXACT empty state — untouched
  const EmptyState = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        opacity: 0.5,
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
        }}
      >
        💬
      </Box>
      <Typography
        variant="h6"
        sx={{
          color: '#666',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        Ready to help you code
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#999',
          textAlign: 'center',
          maxWidth: '400px',
          lineHeight: 1.6,
        }}
      >
        I'll analyze your problem, provide solutions, and help you refine your code through conversation
      </Typography>
    </Box>
  );

  // Your EXACT loading animation — untouched
  const LoadingIndicator = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mt: 2,
        mb: 1,
        ml: 2,
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <CircularProgress
          size={20}
          thickness={4}
          sx={{
            color: 'white',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography
          variant="body2"
          sx={{
            color: darkMode ? '#e6edf3' : '#333',
            fontWeight: 600,
          }}
        >
          Gemini is thinking...
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#667eea',
                animation: 'pulse 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.2}s`,
                '@keyframes pulse': {
                  '0%, 100%': {
                    opacity: 0.3,
                    transform: 'scale(0.8)',
                  },
                  '50%': {
                    opacity: 1,
                    transform: 'scale(1.2)',
                  },
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );

  // Show empty state
  if (messages.length === 0 && !loading) {
    return <EmptyState />;
  }

  return (
    <Box
      ref={scrollContainerRef}
      sx={{
        flexGrow: 1,
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
        // Custom scrollbar styles
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(102, 126, 234, 0.2)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(102, 126, 234, 0.3)',
        },
        // Firefox scrollbar
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(102, 126, 234, 0.2) transparent',
      }}
    >
      {messages.map((msg, index) => (
        <Message
          key={index}
          message={msg.message}
          sender={msg.sender}
          darkMode={darkMode}
        />
      ))}

      {loading && <LoadingIndicator />}

      {/* Invisible element to scroll to */}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatWindow;
