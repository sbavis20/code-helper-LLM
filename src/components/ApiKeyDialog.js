import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const ApiKeyDialog = ({ open, onClose }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    localStorage.setItem('geminiApiKey', apiKey);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Gemini API Key</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="API Key"
          type="password"
          fullWidth
          variant="standard"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiKeyDialog;
