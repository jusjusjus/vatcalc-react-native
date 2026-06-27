import { calculateVat, formatVatValue, isValidNetAmount, VAT_RATE } from '../logic/vat';

describe('VAT logic', () => {
  describe('calculateVat', () => {
    it('calculates 19% VAT correctly for 100', () => {
      const result = calculateVat(100);
      expect(result.net).toBe(100);
      expect(result.vatAmount).toBeCloseTo(19, 5);
      expect(result.gross).toBeCloseTo(119, 5);
    });

    it('calculates VAT for 0', () => {
      const result = calculateVat(0);
      expect(result.vatAmount).toBe(0);
      expect(result.gross).toBe(0);
    });

    it('calculates VAT for a decimal amount', () => {
      const result = calculateVat(50.5);
      expect(result.vatAmount).toBeCloseTo(9.595, 3);
      expect(result.gross).toBeCloseTo(60.095, 3);
    });

    it('uses the correct VAT rate', () => {
      expect(VAT_RATE).toBe(0.19);
    });
  });

  describe('formatVatValue', () => {
    it('formats a value to two decimal places', () => {
      expect(formatVatValue(19)).toBe('19.00');
      expect(formatVatValue(119)).toBe('119.00');
      expect(formatVatValue(9.5)).toBe('9.50');
    });

    it('rounds to two decimal places', () => {
      expect(formatVatValue(9.595)).toBe('9.60');
    });
  });

  describe('isValidNetAmount', () => {
    it('returns true for valid positive numbers', () => {
      expect(isValidNetAmount('100')).toBe(true);
      expect(isValidNetAmount('0')).toBe(true);
      expect(isValidNetAmount('3.14')).toBe(true);
    });

    it('returns false for non-numeric strings', () => {
      expect(isValidNetAmount('abc')).toBe(false);
      expect(isValidNetAmount('')).toBe(false);
    });

    it('returns false for negative numbers', () => {
      expect(isValidNetAmount('-5')).toBe(false);
    });

    it('returns false for error strings', () => {
      expect(isValidNetAmount('Error: Division by zero')).toBe(false);
    });
  });
});
