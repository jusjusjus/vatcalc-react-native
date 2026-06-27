import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalculatorButton from './CalculatorButton';
import { ButtonConfig } from '../types/calculator';

interface CalculatorKeypadProps {
  onButtonPress: (config: ButtonConfig) => void;
}

const BUTTONS: ButtonConfig[][] = [
  [
    { label: 'C', type: 'clear', accessibilityLabel: 'Clear' },
    { label: '⌫', type: 'delete', accessibilityLabel: 'Delete last digit' },
    { label: 'VAT 19%', type: 'vat', accessibilityLabel: 'Calculate VAT at 19 percent' },
    { label: '÷', type: 'operator', value: '/', accessibilityLabel: 'Divide' },
  ],
  [
    { label: '7', type: 'digit', value: '7' },
    { label: '8', type: 'digit', value: '8' },
    { label: '9', type: 'digit', value: '9' },
    { label: '×', type: 'operator', value: '*', accessibilityLabel: 'Multiply' },
  ],
  [
    { label: '4', type: 'digit', value: '4' },
    { label: '5', type: 'digit', value: '5' },
    { label: '6', type: 'digit', value: '6' },
    { label: '−', type: 'operator', value: '-', accessibilityLabel: 'Subtract' },
  ],
  [
    { label: '1', type: 'digit', value: '1' },
    { label: '2', type: 'digit', value: '2' },
    { label: '3', type: 'digit', value: '3' },
    { label: '+', type: 'operator', value: '+', accessibilityLabel: 'Add' },
  ],
  [
    { label: '0', type: 'digit', value: '0', accessibilityLabel: 'Zero' },
    { label: '.', type: 'decimal', accessibilityLabel: 'Decimal point' },
    { label: '=', type: 'equals', accessibilityLabel: 'Equals' },
  ],
];

export default function CalculatorKeypad({ onButtonPress }: CalculatorKeypadProps) {
  return (
    <View style={styles.keypad}>
      {BUTTONS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((btn, btnIndex) => (
            <CalculatorButton
              key={`${rowIndex}-${btnIndex}`}
              label={btn.label}
              type={btn.type}
              wide={btn.label === '0'}
              accessibilityLabel={btn.accessibilityLabel}
              onPress={() => onButtonPress(btn)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keypad: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
