import React, { useRef, useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { Rating } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanguageIcon from '@mui/icons-material/Language';
import StarIcon from '@mui/icons-material/Star';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { Apihelper } from '../common/service/ApiHelper';

const defaultCastImages = [
  'https://stream-vibe-gules.vercel.app/assets/movie-details/cast1.png',
  'https://stream-vibe-gules.vercel.app/assets/movie-details/cast2.png',
  'https://stream-vibe-gules.vercel.app/assets/movie-details/cast3.png',
  'https://stream-vibe-gules.vercel.app/assets/movie-details/cast4.png',
  'https://stream-vibe-gules.vercel.app/assets/movie-details/cast5.png',
  'https://stream-vibe-gules.vercel.app/assets/movie-details/cast6.png',
  'https://stream-vibe-gules.vercel.app/assets/movie-details/cast7.png',
  'https://stream-vibe-gules.vercel.app/assets/movie-details/cast8.png',
];

const defaultRatings = [
  {
    source: 'IMDb',
    value: 4.5,
  },
  {
    source: 'Streamvibe',
    value: 4,
  },
];

export default function MovieDetailsScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showVideo, setShowVideo] = useState(false);
  const [showPremiumPrompt, setShowPremiumPrompt] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 1;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: '',
    name: '',
    country: ''
  });

  const [movieDetails, setMovieDetails] = useState({
    name: '',
    description: '',
    thumbnail: '',
    streamingUrl: '',
    releaseDate: '',
    language: '',
    cast: [],
    Director: { img: '', name: '', from: '' },
    Music: { img: '', name: '', from: '' },
    category: '',
    ratings: [],
    reviews: [],
    isPremium: false,
    averageRating: 0
  });

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  async function fetchMovieDetails() {
    try {
      setLoading(true);
      const result = await Apihelper.GetmoviseById(id);
      const data = result.data.data;
      const reviews = data.ratings;
      const avgRating = calculateAverageRating(reviews);
      const processedData = {
        ...data,
        thumbnail: data.thumbnail || 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Thar-ROXX/8438/1723692413550/front-left-side-47.jpg',
        streamingUrl: data.streamingUrl ? convertBackendPathToUrl(data.streamingUrl) : 'https://videos.pexels.com/video-files/19022223/19022223-uhd_2560_1440_60fps.mp4',
        Director: {
          img: data.Director?.img ? convertBackendPathToUrl(data.Director.img) : '',
          name: data.Director?.name || 'Unknown',
          from: data.Director?.from || 'Unknown'
        },
        Music: {
          img: data.Music?.img ? convertBackendPathToUrl(data.Music.img) : '',
          name: data.Music?.name || 'Unknown',
          from: data.Music?.from || 'Unknown'
        },
        cast: data.cast?.length > 0
          ? data.cast.map(img => img.includes('http') ? img : convertBackendPathToUrl(img))
          : defaultCastImages.slice(0, 3),
        ratings: data.ratings,
        reviews: reviews,
        category: data.category || 'Action',
        language: data.language || 'Gujaratis',
        name: data.name,
        description: data.description,
        averageRating: avgRating
      };
      setMovieDetails(processedData);
    } catch (error) {
      setError('Failed to load movie details');
      showSnackbar('Failed to load movie details', 'error');
    } finally {
      setLoading(false);
    }
  }

  function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
  }

  function convertBackendPathToUrl(path) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://your-backend-domain.com/uploads/${path.split('uploads\\').pop()}`;
  }

  const handlePlayClick = () => {
    if (movieDetails.isPremium) {
      setShowVideo(true);
      setShowPremiumPrompt(false);
      setTimeLeft(10);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {
            setError("Failed to play video");
            setShowVideo(false);
            showSnackbar("Failed to play video", "error");
          });
        }
      }, 100);
      timerRef.current = setTimeout(() => {
        setShowPremiumPrompt(true);
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }, 10000);
      countdownRef.current = setInterval(() => {
        setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    } else {
      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          setError("Failed to play video");
          setShowVideo(false);
          showSnackbar("Failed to play video", "error");
        });
      }
    }
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    setShowPremiumPrompt(false);
    clearTimeout(timerRef.current);
    clearInterval(countdownRef.current);
  };

  const handleSubscribe = () => {
    setShowPremiumPrompt(false);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setError("Failed to play video");
        setShowVideo(false);
        showSnackbar("Failed to play video", "error");
      });
    }
    clearInterval(countdownRef.current);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  const totalPages = Math.ceil(movieDetails.reviews.length / reviewsPerPage);
  const visibleReviews = movieDetails.reviews.slice(
    currentPage * reviewsPerPage,
    currentPage * reviewsPerPage + reviewsPerPage
  );

  const next = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleOpenReviewDialog = () => {
    setOpenReviewDialog(true);
  };

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
    setReviewForm({
      rating: 0,
      comment: '',
      name: '',
      country: ''
    });
  };

  const handleReviewFormChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setReviewForm(prev => ({
      ...prev,
      rating: newValue
    }));
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSubmitReview = async () => {
    try {
      if (!reviewForm.rating || !reviewForm.comment) {
        showSnackbar('Please provide both rating and comment', 'error');
        return;
      }
      const newReview = {
        ...reviewForm,
        createdAt: new Date().toISOString(),
        movieId:id
      };
      await ApiHelper.Addreting(newReview)
      fetchMovieDetails()
      handleCloseReviewDialog()
    } catch (error) {
      showSnackbar('Failed to submit review. Please try again.', 'error');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="my-10 bg-gray-900">
      <div className="relative text-white">
        {!showVideo ? (
          <>
            <img
              src={movieDetails.thumbnail}
              alt={movieDetails.name}
              className="w-full h-[80vh] object-cover rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Mahindra/Thar-ROXX/8438/1723692413550/front-left-side-47.jpg';
              }}
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end items-center pb-8 bg-black/50">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{movieDetails.name}</h2>
              <div className="flex items-center gap-2 mb-2">
                <Rating
                  value={movieDetails.averageRating}
                  precision={0.5}
                  readOnly
                  sx={{
                    '& .MuiRating-iconFilled': { color: '#d12023' },
                    '& .MuiRating-iconEmpty': { color: '#ccc' }
                  }}
                />
                <span className="text-lg">{movieDetails.averageRating.toFixed(1)}</span>
              </div>
              <p className="text-gray-300">{movieDetails.category} • {movieDetails.language}</p>
              <button className="btn btn-danger mt-3 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow" onClick={handlePlayClick}>
                <PlayArrowIcon /> Play Now
              </button>
            </div>
          </>
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              src={movieDetails.streamingUrl}
              className="w-full max-h-screen"
              controls={!showPremiumPrompt}
              controlsList={showVideo === false ? "nodownload nofullscreen noremoteplayback" : ""}
              muted
              autoPlay
              onEnded={handleCloseVideo}
              disablePictureInPicture
              onError={() => {
                setError("Failed to load video");
                setShowVideo(false);
                showSnackbar("Failed to load video", "error");
              }}
            />
            {showPremiumPrompt && (
              <div className="absolute inset-0 bg-black/90 flex flex-col justify-center items-center text-white p-5 text-center z-10">
                <button
                  onClick={handleCloseVideo}
                  className="absolute top-5 right-5 bg-transparent border-none text-white cursor-pointer"
                >
                  <CloseIcon fontSize="large" />
                </button>
                <h3 className="mb-5 text-2xl font-semibold">Premium Content</h3>
                <p className="text-lg mb-8">
                  You've watched {10 - timeLeft} seconds of preview. Subscribe to watch the full movie!
                </p>
                <div className="flex gap-4 mt-2 flex-wrap justify-center">
                  <button
                    className="px-5 py-2 border border-white rounded text-white hover:bg-white hover:text-black transition"
                    onClick={handleGoHome}
                  >
                    Go to Home
                  </button>
                  <button
                    className="px-5 py-2 bg-red-600 rounded text-white hover:bg-red-700 transition"
                    onClick={handleSubscribe}
                  >
                    Subscribe Now
                  </button>
                </div>
                <div className="mt-10 w-full max-w-lg">
                  <div className="flex justify-between mb-2">
                    <span>Preview time remaining:</span>
                    <span>{timeLeft}s</span>
                  </div>
                  <div className="h-1 w-full bg-gray-700 rounded overflow-hidden">
                    <div
                      className="h-full bg-red-600 transition-all duration-1000"
                      style={{ width: `${(timeLeft / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="container mx-auto mt-10 px-4">
        <div className="flex flex-col md:flex-row-reverse gap-6">
          <div className="w-full md:w-2/3 space-y-6">
            <div className="p-6 bg-gray-800 rounded">
              <h5 className="text-gray-400 mb-2">Description</h5>
              <p className="mb-0 text-gray-200">{movieDetails?.description}</p>
            </div>
            {movieDetails.cast.length > 0 && (
              <div className="bg-gray-800 p-6 rounded">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="text-gray-400">Cast</h5>
                  <div className="flex gap-2">
                    <button
                      className="bg-black rounded-full p-2 border-0"
                      onClick={() => scroll('left')}
                    >
                      <WestIcon />
                    </button>
                    <button
                      className="bg-black rounded-full p-2 border-0"
                      onClick={() => scroll('right')}
                    >
                      <EastIcon />
                    </button>
                  </div>
                </div>
                <div
                  className="flex overflow-x-auto gap-3 py-2 no-scrollbar"
                  ref={scrollRef}
                >
                  {movieDetails.cast.map((castImg, index) => (
                    <div key={index} className="text-center">
                      <img
                        src={castImg || defaultCastImages[index % defaultCastImages.length]}
                        alt={`Cast ${index}`}
                        className="rounded w-28 h-40 object-cover"
                        onError={(e) => {
                          e.target.src = defaultCastImages[index % defaultCastImages.length];
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="p-6 bg-gray-800 rounded">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold">Reviews</h4>
                <button
                  className="bg-black border-0 text-white rounded-full px-4 py-2 flex items-center gap-1 hover:bg-gray-700"
                  onClick={handleOpenReviewDialog}
                >
                  <AddIcon /> Add Your Review
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {visibleReviews.map((review, idx) => (
                  <div className="bg-black p-4 rounded" key={idx}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div className="font-bold">{review.name}</div>
                        <div className="text-gray-400 text-sm">From {review.country}</div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 border border-gray-700 rounded-lg px-2 py-1">
                          <Rating
                            sx={{
                              '& .MuiRating-iconFilled': { color: '#d12023' },
                              '& .MuiRating-iconEmpty': { color: '#ccc' },
                              fontSize: '1rem'
                            }}
                            value={review.rating}
                            precision={0.5}
                            readOnly
                          />
                          <span>{review.rating}</span>
                        </div>
                        <small className="text-gray-400">{formatDate(review.createdAt)}</small>
                      </div>
                    </div>
                    <p className="mb-0 text-gray-200">{review.comment}</p>
                  </div>
                ))}
              </div>
              {movieDetails.reviews.length > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={prev}
                    className="bg-black border-0 rounded-full p-2 disabled:opacity-50"
                    disabled={currentPage === 0}
                  >
                    <WestIcon />
                  </button>
                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-full w-2.5 h-2.5 ${currentPage === i ? 'bg-red-600' : 'bg-black'}`}
                      ></div>
                    ))}
                  </div>
                  <button
                    onClick={next}
                    className="bg-black border-0 rounded-full p-2 disabled:opacity-50"
                    disabled={currentPage === totalPages - 1}
                  >
                    <EastIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/3 space-y-6">
            <div className="p-6 bg-gray-800 rounded">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <CalendarMonthIcon fontSize="small" />
                  <span>Released Year</span>
                </div>
                <div className="font-bold text-gray-200">
                  {movieDetails.releaseDate ? new Date(movieDetails.releaseDate).getFullYear() : 'N/A'}
                </div>
              </div>
              <Rating
                value={movieDetails.averageRating}
                precision={0.5}
                readOnly
                sx={{
                  '& .MuiRating-iconFilled': { color: '#d12023' },
                  '& .MuiRating-iconEmpty': { color: '#ccc' }
                }}
              />
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <LanguageIcon fontSize="small" />
                  <span>Available Languages</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-black rounded-full px-3 py-1 text-gray-200">
                    {movieDetails.language}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <StarIcon fontSize="small" />
                  <span>Ratings</span>
                </div>
                <div className="flex flex-col gap-3"></div>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <ListAltIcon fontSize="small" />
                  <span>Genres</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-black rounded-full px-3 py-1 text-gray-200">
                    {movieDetails.category}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <PersonIcon fontSize="small" />
                  <span>Director</span>
                </div>
                <div className="bg-black rounded p-3 flex items-center gap-3">
                  <img
                    src={movieDetails.Director.img || defaultCastImages[0]}
                    alt="Director"
                    width="60px"
                    height="60px"
                    className="rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = defaultCastImages[0];
                    }}
                  />
                  <div>
                    <div className="font-bold text-gray-200">{movieDetails.Director.name}</div>
                    <div className="text-gray-400">From {movieDetails.Director.from}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <PersonIcon fontSize="small" />
                  <span>Music</span>
                </div>
                <div className="bg-black rounded p-3 flex items-center gap-3">
                  <img
                    src={movieDetails.Music.img || 'https://stream-vibe-gules.vercel.app/assets/movie-details/music1.png'}
                    alt="Music Director"
                    width="60px"
                    height="60px"
                    className="rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://stream-vibe-gules.vercel.app/assets/movie-details/music1.png';
                    }}
                  />
                  <div>
                    <div className="font-bold text-gray-200">{movieDetails.Music.name}</div>
                    <div className="text-gray-400">From {movieDetails.Music.from}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Review Dialog */}
      <Dialog
        open={openReviewDialog}
        onClose={handleCloseReviewDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: '#141414',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
          }
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            padding: '20px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span style={{ fontSize: '1.5rem', fontWeight: '500' }}>Add Your Review</span>
          <button
            onClick={handleCloseReviewDialog}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <CloseIcon />
          </button>
        </DialogTitle>
        <DialogContent sx={{ padding: '24px', backgroundColor: '#141414' }}>
          <Box sx={{
            mt: 2,
            mb: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}>
            <Rating
              name="rating"
              value={reviewForm.rating}
              onChange={handleRatingChange}
              precision={0.5}
              size="large"
              sx={{
                '& .MuiRating-iconFilled': { color: '#d12023' },
                '& .MuiRating-iconEmpty': { color: 'rgba(255,255,255,0.2)' },
                fontSize: '2.5rem'
              }}
            />
            <span style={{
              marginTop: '8px',
              fontSize: '1.1rem',
              color: reviewForm.rating > 0 ? '#fff' : '#666'
            }}>
              {reviewForm.rating > 0 ? `${reviewForm.rating} star${reviewForm.rating !== 1 ? 's' : ''}` : 'Rate this movie'}
            </span>
          </Box>
          <TextField
            margin="normal"
            fullWidth
            label="Your Name (Optional)"
            name="name"
            value={reviewForm.name}
            onChange={handleReviewFormChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#d12023',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666',
                '&.Mui-focused': {
                  color: '#d12023',
                },
              },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Your Country (Optional)"
            name="country"
            value={reviewForm.country}
            onChange={handleReviewFormChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#d12023',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666',
                '&.Mui-focused': {
                  color: '#d12023',
                },
              },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            rows={4}
            label="Your Review*"
            name="comment"
            value={reviewForm.comment}
            onChange={handleReviewFormChange}
            required
            error={!reviewForm.comment && reviewForm.rating > 0}
            helperText={!reviewForm.comment && reviewForm.rating > 0 ? "Please enter your review" : ""}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#d12023',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666',
                '&.Mui-focused': {
                  color: '#d12023',
                },
              },
              '& .MuiFormHelperText-root': {
                color: '#d12023',
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: '#141414'
          }}
        >
          <Button
            onClick={handleCloseReviewDialog}
            sx={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,0.2)',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.3)',
                backgroundColor: 'rgba(255,255,255,0.05)'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            disabled={!reviewForm.rating || !reviewForm.comment}
            sx={{
              px: 4,
              backgroundColor: '#d12023',
              '&:hover': {
                backgroundColor: '#bb2d3b'
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(220, 53, 69, 0.5)'
              }
            }}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
} 