import React from 'react';
import { Rating, Typography, Stack } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const colors = {
  yellow: "#FFD700",
  navy: "#1B263B"
};

const MovieRating = ({ rating, voteCount }) => {
  const starRating = rating ? rating / 2 : 0;
  
  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
      <Rating
        value={starRating}
        precision={0.5}
        readOnly
        size="small"
        icon={<StarIcon fontSize="inherit" sx={{ color: colors.yellow }} />}
        emptyIcon={<StarIcon fontSize="inherit" />}
      />
      <Typography 
        variant="body2" 
        sx={{ 
          color: colors.navy,
          fontWeight: 'medium'
        }}
      >
        {rating?.toFixed(1)} ({voteCount || 0})
      </Typography>
    </Stack>
  );
};

export default MovieRating;