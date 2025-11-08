import React, { useState, useEffect } from 'react';
import { Box, IconButton, Fade, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ImageSlideshow = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleThumbnailClick = (e, index) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <Fade in={true} timeout={500}>
      <Box
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-in-out',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
          }}
        >
          <CloseIcon />
        </IconButton>

        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            left: 20,
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
          }}
        >
          ‹
        </IconButton>

        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            component="img"
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            sx={{
              maxWidth: '100%',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            }}
          />
          <Typography sx={{ color: 'white', fontSize: '18px', fontWeight: 600 }}>
            {currentIndex + 1} / {images.length}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            {images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={(e) => handleThumbnailClick(e, index)}
                sx={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: currentIndex === index ? '3px solid #667eea' : '3px solid transparent',
                  opacity: currentIndex === index ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                  '&:hover': { opacity: 1, transform: 'scale(1.1)' },
                }}
              />
            ))}
          </Box>
        </Box>

        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 20,
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
          }}
        >
          ›
        </IconButton>
      </Box>
    </Fade>
  );
};

export default ImageSlideshow;