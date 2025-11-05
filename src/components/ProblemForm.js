import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';

const ProblemForm = ({ onSubmit, disabled }) => {
  const [problemStatement, setProblemStatement] = useState('');
  const [testCases, setTestCases] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [language, setLanguage] = useState('javascript'); // Default language

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ problemStatement, testCases, expectedOutput, language });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Problem Statement"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        variant="outlined"
        value={problemStatement}
        onChange={(e) => setProblemStatement(e.target.value)}
        required
        disabled={disabled}
      />
      <TextField
        label="Test Cases (e.g., Input: 5, Output: 120)"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        variant="outlined"
        value={testCases}
        onChange={(e) => setTestCases(e.target.value)}
        disabled={disabled}
      />
      <TextField
        label="Expected Output (Optional)"
        multiline
        rows={2}
        fullWidth
        margin="normal"
        variant="outlined"
        value={expectedOutput}
        onChange={(e) => setExpectedOutput(e.target.value)}
        disabled={disabled}
      />
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="language-select-label">Language</InputLabel>
        <Select
          labelId="language-select-label"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          label="Language"
          disabled={disabled}
        >
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="cpp">C++</MenuItem>
          <MenuItem value="csharp">C#</MenuItem>
          <MenuItem value="go">Go</MenuItem>
          <MenuItem value="ruby">Ruby</MenuItem>
          <MenuItem value="swift">Swift</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={disabled}>
        Get Solution
      </Button>
    </Box>
  );
};

export default ProblemForm;
