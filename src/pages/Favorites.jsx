import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Box, 
  Divider,
  Button,
  Alert
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMovie } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { useNavigate } from 'react-router-dom';



const Favorites = () => {
  const { favorites, removeFavorite } = useMovie();
  const navigate = useNavigate();

  const handleRemoveFavorite = (event, movieId) => {
    // Stop propagation to prevent navigating to movie details
    event.stopPropagation();
    removeFavorite(movieId);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="2xl" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          mb: 4,
          background:
            "linear-gradient(to right, #0D1B2A, #1B263B, #415A77, #778DA9, #E0E1DD)",
        }}
      >
        <Box sx={{ p: { xs: 3, md: 4 }, textAlign: "center", color: "white" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <FavoriteIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, mr: 2, color: '#ff6b6b' }} />
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                }}
              >
                My Favorites
              </Typography>
            </Box>

            <Typography
              variant="h6"
              component="h2"
              sx={{
                fontWeight: "medium",
                fontStyle: "italic",
                color: "#E0E1DD",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                maxWidth: "700px",
              }}
            >
              Your personal collection of beloved films
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Paper
        elevation={2}
        sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}
      >
        <Box sx={{ bgcolor: '#1B263B', py: 2, px: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", py: 1 }}>
            <FavoriteIcon sx={{ mr: 1, color: '#ff6b6b' }} />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: '#E0E1DD' }}
            >
              Favorite Movies
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderColor: '#778DA9' }} />

        <Box sx={{ p: 3 }}>
          {favorites.length > 0 ? (
            <Grid container spacing={3}>
              {favorites.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
                  <Box sx={{ position: 'relative', width: '100%' }}>
                    <MovieCard movie={movie} />
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={(e) => handleRemoveFavorite(e, movie.id)}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        minWidth: 'auto',
                        p: 1,
                        borderRadius: '50%',
                        opacity: 0.8,
                        '&:hover': {
                          opacity: 1
                        }
                      }}
                    >
                      <FavoriteIcon />
                    </Button>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Alert 
                severity="info"
                sx={{ 
                  maxWidth: 500, 
                  mx: 'auto', 
                  mb: 4,
                  bgcolor: '#778DA9',
                  color: '#1B263B'
                }}
              >
                <Typography variant="body1">
                  You haven't added any favorite movies yet
                </Typography>
              </Alert>
              <Button
                variant="contained"
                onClick={handleBackToHome}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  bgcolor: '#415A77',
                  '&:hover': { bgcolor: '#1B263B' }
                }}
              >
                Explore Movies
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Favorites;