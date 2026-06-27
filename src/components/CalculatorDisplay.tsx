import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VatResult } from '../types/calculator';
import { formatVatValue } from '../logic/vat';

interface CalculatorDisplayProps {
  value: string;
  vatResult: VatResult | null;
}

export default function CalculatorDisplay({ value, vatResult }: CalculatorDisplayProps) {
  return (
    <View style={styles.container}>
      <Text
        style={styles.displayText}
        numberOfLines={1}
        adjustsFontSizeToFit
        accessibilityLabel={`Display: ${value}`}
      >
        {value}
      </Text>
      {vatResult !== null && (
        <View style={styles.vatContainer}>
          <Text style={styles.vatText} accessibilityLabel={`VAT amount: ${formatVatValue(vatResult.vatAmount)} euros`}>
            VAT: {formatVatValue(vatResult.vatAmount)}
          </Text>
          <Text style={styles.vatText} accessibilityLabel={`Gross amount: ${formatVatValue(vatResult.gross)} euros`}>
            Gross: {formatVatValue(vatResult.gross)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  displayText: {
    color: '#ffffff',
    fontSize: 60,
    fontWeight: '200',
    textAlign: 'right',
    width: '100%',
    minHeight: 72,
  },
  vatContainer: {
    marginTop: 8,
    alignItems: 'flex-end',
    width: '100%',
  },
  vatText: {
    color: '#a0c4ff',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'right',
  },
});
