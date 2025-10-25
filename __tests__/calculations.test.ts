/**
 * Calculation Utilities Tests
 */

import {
  calculateBMR,
  calculateTDEE,
  calculateBMI,
  calculateCaloriesFromMacros,
  lbsToKg,
  kgToLbs,
} from '../src/core/utils/calculations';

describe('Nutrition Calculations', () => {
  test('calculates BMR correctly for male', () => {
    const bmr = calculateBMR(80, 180, 30, 'male');
    expect(bmr).toBeCloseTo(1850, 0);
  });

  test('calculates BMR correctly for female', () => {
    const bmr = calculateBMR(60, 165, 25, 'female');
    expect(bmr).toBeCloseTo(1370, 0);
  });

  test('calculates TDEE correctly', () => {
    const bmr = 1850;
    const tdee = calculateTDEE(bmr, 'moderate');
    expect(tdee).toBe(2868);
  });

  test('calculates BMI correctly', () => {
    const bmi = calculateBMI(70, 175);
    expect(bmi).toBeCloseTo(22.9, 1);
  });

  test('calculates calories from macros', () => {
    const calories = calculateCaloriesFromMacros(50, 30, 20);
    expect(calories).toBe(500);
  });

  test('converts lbs to kg', () => {
    const kg = lbsToKg(150);
    expect(kg).toBeCloseTo(68.04, 1);
  });

  test('converts kg to lbs', () => {
    const lbs = kgToLbs(70);
    expect(lbs).toBeCloseTo(154.32, 1);
  });
});
