import { VatResult } from '../types/calculator';

export const VAT_RATE = 0.19;

export function calculateVat(net: number): VatResult {
  const vatAmount = net * VAT_RATE;
  const gross = net + vatAmount;
  return { net, vatAmount, gross };
}

export function formatVatValue(value: number): string {
  return value.toFixed(2);
}

export function isValidNetAmount(input: string): boolean {
  const value = parseFloat(input);
  return !isNaN(value) && isFinite(value) && value >= 0;
}
