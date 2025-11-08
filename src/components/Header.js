import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Chip } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import KeyIcon from '@mui/icons-material/Key';
import CodeIcon from '@mui/icons-material/Code';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import EditIcon from '@mui/icons-material/Edit';

const Header = ({
  geminiApiKey,
  darkMode,
  toggleDarkMode,
  handleNewChat,
  setShowApiKeyDialog,
  setShowPromptDialog,
  handleOpenSlideshow,
  images,
  currentImageIndex,
}) => {
  return (
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

        {/* Branding/Profile Image Slideshow */}
        <Box
          sx={{
            position: 'relative',
            width: '40px',
            height: '40px',
            mr: 2,
          }}
        >
          <Box
            component="img"
            src={images[currentImageIndex]}
            alt="Branding"
            onClick={handleOpenSlideshow}
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              objectFit: 'cover',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
              transition: 'opacity 0.5s ease-in-out, transform 0.2s ease',
              animation: 'fadeIn 0.5s ease-in-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0.7 },
                '100%': { opacity: 1 },
              },
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              },
            }}
          />
        </Box>

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
          onClick={() => setShowPromptDialog(true)}
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
          title="Edit System Prompt"
        >
          <EditIcon />
        </IconButton>
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
  );
};

export default Header;
