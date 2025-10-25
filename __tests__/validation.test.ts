/**
 * Validation Utilities Tests
 */

import {
  isValidEmail,
  isValidWeight,
  isValidHeight,
  isValidAge,
  isValidCalories,
} from '../src/core/utils/validation';

describe('Validation Functions', () => {
  test('validates email correctly', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
  });

  test('validates weight correctly', () => {
    expect(isValidWeight(70, 'kg')).toBe(true);
    expect(isValidWeight(0, 'kg')).toBe(false);
    expect(isValidWeight(600, 'kg')).toBe(false);
  });

  test('validates height correctly', () => {
    expect(isValidHeight(175, 'cm')).toBe(true);
    expect(isValidHeight(30, 'cm')).toBe(false);
    expect(isValidHeight(400, 'cm')).toBe(false);
  });

  test('validates age correctly', () => {
    expect(isValidAge(25)).toBe(true);
    expect(isValidAge(10)).toBe(false);
    expect(isValidAge(150)).toBe(false);
  });

  test('validates calories correctly', () => {
    expect(isValidCalories(2000)).toBe(true);
    expect(isValidCalories(-10)).toBe(false);
    expect(isValidCalories(15000)).toBe(false);
  });
});
