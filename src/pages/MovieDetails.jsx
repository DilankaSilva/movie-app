import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  CircularProgress,
  useMediaQuery,
  Chip,
  Divider,
  Stack
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieCredits } from '../services/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MovieRating from '../components/MovieRating';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LanguageIcon from '@mui/icons-material/Language';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import NoPoster from "../assets/no-poster.jpg";
import CastList from '../components/CastList';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First fetch movie details
        const details = await getMovieDetails(id);
        setMovie(details);
        
        // Then try to fetch cast information
        try {
          const credits = await getMovieCredits(id);
          setCast(credits.cast || []);
        } catch (castError) {
          console.error('Error fetching cast:', castError);
          // Don't set the main error state - we can show the movie without cast
          setCast([]);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to load movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h4" color="#d32f2f" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ 
            mt: 3,
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          Go Back Home
        </Button>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box textAlign="center" py={10}>
        <Typography variant="h4">Movie not found</Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/')}
          sx={{ 
            mt: 3,
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          Go Back Home
        </Button>
      </Box>
    );
  }

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Box sx={{ 
      py: 4, 
      px: { xs: 2, sm: 4 },
      background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)',
      minHeight: '100vh'
    }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ 
          mb: 3,
          color: '#1976d2',
          fontSize: '1.1rem',
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.04)'
          }
        }}
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ 
        p: { xs: 2, md: 4 },
        borderRadius: 2,
        background: 'white'
      }}>
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={4}>
          {/* Movie Poster - Made larger */}
          <Box flexShrink={0} sx={{ 
            textAlign: 'center',
            alignSelf: isMobile ? 'center' : 'flex-start'
          }}>
            <img
              src={
                movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : NoPoster
              }
              alt={movie.title}
              style={{
                width: '100%',
                maxWidth: isMobile ? 350 : 400,
                borderRadius: 8,
                boxShadow: '0px 2px 4px 1px',
                aspectRatio: '2/3'
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h2" component="h1" gutterBottom sx={{
              fontWeight: 700,
              fontSize: isMobile ? '2.5rem' : '3rem',
              color: '#000000',
              lineHeight: 1.2
            }}>
              {movie.title}
              {movie.release_date && (
                <Typography 
                  component="span" 
                  sx={{ 
                    ml: 2,
                    color: '#1976d2',
                    fontSize: isMobile ? '1.25rem' : '1.5rem'
                  }}
                >
                  ({new Date(movie.release_date).getFullYear()})
                </Typography>
              )}
            </Typography>
            
            <MovieRating rating={movie.vote_average} voteCount={movie.vote_count} />
            
            {movie.genres?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {movie.genres.map(genre => (
                    <Chip 
                      key={genre.id} 
                      label={genre.name} 
                      size="medium"
                      sx={{ 
                        backgroundColor: '#42a5f5',
                        color: 'white',
                        fontSize: '1rem'
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}
            
            <Typography sx={{ 
              fontSize: '1.25rem', 
              lineHeight: 1.7,
              mb: 4,
              color: 'black'
            }}>
              {movie.overview || 'No overview available.'}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
                        <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: 3,
              mt: 3
            }}>
              {movie.release_date && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CalendarTodayIcon fontSize="medium" sx={{ color: '#1976d2' }} />
                  <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                    Release Date: {new Date(movie.release_date).toLocaleDateString()}
                  </Typography>
                </Box>
              )}
              
              {movie.runtime && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <ScheduleIcon fontSize="medium" sx={{ color: '#1976d2' }} />
                  <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                    Runtime: {formatRuntime(movie.runtime)}
                  </Typography>
                </Box>
              )}
              
              {movie.original_language && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LanguageIcon fontSize="medium" sx={{ color: '#1976d2' }} />
                  <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                    Language: {movie.original_language.toUpperCase()}
                  </Typography>
                </Box>
              )}
              
              {movie.budget > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <StarBorderIcon fontSize="medium" sx={{ color: '#1976d2' }} />
                  <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                    Budget: ${movie.budget.toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
      <Paper>
      {movie && <CastList cast={cast} />}
      </Paper>
    </Box>
  );
};

export default MovieDetails;