import React, { useState } from 'react';
import { Box, Typography, Button, Paper, Alert, Chip, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

export const LicensePage: React.FC = () => {
  const navigate = useNavigate();
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleImageUpload = (side: 'front' | 'back', file: File) => {
    if (side === 'front') {
      setFrontImage(file);
    } else {
      setBackImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!frontImage || !backImage) {
      alert('Пожалуйста, загрузите обе стороны водительского удостоверения');
      return;
    }

    try {
      setUploading(true);
      const result = await api.uploadLicense(frontImage, backImage);
      if (result.success) {
        setUploaded(true);
        setTimeout(() => {
          navigate('/main');
        }, 2000);
      }
    } catch (error) {
      console.error('Ошибка загрузки ВУ:', error);
      alert('Произошла ошибка при загрузке. Попробуйте еще раз.');
    } finally {
      setUploading(false);
    }
  };

  const canSubmit = frontImage && backImage && !uploading;

  return (
    <Box sx={{ p: 2, minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          onClick={() => navigate('/')}
          sx={{ mr: 2, minWidth: 'auto' }}
        >
          ← Назад
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          📄 Водительское удостоверение
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
        Для аренды отправьте фото ВУ:
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
        {/* Лицевая сторона */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            1. Фото лицевой стороны
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            {frontImage ? (
              <Chip 
                label="✓ Загружено" 
                color="success" 
                variant="outlined"
              />
            ) : (
              <Chip 
                label="Не загружено" 
                color="default" 
                variant="outlined"
              />
            )}
          </Box>

          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="front-image"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload('front', file);
            }}
          />
          <label htmlFor="front-image">
            <Button
              variant="outlined"
              component="span"
              fullWidth
              sx={{ py: 1.5 }}
            >
              {frontImage ? 'Изменить фото' : 'Загрузить фото'}
            </Button>
          </label>
        </Paper>

        {/* Оборотная сторона */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            2. Фото оборотной стороны
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            {backImage ? (
              <Chip 
                label="✓ Загружено" 
                color="success" 
                variant="outlined"
              />
            ) : (
              <Chip 
                label="Не загружено" 
                color="default" 
                variant="outlined"
              />
            )}
          </Box>

          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="back-image"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload('back', file);
            }}
          />
          <label htmlFor="back-image">
            <Button
              variant="outlined"
              component="span"
              fullWidth
              sx={{ py: 1.5 }}
            >
              {backImage ? 'Изменить фото' : 'Загрузить фото'}
            </Button>
          </label>
        </Paper>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          ☑️ Я подтверждаю, что ознакомлен с правилами аренды.
        </Typography>
      </Alert>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handleSubmit}
        disabled={!canSubmit}
        sx={{
          py: 2,
          fontSize: '1.1rem',
          fontWeight: 600,
          borderRadius: 3,
          textTransform: 'none',
        }}
      >
        {uploading ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            Загрузка...
          </>
        ) : uploaded ? (
          '✓ ВУ отправлено!'
        ) : (
          'Отправить ВУ'
        )}
      </Button>

      {uploaded && (
        <Alert severity="success" sx={{ mt: 2 }}>
          ВУ успешно отправлено! Статус: 🟡 ВУ на проверке
        </Alert>
      )}
    </Box>
  );
}; 