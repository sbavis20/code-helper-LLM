import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import ProblemForm from './ProblemForm';

const InitialView = ({ handleProblemSubmit, loading, darkMode }) => {
  const theme = {
    text: darkMode ? '#e6edf3' : '#333',
    textSecondary: darkMode ? '#8b949e' : '#666',
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        py: 3,
        px: { xs: 2, sm: 3 },
        position: 'relative',
      }}
    >
      {/* Subtle Background Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: darkMode
            ? 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(102, 126, 234, 0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 4,
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: darkMode
                ? '0 8px 24px rgba(102, 126, 234, 0.25)'
                : '0 8px 24px rgba(102, 126, 234, 0.2)',
              mb: 2,
            }}
          >
            <CodeIcon sx={{ fontSize: 32, color: 'white' }} />
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              fontSize: { xs: '1.75rem', sm: '2rem' },
            }}
          >
            CodeMate
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              color: theme.textSecondary,
              fontSize: { xs: '0.95rem', sm: '1rem' },
            }}
          >
            Your AI pair programmer is ready to help
          </Typography>
        </Box>

        {/* Form with Beautiful Card Wrapper */}
        <Box
          sx={{
            width: '100%',
            maxWidth: '700px',
            backgroundColor: darkMode ? 'rgba(22, 27, 34, 0.8)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: `1px solid ${darkMode ? 'rgba(102, 126, 234, 0.15)' : 'rgba(102, 126, 234, 0.1)'}`,
            boxShadow: darkMode
              ? '0 8px 32px rgba(0, 0, 0, 0.4)'
              : '0 8px 32px rgba(102, 126, 234, 0.08)',
            overflow: 'hidden',
          }}
        >
          {/* Accent Bar */}
          <Box
            sx={{
              height: '3px',
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
            }}
          />

          <ProblemForm onSubmit={handleProblemSubmit} disabled={loading} darkMode={darkMode} />
        </Box>

        {/* Footer Text */}
        <Typography
          variant="caption"
          sx={{
            color: theme.textSecondary,
            mt: 3,
            opacity: 0.7,
            fontSize: '0.85rem',
          }}
        >
          Powered by Gemini AI MADE BY Sbavis20
        </Typography>
      </Box>
    </Container>
  );
};

export default InitialView;
