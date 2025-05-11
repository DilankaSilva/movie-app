import React, { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Button,
  Paper,
  Divider,
  Grid,
  Box,
  Container,
  useMediaQuery,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useMovie } from "../context/MovieContext";
import SearchBar from "../components/SerachBar";
import { getTrendingMovies, getAllMovies, searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import MovieFilter from "../components/MovieFilter";
import SearchResults from "../components/SearchResults";
import MovieIcon from "@mui/icons-material/Movie";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const HomePage = () => {
  const { logout } = useAuth();
  const { lastsearch, setLastsearch } = useMovie();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingAll, setLoadingAll] = useState(false);
  const [filters, setFilters] = useState({ year: "", rating: "" });

  // const isMobile = useMediaQuery("(max-width:600px)");

  // Fetch initial movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trending = await getTrendingMovies();
        setTrendingMovies(trending);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);
  // This is for useEffect to reset pagination when filters change
  useEffect(() => {
    setPage(1);
    setAllMovies([]);
    setHasMore(true);
  }, [filters.year, filters.rating]);

  // All movies pagination
  const fetchAllMovies = useCallback(async () => {
    if (!hasMore) return;

    setLoadingAll(true);
    try {
      const newMovies = await getAllMovies({
        page,
        year: filters.year,
        rating: filters.rating,
      });
      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setAllMovies((prev) => [...prev, ...newMovies]);
      }
    } catch (error) {
      console.error("Error fetching all movies:", error);
    } finally {
      setLoadingAll(false);
    }
  }, [page, hasMore, filters.year, filters.rating]);

  useEffect(() => {
    fetchAllMovies();
  }, [fetchAllMovies]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (lastsearch) {
      setSearchQuery(lastsearch.query);
      setSearchResults(lastsearch.results);
      setIsSearching(true);
    }
  }, [lastsearch]);

  const handleSearch = useCallback(
    async (query) => {
      if (!query.trim()) {
        setIsSearching(false);
        setSearchResults([]);
        return;
      }

      try {
        setSearchLoading(true);
        setIsSearching(true);
        setSearchQuery(query);
        const data = await searchMovies(query);
        setSearchResults(data.results);
        setLastsearch({ query, results: data.results });
      } catch (error) {
        console.error("Error searching movies:", error);
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    },
    [setLastsearch]
  );

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
        <Box sx={{ p: { xs: 3, md: 6 }, textAlign: "center", color: "white" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: "bold",
                mb: 1,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Movie Explorer
            </Typography>

            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: "medium",
                fontStyle: "italic",
                color: "#E0E1DD",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                maxWidth: "700px",
              }}
            >
              Discover, Explore, and Fall in Love with Cinema All Over Again.
            </Typography>
          </Box>

          <Box sx={{ maxWidth: "700px", mx: "auto" }}>
            <SearchBar onSearch={handleSearch} />
          </Box>
        </Box>
      </Paper>

      {isSearching && (
        <SearchResults
          results={searchResults}
          loading={searchLoading}
          query={searchQuery}
        />
      )}

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}>
        {/* Trending Section */}
        <Box sx={{ bgcolor: "#E0E1DD", py: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", px: 3, py: 1 }}>
            <TrendingUpIcon sx={{ mr: 1, color: "#415A77" }} />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#1B263B" }}
            >
              Trending This Week
            </Typography>
          </Box>
          <Divider sx={{ mx: 3, borderColor: "#778DA9", mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 2,
              px: 3,
              pb: 3,
            }}
          >
            {trendingMovies.map((movie) => (
              <Box key={movie.id} sx={{ minWidth: 220 }}>
                <MovieCard movie={movie} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* All Movies Section with Pagination */}
        <Box sx={{ py: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{
              px: 3,
              py: 2,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <MovieIcon sx={{ color: "#415A77", fontSize: 30 }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#1B263B" }}
              >
                All Movies
              </Typography>
            </Stack>

            <MovieFilter onApplyFilters={setFilters} />
          </Stack>
          <Divider sx={{ mx: 3, borderColor: "#778DA9", mb: 2 }} />

          {loadingAll && allMovies.length === 0 ? (
            <Box sx={{ m: 3, p: 3, textAlign: "center" }}>
              <CircularProgress sx={{ color: "#415A77" }} />
              <Typography sx={{ mt: 2 }}>Loading movies...</Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={5} sx={{ p: 3, bgcolor: "#E0E1DD" }} justifyContent='center'>
                {allMovies.map((movie) => (
                  <Grid
                    item
                    key={movie.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={2}
                    sx={{ display: "flex" }}
                  >
                    <MovieCard movie={movie} />
                  </Grid>
                ))}
              </Grid>

              {hasMore && (
                <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
                  <Button
                    variant="contained"
                    onClick={handleLoadMore}
                    disabled={loadingAll}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      bgcolor: "#415A77",
                      "&:hover": { bgcolor: "#1B263B" },
                    }}
                  >
                    Load More
                  </Button>
                </Box>
              )}
            </>
          )}
        </Box>
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="outlined"
          onClick={logout}
          sx={{
            borderRadius: 2,
            color: "#1B263B",
            borderColor: "#1B263B",
            "&:hover": {
              borderColor: "#415A77",
              color: "#415A77",
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
