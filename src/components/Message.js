import React, { useState } from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Message = ({ message, sender, darkMode }) => {
  const isUser = sender === 'user';
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const parseMarkdown = (text) => {
    // Remove markdown symbols and format text
    let formatted = text;
    
    // Handle bold text: **text** or __text__
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/__(.+?)__/g, '<strong>$1</strong>');
    
    // Handle italic text: *text* or _text_
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/_(.+?)_/g, '<em>$1</em>');
    
    // Handle inline code: `code`
    formatted = formatted.replace(/`(.+?)`/g, '<code>$1</code>');
    
    // Handle bullet points
    formatted = formatted.replace(/^\*\s+(.+)$/gm, '• $1');
    formatted = formatted.replace(/^-\s+(.+)$/gm, '• $1');
    
    // Handle numbered lists
    formatted = formatted.replace(/^\d+\.\s+(.+)$/gm, (match, p1) => {
      const num = match.match(/^(\d+)\./)[1];
      return `${num}. ${p1}`;
    });

    return formatted;
  };

  const renderContent = () => {
    // Split by code blocks (```language\ncode\n```)
    const parts = message.split(/(```[a-z]*\n[\s\S]*?\n```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const languageMatch = part.match(/^```([a-z]+)\n/);
        const language = languageMatch ? languageMatch[1] : 'text';
        const code = part.replace(/^```[a-z]*\n/, '').replace(/\n```$/, '');
        
        return (
          <Box 
            key={index} 
            sx={{ 
              my: 2,
              borderRadius: '12px',
              overflow: 'hidden',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: darkMode ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 4px 12px rgba(0, 0, 0, 0.08)',
              position: 'relative',
              backgroundColor: darkMode ? '#1e1e1e' : '#f6f8fa',
            }}
          >
            {/* Code Header */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                py: 1,
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                borderBottom: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontSize: '11px',
                }}
              >
                {language}
              </Typography>
              <Tooltip title={copiedIndex === index ? "Copied!" : "Copy code"}>
                <IconButton
                  size="small"
                  onClick={() => handleCopy(code, index)}
                  sx={{
                    color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                    '&:hover': {
                      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  {copiedIndex === index ? (
                    <CheckIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <ContentCopyIcon sx={{ fontSize: 18 }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            {/* Code Content */}
            <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
              <SyntaxHighlighter 
                language={language} 
                style={darkMode ? vscDarkPlus : vs}
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  fontSize: '14px',
                  lineHeight: '1.6',
                  padding: '16px',
                  backgroundColor: darkMode ? '#1e1e1e' : '#f6f8fa',
                }}
                codeTagProps={{
                  style: {
                    fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", "Consolas", monospace',
                  }
                }}
              >
                {code}
              </SyntaxHighlighter>
            </Box>
          </Box>
        );
      } else if (part.trim()) {
        // Parse and render text content with markdown formatting
        const formattedText = parseMarkdown(part);
        
        return (
          <Typography 
            key={index} 
            variant="body1" 
            component="div"
            sx={{ 
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
              fontSize: '15px',
              color: isUser 
                ? 'white' 
                : darkMode 
                  ? '#e6edf3' 
                  : '#24292f',
              '& strong': {
                fontWeight: 700,
                color: isUser 
                  ? 'white' 
                  : darkMode 
                    ? '#ffffff' 
                    : '#000000',
              },
              '& em': {
                fontStyle: 'italic',
                color: isUser 
                  ? 'rgba(255, 255, 255, 0.95)' 
                  : darkMode 
                    ? '#e6edf3' 
                    : '#57606a',
              },
              '& code': {
                backgroundColor: isUser 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : darkMode 
                    ? 'rgba(110, 118, 129, 0.4)' 
                    : 'rgba(175, 184, 193, 0.2)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: '"Fira Code", "Consolas", monospace',
                fontSize: '14px',
                color: isUser 
                  ? 'white' 
                  : darkMode 
                    ? '#79c0ff' 
                    : '#d73a49',
                border: isUser 
                  ? '1px solid rgba(255, 255, 255, 0.3)' 
                  : darkMode 
                    ? '1px solid rgba(110, 118, 129, 0.4)' 
                    : '1px solid rgba(175, 184, 193, 0.4)',
              }
            }}
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        );
      }
      return null;
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 3,
        animation: 'fadeIn 0.3s ease-in',
        '@keyframes fadeIn': {
          from: {
            opacity: 0,
            transform: 'translateY(10px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '85%',
          minWidth: '200px',
        }}
      >
        {/* Message bubble */}
        <Box
          sx={{
            backgroundColor: isUser 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : darkMode 
                ? '#161b22' 
                : '#f6f8fa',
            background: isUser 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : darkMode 
                ? '#161b22' 
                : '#f6f8fa',
            border: isUser 
              ? 'none' 
              : darkMode 
                ? '1px solid rgba(48, 54, 61, 1)' 
                : '1px solid #d0d7de',
            color: isUser 
              ? 'white' 
              : darkMode 
                ? '#e6edf3' 
                : '#24292f',
            p: 2.5,
            borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            wordBreak: 'break-word',
            boxShadow: isUser 
              ? '0 4px 16px rgba(102, 126, 234, 0.3)' 
              : darkMode 
                ? '0 2px 8px rgba(0, 0, 0, 0.4)' 
                : '0 2px 8px rgba(27, 31, 36, 0.15)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: isUser 
                ? '0 6px 20px rgba(102, 126, 234, 0.4)' 
                : darkMode 
                  ? '0 4px 12px rgba(0, 0, 0, 0.5)' 
                  : '0 4px 12px rgba(27, 31, 36, 0.2)',
            },
          }}
        >
          {renderContent()}
        </Box>

        {/* Sender label with timestamp */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: 0.5,
            mx: 1,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
              fontSize: '11px',
              fontWeight: 500,
              textAlign: isUser ? 'right' : 'left',
              flexGrow: 1,
            }}
          >
            {isUser ? 'You' : 'Gemini AI'}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
              fontSize: '10px',
            }}
          >
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;