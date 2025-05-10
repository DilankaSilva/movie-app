import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  Stack,
  IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MovieRating from './MovieRating';
import { useNavigate } from 'react-router-dom';
import { useMovie } from '../context/MovieContext';
import NoProfile from "../assets/no-poster.jpg";

const MovieCard = ({ movie }) => {
  const releaseYear = movie.release_date?.split('-')[0];
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useMovie();

  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const handleClick = () => {
    navigate(`/movie-details/${movie.id}`);
  };

  const handleFavoriteToggle = (e) => {
    
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6
        },
        bgcolor: 'background.paper',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : NoProfile
          }
          alt={movie.title}
          sx={{ 
            height: 300, 
            objectFit: 'cover',
            transition: 'transform 0.5s',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        {movie.vote_average > 7.5 && (
          <Chip
            label="Top Rated"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              bgcolor: 'primary.main',
              color: 'common.white',
              fontWeight: 'bold',
            }}
          />
        )}
        <IconButton
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            bgcolor: 'white',
            '&:hover': {
              bgcolor: 'white',
            },
            zIndex: 10
          }}
          onClick={handleFavoriteToggle}
          size="small"
        >
          {isFavorite ? (
            <FavoriteIcon sx={{ color: '#ff6b6b' }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>
      
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          p: 2, 
          borderTop: 3,
          borderColor: 'primary.light'
        }}
      >
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 600, 
            color: 'text.primary',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mb: 1
          }}
        >
          {movie.title}
        </Typography>
        
        <MovieRating rating={movie.vote_average} voteCount={movie.vote_count} />
        
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CalendarTodayIcon 
              fontSize="small" 
              sx={{ mr: 0.5, color: 'primary.main' }} 
            />
            <Typography variant="body2" color="text.secondary">
              {releaseYear || 'N/A'}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MovieCard;