import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { MovieCard } from './MovieCard';
import { Movie } from '../context/MovieContext';

interface CarouselProps {
  movies: Movie[];
  onMoviePress: (movie: Movie) => void;
  cardWidth?: number;
  cardHeight?: number;
}

const { width: screenWidth } = Dimensions.get('window');

export const Carousel: React.FC<CarouselProps> = ({
  movies,
  onMoviePress,
  cardWidth = screenWidth * 0.4,
  cardHeight = cardWidth * 1.5,
}) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={cardWidth + 16} // card width + margin
        snapToAlignment="start"
      >
        {movies.map((movie, index) => (
          <MovieCard
            key={`${movie.id}-${index}`}
            movie={movie}
            onPress={onMoviePress}
            width={cardWidth}
            height={cardHeight}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  
  scrollContent: {
    paddingHorizontal: 8,
  },
});
