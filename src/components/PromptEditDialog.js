import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

const PromptEditDialog = ({ open, onClose, onSave, prompt }) => {
  const [editedPrompt, setEditedPrompt] = useState(prompt);

  useEffect(() => {
    setEditedPrompt(prompt);
  }, [prompt, open]);

  const handleSave = () => {
    onSave(editedPrompt);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: '22px',
          pb: 1,
        }}
      >
        Edit System Prompt
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            multiline
            fullWidth
            rows={15}
            value={editedPrompt}
            onChange={(e) => setEditedPrompt(e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                fontSize: '14px',
                fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                lineHeight: 1.7,
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          p: 3,
          pt: 2,
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: '#555',
            fontWeight: 600,
            borderRadius: '10px',
            px: 2,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: '#667eea',
            fontWeight: 600,
            borderRadius: '10px',
            px: 3,
            py: 1,
            '&:hover': {
              backgroundColor: '#5568d3',
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromptEditDialog;
