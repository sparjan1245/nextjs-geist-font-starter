import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { Movie } from '../context/MovieContext';

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  width?: number;
  height?: number;
}

const { width: screenWidth } = Dimensions.get('window');

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  width = screenWidth * 0.4,
  height = width * 1.5,
}) => {
  const handlePress = () => {
    if (onPress && movie) {
      onPress(movie);
    }
  };

  const handleImageError = () => {
    console.log('Image failed to load for movie:', movie.title);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { width, height }]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: movie.poster }}
          style={[styles.poster, { width: width - 4, height: height - 60 }]}
          resizeMode="cover"
          onError={handleImageError}
        />
        
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            ⭐ {movie.rating.toFixed(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        
        <Text style={styles.category} numberOfLines={1}>
          {movie.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 8,
    shadowColor: colors.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  imageContainer: {
    position: 'relative',
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  
  poster: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.backgroundSecondary,
  },
  
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.overlay,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  ratingText: {
    fontSize: fonts.xs,
    fontWeight: fonts.semibold,
    color: colors.textPrimary,
  },
  
  infoContainer: {
    padding: 12,
    height: 60,
    justifyContent: 'center',
  },
  
  title: {
    fontSize: fonts.md,
    fontWeight: fonts.semibold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  
  category: {
    fontSize: fonts.sm,
    fontWeight: fonts.regular,
    color: colors.textSecondary,
  },
});
