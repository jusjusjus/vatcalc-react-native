import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import CalculatorDisplay from './src/components/CalculatorDisplay';
import CalculatorKeypad from './src/components/CalculatorKeypad';
import {
  INITIAL_STATE,
  inputDigit,
  inputDecimal,
  inputOperator,
  calculateEquals,
  clearCalculator,
  deleteLast,
  getDisplayValue,
} from './src/logic/calculator';
import { calculateVat, isValidNetAmount } from './src/logic/vat';
import { CalculatorState, ButtonConfig, VatResult } from './src/types/calculator';

export default function App() {
  const [calcState, setCalcState] = useState<CalculatorState>(INITIAL_STATE);
  const [vatResult, setVatResult] = useState<VatResult | null>(null);

  const handleButtonPress = useCallback((config: ButtonConfig) => {
    setCalcState((prev) => {
      setVatResult(null);

      switch (config.type) {
        case 'digit':
          return inputDigit(prev, config.value ?? config.label);
        case 'decimal':
          return inputDecimal(prev);
        case 'operator':
          return inputOperator(prev, config.value as '+' | '-' | '*' | '/');
        case 'equals':
          return calculateEquals(prev);
        case 'clear':
          return clearCalculator();
        case 'delete':
          return deleteLast(prev);
        case 'vat': {
          if (isValidNetAmount(prev.currentInput)) {
            const net = parseFloat(prev.currentInput);
            setVatResult(calculateVat(net));
          }
          return prev;
        }
        default:
          return prev;
      }
    });
  }, []);

  const displayValue = getDisplayValue(calcState);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <View style={styles.display}>
            <CalculatorDisplay value={displayValue} vatResult={vatResult} />
          </View>
          <CalculatorKeypad onButtonPress={handleButtonPress} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
    justifyContent: 'flex-end',
  },
  display: {
    flex: 1,
  },
});
