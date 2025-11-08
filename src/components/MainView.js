import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

const MainView = ({
  containerRef,
  isResizing,
  leftPanelWidth,
  theme,
  problemData,
  setIsResizing,
  chatHistory,
  loading,
  darkMode,
  handleSendMessage,
}) => {
  return (
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
  );
};

export default MainView;
