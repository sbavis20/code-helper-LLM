import React, { useState } from 'react';
import { TextField, IconButton, Box, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 1.5,
        p: 2,
        mt: 2,
        backgroundColor: '#f8f9fa',
        borderRadius: '16px',
        border: '1px solid rgba(102, 126, 234, 0.15)',
        transition: 'all 0.2s ease',
        '&:focus-within': {
          borderColor: '#667eea',
          backgroundColor: '#ffffff',
          boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
        },
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={6}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message... (Shift + Enter for new line)"
        disabled={disabled}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: '15px',
            lineHeight: 1.6,
            color: '#333',
            '& textarea': {
              '&::placeholder': {
                color: '#999',
                opacity: 1,
              },
            },
          },
        }}
        sx={{
          '& .MuiInputBase-root': {
            padding: '8px 0',
          },
        }}
      />
      <IconButton
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        sx={{
          backgroundColor: message.trim() && !disabled ? '#667eea' : '#e0e0e0',
          color: 'white',
          width: '44px',
          height: '44px',
          flexShrink: 0,
          '&:hover': {
            backgroundColor: message.trim() && !disabled ? '#5568d3' : '#e0e0e0',
            transform: message.trim() && !disabled ? 'scale(1.05)' : 'none',
          },
          '&:disabled': {
            backgroundColor: '#e0e0e0',
            color: '#999',
          },
          transition: 'all 0.2s ease',
        }}
        title="Send message"
      >
        <SendIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Paper>
  );
};

export default ChatInput;