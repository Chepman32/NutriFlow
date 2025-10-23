/**
 * Haptic Feedback Utilities
 * Wrapper functions for haptic feedback patterns
 */

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

/**
 * Light impact haptic feedback
 * Use for: Small UI interactions, selections
 */
export const hapticLight = () => {
  ReactNativeHapticFeedback.trigger('impactLight', options);
};

/**
 * Medium impact haptic feedback
 * Use for: Button presses, significant interactions
 */
export const hapticMedium = () => {
  ReactNativeHapticFeedback.trigger('impactMedium', options);
};

/**
 * Heavy impact haptic feedback
 * Use for: Important actions, confirmations
 */
export const hapticHeavy = () => {
  ReactNativeHapticFeedback.trigger('impactHeavy', options);
};

/**
 * Selection haptic feedback
 * Use for: Picker scrolling, slider adjustments
 */
export const hapticSelection = () => {
  ReactNativeHapticFeedback.trigger('selection', options);
};

/**
 * Success notification haptic
 * Use for: Successful operations, goal completions
 */
export const hapticSuccess = () => {
  ReactNativeHapticFeedback.trigger('notificationSuccess', options);
};

/**
 * Warning notification haptic
 * Use for: Warning messages, caution states
 */
export const hapticWarning = () => {
  ReactNativeHapticFeedback.trigger('notificationWarning', options);
};

/**
 * Error notification haptic
 * Use for: Error messages, failed operations
 */
export const hapticError = () => {
  ReactNativeHapticFeedback.trigger('notificationError', options);
};

/**
 * Rigid impact haptic (iOS 13+)
 * Use for: Solid, physical interactions
 */
export const hapticRigid = () => {
  ReactNativeHapticFeedback.trigger('rigid', options);
};

/**
 * Soft impact haptic (iOS 13+)
 * Use for: Soft, gentle interactions
 */
export const hapticSoft = () => {
  ReactNativeHapticFeedback.trigger('soft', options);
};

/**
 * Haptic for button press
 */
export const hapticButtonPress = () => {
  hapticMedium();
};

/**
 * Haptic for swipe gesture
 */
export const hapticSwipe = () => {
  hapticLight();
};

/**
 * Haptic for long press
 */
export const hapticLongPress = () => {
  hapticHeavy();
};

/**
 * Haptic for food item added
 */
export const hapticFoodAdded = () => {
  hapticSuccess();
};

/**
 * Haptic for food item deleted
 */
export const hapticFoodDeleted = () => {
  hapticMedium();
};

/**
 * Haptic for goal achieved
 */
export const hapticGoalAchieved = () => {
  hapticSuccess();
};

/**
 * Haptic for calorie limit reached
 */
export const hapticCalorieLimitReached = () => {
  hapticWarning();
};

/**
 * Haptic for toggle switch
 */
export const hapticToggle = () => {
  hapticSelection();
};

/**
 * Haptic for slider value change
 */
export const hapticSliderChange = () => {
  hapticSelection();
};
