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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Movie,
  Edit,
  Delete,
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import MovieCreateForm from './MovieCreateForm';
import { Apihelper } from '../../common/service/ApiHelper';
import { useEffect } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Sample data - replace with your actual data


const MoviesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [copied, setCopied] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteMovie = async (id) => {
    try {
      await Apihelper.DeleteMovise(id)
      ListMovis()
    } catch (error) {
      console.log(error)
    }
    console.log(id)
  };

  const handleCopy = (movieId, quality, url) => {
    navigator.clipboard.writeText(url);
    setCopied({ [`${movieId}_${quality}`]: true });
    setTimeout(() => setCopied({}), 1200);
  };

  async function ListMovis(params) {
    try {
      const res = await Apihelper.ListMovise()
      console.log(res.data.data.movies
      );
      setMovies(res?.data?.data?.movies)
    } catch (error) {

      console.log(error);
    }
  }
  useEffect(() => {

    ListMovis()
  }, []);

  return (
    <Box sx={{ bgcolor: 'black', minHeight: '100vh', py: 4 }}>
      <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
            mb: 4
          }}
        >
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: { xs: 2, sm: 0 } }}>
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
              px: 3,
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Add New Movie
          </Button>
        </Box>

        {/* Movies Table */}
        <Box sx={{ width: '100%', overflowX: 'auto', mb: 3 }}>
          <Paper sx={{ bgcolor: '#111', borderRadius: 2, minWidth: 600 }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#999', borderColor: '#333', fontWeight: 'bold', px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 }, fontSize: { xs: 12, sm: 14 } }}>Movie</TableCell>
                    <TableCell align="right" sx={{ color: '#999', borderColor: '#333', fontWeight: 'bold', px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 }, fontSize: { xs: 12, sm: 14 } }}>720</TableCell>
                    <TableCell align="right" sx={{ color: '#999', borderColor: '#333', fontWeight: 'bold', px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 }, fontSize: { xs: 12, sm: 14 } }}>1080</TableCell>
                    <TableCell align="center" sx={{ color: '#999', borderColor: '#333', fontWeight: 'bold', px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 }, fontSize: { xs: 12, sm: 14 } }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...movies].sort((a, b) => (a.name || '').localeCompare(b.name || '')).map((movie) => (
                    <TableRow
                      key={movie._id || movie.id}
                      sx={{
                        '&:last-child td': { borderBottom: 0 },
                        '&:hover': { bgcolor: '#1E1E1E' }
                      }}
                    >
                      <TableCell sx={{ color: 'white', borderColor: '#333', px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 }, fontSize: { xs: 12, sm: 14 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Movie sx={{ color: 'red', mr: 1, fontSize: { xs: 18, sm: 24 } }} />
                          <Box>
                            <Typography variant="body2" sx={{ fontSize: { xs: 13, sm: 16 } }}>
                              {movie.name}
                            </Typography>
                            {movie.isPremium && (
                              <Typography variant="caption" sx={{ color: 'gold' }}>
                                Premium
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      {/* 720p link */}
                      <TableCell align="right" sx={{ color: 'white', borderColor: '#333', px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 }, fontSize: { xs: 12, sm: 14 } }}>
                        {movie?.qualities["720p"] && typeof movie.qualities["720p"] === 'string' ? (
                          <>
                            {(() => {
                              const fullLink = `kenshdriveweb-3s8f.vercel.app/watch?video=${movie.qualities["720p"]}`;
                              const shortLink = fullLink.length > 30 ? `${fullLink.slice(0, 18)}...${fullLink.slice(-8)}` : fullLink;
                              return (
                                <>
                                  <a href={fullLink} target="_blank" rel="noopener noreferrer" style={{ color: '#4FC3F7', textDecoration: 'underline', wordBreak: 'break-all', fontSize: 12 }}>
                                    {shortLink}
                                  </a>
                                  <button
                                    style={{ marginLeft: 6, background: 'none', border: '1px solid #4FC3F7', borderRadius: 4, cursor: 'pointer', color: '#4FC3F7', padding: '1px 4px', fontSize: 11 }}
                                    title="Copy link"
                                    onClick={() => handleCopy(movie._id || movie.id, '720p', fullLink)}
                                  >
                                    Copy
                                  </button>
                                  {copied[`${movie._id || movie.id}_720p`] && (
                                    <span style={{ color: '#4FC3F7', marginLeft: 3, fontSize: 11 }}>Copied!</span>
                                  )}
                                </>
                              );
                            })()}
                          </>
                        ) : (
                          <span style={{ fontSize: 12 }}>{movie?.qualities["720p"] || '-'}</span>
                        )}
                      </TableCell>
                      {/* 1080p link */}
                      <TableCell align="right" sx={{ color: 'white', borderColor: '#333', px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 }, fontSize: { xs: 12, sm: 14 } }}>
                        {movie?.qualities["1080p"] && typeof movie.qualities["1080p"] === 'string' ? (
                          <>
                            {(() => {
                              const fullLink = `kenshdriveweb-3s8f.vercel.app/watch?video=${movie.qualities["1080p"]}`;
                              const shortLink = fullLink.length > 30 ? `${fullLink.slice(0, 18)}...${fullLink.slice(-8)}` : fullLink;
                              return (
                                <>
                                  <a href={fullLink} target="_blank" rel="noopener noreferrer" style={{ color: '#4FC3F7', textDecoration: 'underline', wordBreak: 'break-all', fontSize: 12 }}>
                                    {shortLink}
                                  </a>
                                  <button
                                    style={{ marginLeft: 6, background: 'none', border: '1px solid #4FC3F7', borderRadius: 4, cursor: 'pointer', color: '#4FC3F7', padding: '1px 4px', fontSize: 11 }}
                                    title="Copy link"
                                    onClick={() => handleCopy(movie._id || movie.id, '1080p', fullLink)}
                                  >
                                    Copy
                                  </button>
                                  {copied[`${movie._id || movie.id}_1080p`] && (
                                    <span style={{ color: '#4FC3F7', marginLeft: 3, fontSize: 11 }}>Copied!</span>
                                  )}
                                </>
                              );
                            })()}
                          </>
                        ) : (
                          <span style={{ fontSize: 12 }}>{movie?.qualities["1080p"] || '-'}</span>
                        )}
                      </TableCell>
                    
                      <TableCell align="center" sx={{ borderColor: '#333', px: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 }, fontSize: { xs: 12, sm: 14 } }}>
                        <IconButton
                          size="small"
                          sx={{ color: 'error.main' }}
                          onClick={() => handleDeleteMovie(movie._id)}
                        >
                          <Delete sx={{ color: '#f44336', fontSize: { xs: 18, sm: 24 } }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

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
              <MovieCreateForm handleCloseModal={handleCloseModal}  />
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default MoviesList; 