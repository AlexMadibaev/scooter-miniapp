import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MainMenu } from '../components/MainMenu';

export const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', p: 2 }}>
      <MainMenu onNavigate={handleNavigate} />
    </Box>
  );
}; 