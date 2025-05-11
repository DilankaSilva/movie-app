import React from 'react';
import { Paper, Box, Typography, Grid, CircularProgress } from '@mui/material';
import MovieCard from './MovieCard';
import MovieIcon from '@mui/icons-material/Movie';

// Use separate file for show seerach results part its helps to minimize the code in HomePage
// Use Props
const SearchResults = ({ results, loading, query }) => {
  return (
    <Paper elevation={2} sx={{ 
      borderRadius: 2, 
      overflow: "hidden", 
      mb: 4,
      background: 'linear-gradient(to bottom right, #f5f5f5, #ffffff)'
    }}>
      <Box sx={{ py: 2 }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          px: 3, 
          py: 1,
          background: 'linear-gradient(to right, #0D1B2A, #1B263B)'
        }}>
          <MovieIcon sx={{ mr: 1, color: '#778DA9' }} />
          <Typography variant="h5" sx={{ 
            fontWeight: "bold", 
            color: '#E0E1DD',
          }}>
            Search Results for "{query}"
          </Typography>
        </Box>
        
        <Box sx={{ p: 3 }}>
          {/* use conditional rending for the if still searching , not found and display the movies if found. use MovieCard Component */}
          {loading ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              minHeight: 200,
              justifyContent: 'center'
            }}>
              <CircularProgress sx={{ color: '#415A77' }} />
              <Typography sx={{ mt: 2, color: '#1B263B' }}>
                Searching movies...
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {results.length > 0 ? (
                results.map((movie) => (
                  <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard movie={movie} />
                  </Grid>
                ))
              ) : (
                <Box sx={{ 
                  width: '100%', 
                  textAlign: 'center', 
                  py: 4,
                  color: '#1B263B'
                }}>
                  <Typography variant="h6">
                    No results found for "{query}"
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Try different keywords or check the spelling
                  </Typography>
                </Box>
              )}
            </Grid>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default SearchResults;