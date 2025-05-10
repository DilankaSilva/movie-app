import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Avatar,
  Paper,
  Stack
} from '@mui/material';
import NoProfile from "../assets/no-poster.jpg";

const CastList = ({ cast }) => {
  return (
    <Paper elevation={3} sx={{ 
      p: { xs: 2, md: 4 },
      borderRadius: 2,
      background: 'white',
      mt: 4,
      overflow:'hidden'
    }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{
        fontWeight: 700,
        mb: 3,
        color: '#000000'
      }}>
        Top Cast
      </Typography>

      {cast.length > 0 ? (
        <Box sx={{
          overflowX:'auto',
          pb:2
        }}>
        <Grid container spacing={3} sx={{
          flexWrap:'nowrap',
          width:'auto',
          px:2
        }}>
          <Stack direction="row" spacing={2}>
          {cast.map((person) => (
            <Grid item key={person.credit_id} sx={{
              width:{xs:150, sm:180}
            }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                textAlign: 'center',
                transition:'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}>
                <Avatar
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                      : NoProfile
                  }
                  alt={person.name}
                  sx={{ 
                      width: { xs: 120, sm: 150 }, 
                      height: { xs: 120, sm: 150 },
                    mb: 1.5,
                    ml:2,
                    boxShadow: '0px 2px 4px'
                  }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {person.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'black' }}>
                  {person.character}
                </Typography>
              </Box>
            </Grid>
          ))}
          </Stack>
        </Grid>
        </Box>
      ) : (
        <Typography variant="body1" sx={{ color: 'black' }}>
          No cast information available.
        </Typography>
      )}
    </Paper>
  );
};

export default CastList;