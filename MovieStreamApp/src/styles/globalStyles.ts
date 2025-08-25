import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { fonts } from './fonts';

export const globalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  
  // Text styles
  title: {
    fontSize: fonts.xxxl,
    fontWeight: fonts.bold,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  
  subtitle: {
    fontSize: fonts.xl,
    fontWeight: fonts.semibold,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  
  bodyText: {
    fontSize: fonts.md,
    fontWeight: fonts.regular,
    color: colors.textSecondary,
    lineHeight: fonts.lineHeight.normal * fonts.md,
  },
  
  caption: {
    fontSize: fonts.sm,
    fontWeight: fonts.regular,
    color: colors.textMuted,
  },
  
  // Button styles
  button: {
    backgroundColor: colors.buttonPrimary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  
  buttonSecondary: {
    backgroundColor: colors.buttonSecondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  
  buttonText: {
    fontSize: fonts.md,
    fontWeight: fonts.semibold,
    color: colors.textPrimary,
  },
  
  buttonDisabled: {
    backgroundColor: colors.buttonDisabled,
    opacity: 0.6,
  },
  
  // Input styles
  input: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: fonts.md,
    color: colors.textPrimary,
    minHeight: 48,
  },
  
  inputFocused: {
    borderColor: colors.inputFocus,
  },
  
  inputError: {
    borderColor: colors.error,
  },
  
  // Card styles
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
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
  
  // Layout styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Spacing
  marginVertical: {
    marginVertical: 16,
  },
  
  marginHorizontal: {
    marginHorizontal: 16,
  },
  
  padding: {
    padding: 16,
  },
  
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  
  paddingVertical: {
    paddingVertical: 16,
  },
  
  // Error styles
  errorText: {
    fontSize: fonts.sm,
    color: colors.error,
    marginTop: 4,
  },
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  
  // Overlay styles
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  overlayLight: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayLight,
  },
});
