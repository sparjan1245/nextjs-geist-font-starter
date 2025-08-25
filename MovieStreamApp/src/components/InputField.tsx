import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  required = false,
  onFocus,
  onBlur,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  const getInputStyle = (): TextStyle[] => {
    const baseStyle: TextStyle[] = [styles.input];
    
    if (isFocused) {
      baseStyle.push(styles.inputFocused);
    }
    
    if (error) {
      baseStyle.push(styles.inputError);
    }
    
    if (inputStyle) {
      baseStyle.push(inputStyle);
    }
    
    return baseStyle;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <TextInput
        style={getInputStyle()}
        placeholderTextColor={colors.textMuted}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...textInputProps}
      />
      
      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  
  label: {
    fontSize: fonts.md,
    fontWeight: fonts.medium,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  
  required: {
    color: colors.error,
  },
  
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
    fontWeight: fonts.regular,
  },
  
  inputFocused: {
    borderColor: colors.inputFocus,
    borderWidth: 2,
  },
  
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  
  errorText: {
    fontSize: fonts.sm,
    color: colors.error,
    marginTop: 4,
    fontWeight: fonts.regular,
  },
});
