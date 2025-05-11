import React, { useState } from 'react';
import { Box, TextField, Grid, Paper, Typography, Button, Stack } from '@mui/material';

const MovieFilter = ({ onApplyFilters }) => {
    //useStates of filter options take user input
  const [localYear, setLocalYear] = useState('');
  const [localRating, setLocalRating] = useState('');


// filters by year and rateing
  const handleApply = () => {
    onApplyFilters({
      year: localYear,
      rating: localRating,
    });
  };

  return (
  <Stack 
    direction="row" 
    spacing={2} 
    alignItems="center" 
    flexWrap="wrap" // Allows wrapping on small screens
  >
    <Typography 
      variant="h6" 
      sx={{ minWidth: '130px' }} // Prevents shrinking too much
    >
      Filter Movies
    </Typography>

    <TextField
      label="Year"
      type="number"
      value={localYear}
      onChange={(e) => setLocalYear(e.target.value)}
      inputProps={{ min: "1900", max: new Date().getFullYear() }}
      sx={{ minWidth: 150, flex: 1 }}
    />

    <TextField
      label="Minimum Rating"
      type="number"
      value={localRating}
      onChange={(e) => setLocalRating(e.target.value)}
      inputProps={{ min: "0", max: "10", step: "0.1" }}
      sx={{ minWidth: 180, flex: 1 }}
    />

    <Button 
      variant="contained" 
      onClick={handleApply}
      sx={{ whiteSpace: 'nowrap' }}
    >
      Apply Filters
    </Button>
  </Stack>
    );
};

export default MovieFilter;