import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Modal,
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  Movie,
  Edit,
  Delete,
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import MovieCreateForm from './MovieCreateForm';

// Sample data - replace with your actual data
const sampleMovies = [
  { id: 1, title: "The Last Warrior", views: "1.2M", rating: 8.2, duration: "2h 15m", category: "Action", language: "English", isPremium: true },
  { id: 2, title: "Midnight City", views: "890K", rating: 7.6, duration: "1h 52m", category: "Thriller", language: "Hindi", isPremium: false },
  { id: 3, title: "Space Odyssey", views: "1.5M", rating: 8.8, duration: "2h 28m", category: "Sci-Fi", language: "English", isPremium: true },
  { id: 4, title: "Lost Treasure", views: "760K", rating: 7.1, duration: "1h 45m", category: "Adventure", language: "Hindi", isPremium: false },
  { id: 5, title: "Dark Forest", views: "1.1M", rating: 8.0, duration: "2h 05m", category: "Horror", language: "English", isPremium: true },
];

const MoviesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState(sampleMovies);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  return (
    <Box sx={{ bgcolor: 'black', minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 3 }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
            Movies List
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            sx={{
              bgcolor: 'red',
              '&:hover': { bgcolor: 'darkred' },
              textTransform: 'none',
              px: 3
            }}
          >
            Add New Movie
          </Button>
        </Box>

        {/* Movies Table */}
        <Paper sx={{ bgcolor: '#111', borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#999', borderColor: '#333', fontWeight: 'bold' }}>Movie</TableCell>
                  <TableCell sx={{ color: '#999', borderColor: '#333', fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ color: '#999', borderColor: '#333', fontWeight: 'bold' }}>Language</TableCell>
                  <TableCell align="right" sx={{ color: '#999', borderColor: '#333', fontWeight: 'bold' }}>Duration</TableCell>
                  <TableCell align="right" sx={{ color: '#999', borderColor: '#333', fontWeight: 'bold' }}>Views</TableCell>
                  <TableCell align="right" sx={{ color: '#999', borderColor: '#333', fontWeight: 'bold' }}>Rating</TableCell>
                  <TableCell align="center" sx={{ color: '#999', borderColor: '#333', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((movie) => (
                  <TableRow
                    key={movie.id}
                    sx={{
                      '&:last-child td': { borderBottom: 0 },
                      '&:hover': { bgcolor: '#1E1E1E' }
                    }}
                  >
                    <TableCell sx={{ color: 'white', borderColor: '#333' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Movie sx={{ color: 'red', mr: 1 }} />
                        <Box>
                          <Typography variant="body1">
                            {movie.title}
                          </Typography>
                          {movie.isPremium && (
                            <Typography variant="caption" sx={{ color: 'gold' }}>
                              Premium
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'white', borderColor: '#333' }}>{movie.category}</TableCell>
                    <TableCell sx={{ color: 'white', borderColor: '#333' }}>{movie.language}</TableCell>
                    <TableCell align="right" sx={{ color: 'white', borderColor: '#333' }}>{movie.duration}</TableCell>
                    <TableCell align="right" sx={{ color: 'white', borderColor: '#333' }}>{movie.views}</TableCell>
                    <TableCell align="right" sx={{ color: 'white', borderColor: '#333' }}>
                      <Box sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        bgcolor: movie.rating >= 8 ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 152, 0, 0.2)',
                        px: 1,
                        borderRadius: 1
                      }}>
                        {movie.rating}/10
                      </Box>
                    </TableCell>
                    <TableCell align="center" sx={{ borderColor: '#333' }}>
                      <IconButton
                        size="small"
                        sx={{ color: 'primary.main', mr: 1 }}
                        onClick={() => console.log('Edit movie:', movie.id)}
                      >
                        <Edit sx={{ color: '#2196f3' }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ color: 'error.main' }}
                        onClick={() => handleDeleteMovie(movie.id)}
                      >
                        <Delete sx={{ color: '#f44336' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Create Movie Modal */}
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
          <DialogContent sx={{ p: 0, bgcolor: 'transparent' }}>
            <Box sx={{ position: 'relative' }}>
              <IconButton
                onClick={handleCloseModal}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  '&:hover': {
                    bgcolor: 'rgba(0,0,0,0.7)',
                  },
                  zIndex: 1
                }}
              >
                <CloseIcon />
              </IconButton>
              <MovieCreateForm />
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default MoviesList; 