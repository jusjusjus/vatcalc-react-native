import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ButtonType } from '../types/calculator';

interface CalculatorButtonProps {
  label: string;
  type: ButtonType;
  onPress: () => void;
  wide?: boolean;
  accessibilityLabel?: string;
}

const BUTTON_COLORS: Record<ButtonType, string> = {
  digit: '#2d2d44',
  operator: '#e05c00',
  equals: '#e05c00',
  clear: '#555577',
  delete: '#555577',
  decimal: '#2d2d44',
  vat: '#1a6b3a',
};

const BUTTON_TEXT_COLORS: Record<ButtonType, string> = {
  digit: '#ffffff',
  operator: '#ffffff',
  equals: '#ffffff',
  clear: '#ffffff',
  delete: '#ffffff',
  decimal: '#ffffff',
  vat: '#ffffff',
};

export default function CalculatorButton({
  label,
  type,
  onPress,
  wide = false,
  accessibilityLabel,
}: CalculatorButtonProps) {
  const backgroundColor = BUTTON_COLORS[type];
  const textColor = BUTTON_TEXT_COLORS[type];

  const buttonStyle: ViewStyle[] = [
    styles.button,
    { backgroundColor },
    wide ? styles.wideButton : {},
  ];

  const textStyle: TextStyle[] = [
    styles.buttonText,
    { color: textColor },
    type === 'vat' ? styles.vatButtonText : {},
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      activeOpacity={0.7}
    >
      <Text style={textStyle} adjustsFontSizeToFit numberOfLines={1}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 5,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 72,
  },
  wideButton: {
    flex: 2,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '400',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  vatButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
