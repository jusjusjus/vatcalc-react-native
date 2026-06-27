# vatcalc-react-native

A cross-platform mobile calculator app for iOS and Android built with Expo React Native and TypeScript.

## Features

- Basic arithmetic: addition, subtraction, multiplication, division
- Decimal number support
- Clear/reset and delete/backspace
- **VAT 19% button** — calculates German VAT (19%) for the current value, showing both the VAT amount and gross amount
- Division by zero error handling
- Safe area support (notches, status bars)
- Responsive layout for common iPhone and Android screen sizes

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the app

```bash
npm start       # Start the Expo dev server
npm run ios     # Run on iOS simulator
npm run android # Run on Android emulator/device
```

### Run tests

```bash
npm test
```

## Project Structure

```
App.tsx                          # Root component
src/
  types/calculator.ts            # TypeScript type definitions
  logic/
    calculator.ts                # Pure calculator logic (no UI)
    vat.ts                       # VAT calculation helpers
  components/
    CalculatorDisplay.tsx        # Display area component
    CalculatorButton.tsx         # Individual button component
    CalculatorKeypad.tsx         # Full keypad layout
  __tests__/
    calculator.test.ts           # Tests for calculator logic
    vat.test.ts                  # Tests for VAT logic
```

## VAT Calculation Example

- Input: `100`
- Tap **VAT 19%**
- Display shows:
  - `VAT: 19.00`
  - `Gross: 119.00`