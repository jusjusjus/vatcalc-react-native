import {
  INITIAL_STATE,
  inputDigit,
  inputDecimal,
  inputOperator,
  calculateEquals,
  clearCalculator,
  deleteLast,
  compute,
  formatResult,
  getDisplayValue,
} from '../logic/calculator';
import { CalculatorState } from '../types/calculator';

describe('calculator logic', () => {
  describe('inputDigit', () => {
    it('replaces the initial zero with a digit', () => {
      const state = inputDigit(INITIAL_STATE, '5');
      expect(state.currentInput).toBe('5');
    });

    it('appends a digit to current input', () => {
      const state = inputDigit({ ...INITIAL_STATE, currentInput: '5' }, '3');
      expect(state.currentInput).toBe('53');
    });

    it('resets input when shouldResetInput is true', () => {
      const state = inputDigit({ ...INITIAL_STATE, currentInput: '5', shouldResetInput: true }, '3');
      expect(state.currentInput).toBe('3');
      expect(state.shouldResetInput).toBe(false);
    });

    it('keeps zero if digit is zero and input is already zero', () => {
      const state = inputDigit(INITIAL_STATE, '0');
      expect(state.currentInput).toBe('0');
    });

    it('limits input to 15 characters', () => {
      const longState: CalculatorState = { ...INITIAL_STATE, currentInput: '123456789012345' };
      const result = inputDigit(longState, '6');
      expect(result.currentInput).toBe('123456789012345');
    });
  });

  describe('inputDecimal', () => {
    it('adds a decimal point to a whole number', () => {
      const state = inputDecimal({ ...INITIAL_STATE, currentInput: '5' });
      expect(state.currentInput).toBe('5.');
    });

    it('does not add a second decimal point', () => {
      const state = inputDecimal({ ...INITIAL_STATE, currentInput: '5.' });
      expect(state.currentInput).toBe('5.');
    });

    it('starts with 0. when shouldResetInput is true', () => {
      const state = inputDecimal({ ...INITIAL_STATE, shouldResetInput: true });
      expect(state.currentInput).toBe('0.');
      expect(state.shouldResetInput).toBe(false);
    });
  });

  describe('inputOperator', () => {
    it('stores current value and operator', () => {
      const state = inputOperator({ ...INITIAL_STATE, currentInput: '10' }, '+');
      expect(state.previousValue).toBe(10);
      expect(state.operator).toBe('+');
      expect(state.shouldResetInput).toBe(true);
    });

    it('chains operations by computing previous result', () => {
      let state = inputOperator({ ...INITIAL_STATE, currentInput: '10' }, '+');
      state = inputDigit(state, '5');
      state = inputOperator(state, '*');
      expect(state.currentInput).toBe('15');
      expect(state.previousValue).toBe(15);
      expect(state.operator).toBe('*');
    });

    it('returns error state for division by zero during chaining', () => {
      let state = inputOperator({ ...INITIAL_STATE, currentInput: '10' }, '/');
      state = inputDigit(state, '0');
      state = inputOperator(state, '+');
      expect(state.error).toBe('Error: Division by zero');
    });
  });

  describe('calculateEquals', () => {
    it('computes addition correctly', () => {
      let state: CalculatorState = { ...INITIAL_STATE, currentInput: '10' };
      state = inputOperator(state, '+');
      state = inputDigit(state, '5');
      state = calculateEquals(state);
      expect(state.currentInput).toBe('15');
      expect(state.result).toBe(15);
    });

    it('computes subtraction correctly', () => {
      let state: CalculatorState = { ...INITIAL_STATE, currentInput: '10' };
      state = inputOperator(state, '-');
      state = inputDigit(state, '3');
      state = calculateEquals(state);
      expect(state.currentInput).toBe('7');
    });

    it('computes multiplication correctly', () => {
      let state: CalculatorState = { ...INITIAL_STATE, currentInput: '6' };
      state = inputOperator(state, '*');
      state = inputDigit(state, '7');
      state = calculateEquals(state);
      expect(state.currentInput).toBe('42');
    });

    it('computes division correctly', () => {
      let state: CalculatorState = { ...INITIAL_STATE, currentInput: '20' };
      state = inputOperator(state, '/');
      state = inputDigit(state, '4');
      state = calculateEquals(state);
      expect(state.currentInput).toBe('5');
    });

    it('returns error for division by zero', () => {
      let state: CalculatorState = { ...INITIAL_STATE, currentInput: '10' };
      state = inputOperator(state, '/');
      state = inputDigit(state, '0');
      state = calculateEquals(state);
      expect(state.error).toBe('Error: Division by zero');
    });

    it('does nothing when there is no operator', () => {
      const state = calculateEquals({ ...INITIAL_STATE, currentInput: '5' });
      expect(state.currentInput).toBe('5');
    });
  });

  describe('clearCalculator', () => {
    it('resets to initial state', () => {
      const dirty: CalculatorState = {
        currentInput: '99',
        previousValue: 10,
        operator: '+',
        shouldResetInput: true,
        result: 5,
        error: 'Some error',
      };
      const state = clearCalculator();
      expect(state).toEqual(INITIAL_STATE);
    });
  });

  describe('deleteLast', () => {
    it('removes last character', () => {
      const state = deleteLast({ ...INITIAL_STATE, currentInput: '123' });
      expect(state.currentInput).toBe('12');
    });

    it('resets to zero if only one character remains', () => {
      const state = deleteLast({ ...INITIAL_STATE, currentInput: '5' });
      expect(state.currentInput).toBe('0');
    });

    it('resets calculator when shouldResetInput is true', () => {
      const state = deleteLast({ ...INITIAL_STATE, shouldResetInput: true });
      expect(state).toEqual(INITIAL_STATE);
    });

    it('resets calculator on error', () => {
      const state = deleteLast({ ...INITIAL_STATE, error: 'Error: Division by zero' });
      expect(state).toEqual(INITIAL_STATE);
    });
  });

  describe('compute', () => {
    it('adds two numbers', () => {
      expect(compute(3, 4, '+')).toEqual({ value: 7 });
    });

    it('subtracts two numbers', () => {
      expect(compute(10, 3, '-')).toEqual({ value: 7 });
    });

    it('multiplies two numbers', () => {
      expect(compute(3, 4, '*')).toEqual({ value: 12 });
    });

    it('divides two numbers', () => {
      expect(compute(20, 4, '/')).toEqual({ value: 5 });
    });

    it('returns error for division by zero', () => {
      expect(compute(5, 0, '/')).toEqual({ error: 'Error: Division by zero' });
    });
  });

  describe('formatResult', () => {
    it('formats integers correctly', () => {
      expect(formatResult(42)).toBe('42');
    });

    it('formats decimals correctly', () => {
      expect(formatResult(3.14)).toBe('3.14');
    });

    it('limits very long decimals to 10 places', () => {
      const result = formatResult(1 / 3);
      expect(result.length).toBeLessThanOrEqual(14);
    });
  });

  describe('getDisplayValue', () => {
    it('returns current input when no error', () => {
      expect(getDisplayValue({ ...INITIAL_STATE, currentInput: '42' })).toBe('42');
    });

    it('returns error message when there is an error', () => {
      expect(getDisplayValue({ ...INITIAL_STATE, error: 'Error: Division by zero' })).toBe('Error: Division by zero');
    });
  });
});
