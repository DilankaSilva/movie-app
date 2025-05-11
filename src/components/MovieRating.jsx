import React from 'react';
import { Rating, Typography, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

/*This file implemet the to display rate using * 
    use MUI for styling */

const MovieRating = ({ rating, voteCount }) => {
  
  // rating is out of 10 but i use 5 stars(commonly use 5 stars)
  const starRating = rating ? rating / 2 : 0;
  
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
      <Rating
        value={starRating}
        precision={0.5}
        readOnly
        size="small"
        icon={<StarIcon fontSize="inherit" sx={{ color: '#FFD700' }} />}
        emptyIcon={<StarIcon fontSize="inherit" />}
      />
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#1B263B',
          fontWeight: 'medium'
        }}
      >
        {rating?.toFixed(1)} ({voteCount || 0})
      </Typography>
    </Stack>
  );
};

export default MovieRating;