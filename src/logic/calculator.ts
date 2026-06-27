import { CalculatorState, Operator } from '../types/calculator';

export const INITIAL_STATE: CalculatorState = {
  currentInput: '0',
  previousValue: null,
  operator: null,
  shouldResetInput: false,
  result: null,
  error: null,
};

export function inputDigit(state: CalculatorState, digit: string): CalculatorState {
  if (state.shouldResetInput) {
    return {
      ...state,
      currentInput: digit,
      shouldResetInput: false,
      error: null,
    };
  }

  if (state.currentInput === '0' && digit !== '.') {
    return { ...state, currentInput: digit, error: null };
  }

  if (state.currentInput.length >= 15) {
    return state;
  }

  return { ...state, currentInput: state.currentInput + digit, error: null };
}

export function inputDecimal(state: CalculatorState): CalculatorState {
  if (state.shouldResetInput) {
    return {
      ...state,
      currentInput: '0.',
      shouldResetInput: false,
      error: null,
    };
  }

  if (state.currentInput.includes('.')) {
    return state;
  }

  return { ...state, currentInput: state.currentInput + '.', error: null };
}

export function inputOperator(state: CalculatorState, operator: Operator): CalculatorState {
  const current = parseFloat(state.currentInput);

  if (state.error) {
    return state;
  }

  if (state.previousValue !== null && !state.shouldResetInput) {
    const computed = compute(state.previousValue, current, state.operator!);
    if (computed.error) {
      return { ...state, error: computed.error, shouldResetInput: true };
    }
    return {
      ...state,
      currentInput: formatResult(computed.value!),
      previousValue: computed.value!,
      operator,
      shouldResetInput: true,
      result: computed.value!,
      error: null,
    };
  }

  return {
    ...state,
    previousValue: current,
    operator,
    shouldResetInput: true,
    error: null,
  };
}

export function calculateEquals(state: CalculatorState): CalculatorState {
  if (state.error) {
    return state;
  }

  if (state.previousValue === null || state.operator === null) {
    return state;
  }

  const current = parseFloat(state.currentInput);
  const computed = compute(state.previousValue, current, state.operator);

  if (computed.error) {
    return {
      ...state,
      error: computed.error,
      shouldResetInput: true,
    };
  }

  return {
    currentInput: formatResult(computed.value!),
    previousValue: null,
    operator: null,
    shouldResetInput: true,
    result: computed.value!,
    error: null,
  };
}

export function clearCalculator(): CalculatorState {
  return { ...INITIAL_STATE };
}

export function deleteLast(state: CalculatorState): CalculatorState {
  if (state.shouldResetInput || state.error) {
    return clearCalculator();
  }

  if (state.currentInput.length <= 1 || state.currentInput === '-0') {
    return { ...state, currentInput: '0', error: null };
  }

  return { ...state, currentInput: state.currentInput.slice(0, -1), error: null };
}

interface ComputeResult {
  value?: number;
  error?: string;
}

export function compute(
  previous: number,
  current: number,
  operator: Operator,
): ComputeResult {
  switch (operator) {
    case '+':
      return { value: previous + current };
    case '-':
      return { value: previous - current };
    case '*':
      return { value: previous * current };
    case '/':
      if (current === 0) {
        return { error: 'Error: Division by zero' };
      }
      return { value: previous / current };
    default:
      return { value: current };
  }
}

export function formatResult(value: number): string {
  if (!isFinite(value)) {
    return 'Error';
  }

  const str = value.toString();

  if (str.includes('e')) {
    return value.toExponential(6);
  }

  const parts = str.split('.');
  if (parts[1] && parts[1].length > 10) {
    return parseFloat(value.toFixed(10)).toString();
  }

  return str;
}

export function getDisplayValue(state: CalculatorState): string {
  if (state.error) {
    return state.error;
  }
  return state.currentInput;
}
