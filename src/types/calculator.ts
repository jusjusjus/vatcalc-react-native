export type Operator = '+' | '-' | '*' | '/';

export interface CalculatorState {
  currentInput: string;
  previousValue: number | null;
  operator: Operator | null;
  shouldResetInput: boolean;
  result: number | null;
  error: string | null;
}

export interface VatResult {
  net: number;
  vatAmount: number;
  gross: number;
}

export type ButtonType =
  | 'digit'
  | 'operator'
  | 'equals'
  | 'clear'
  | 'delete'
  | 'decimal'
  | 'vat';

export interface ButtonConfig {
  label: string;
  type: ButtonType;
  value?: string;
  accessibilityLabel?: string;
}
