import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { FAQ } from '../types';

export const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setLoading(true);
      const data = await api.getFAQs();
      setFaqs(data);
    } catch (error) {
      console.error('Ошибка загрузки FAQ:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSupport = () => {
    // В реальном приложении здесь был бы переход к чату с поддержкой
    alert('Связь с оператором...');
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        p: 3
      }}>
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Загрузка FAQ...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          onClick={() => navigate('/main')}
          sx={{ mr: 2, minWidth: 'auto' }}
        >
          ← Назад
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          ❓ Помощь
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
        Часто задаваемые вопросы:
      </Typography>

      <Box sx={{ mb: 4 }}>
        {faqs.map((faq) => (
          <Accordion key={faq.id} sx={{ mb: 1, borderRadius: 2 }}>
            <AccordionSummary
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleContactSupport}
        sx={{
          py: 2,
          fontSize: '1.1rem',
          fontWeight: 600,
          borderRadius: 3,
          textTransform: 'none',
        }}
      >
        💬 Связаться с оператором
      </Button>
    </Box>
  );
}; 