# NutriFlow - Software Design Document

## Executive Summary

**Application Name:** NutriFlow
**Platform:** iOS (Primary) - React Native
**Target iOS Version:** iOS 16.0+
**Monetization:** In-App Purchases (Subscription Model)
**Offline Capability:** 100% Offline-First Architecture
**Primary Technologies:** React Native, React Native Reanimated 3, React Native Skia, AsyncStorage, SQLite

---

## 1. Application Overview

### 1.1 Product Vision

NutriFlow is a gesture-driven, offline-first calorie and nutrition tracking application that combines powerful functionality with delightful animations and intuitive UX. The app empowers users to track their daily nutrition, monitor weight progress, log activities, and achieve their health goals through an elegant, physics-based interface.

### 1.2 Core Features

**Free Tier:**
- Daily food diary with meal tracking (Breakfast, Lunch, Dinner, Snacks)
- Comprehensive food database (2M+ items stored locally)
- Barcode scanner for quick food entry
- Calorie and macronutrient tracking (Carbs, Proteins, Fats)
- Basic weight tracking
- Water intake logging
- Daily step counter integration
- Basic activity logging
- Progress visualization (daily view)
- Goal setting and personalized calorie targets
- Favorite foods and recent items
- Basic intermittent fasting timer (16:8)

**Premium Tier (PRO):**
- Advanced meal planning (7-14 day planning)
- 500+ curated recipes with nutritional information
- Extended intermittent fasting plans (5:2, OMAD, custom)
- Detailed micronutrient tracking (12+ vitamins and minerals)
- Advanced analytics (weekly/monthly reports, trends)
- Extended body measurements (body fat %, muscle mass, BMI, waist, etc.)
- Export data to CSV/PDF
- Multiple nutrition goals (weight loss, muscle gain, maintenance)
- Advanced recipe creator with step-by-step instructions
- Meal templates and quick-add combinations
- Priority customer support
- Ad-free experience
- Custom food database sync across devices

### 1.3 Target Audience

- Health-conscious individuals (ages 18-55)
- Fitness enthusiasts and athletes
- People with weight management goals
- Individuals practicing intermittent fasting
- Users seeking detailed nutritional insights

---

## 2. Technical Architecture

### 2.1 Technology Stack

**Core Framework:**
- React Native 0.76+
- TypeScript 5.3+
- React 18.2+

**State Management:**
- Zustand 4.5+ (primary state management)
- React Query 5.0+ (data synchronization and caching)
- Async Storage (persistent storage)

**Database:**
- SQLite (via react-native-sqlite-storage)
- WatermelonDB (reactive database layer)
- Realm (alternative for complex queries)

**Animation Libraries:**
- React Native Reanimated 3.6+
- React Native Skia 1.0+
- React Native Gesture Handler 2.14+
- Lottie React Native (JSON animations)

**UI Components:**
- React Native Paper (base component library)
- Custom component library built on RN core
- React Native SVG (vector graphics)
- Victory Native (charts and graphs)

**Navigation:**
- React Navigation 6.x (Stack, Bottom Tabs, Drawer)
- Custom gesture-based navigation system

**Utilities:**
- date-fns (date manipulation)
- react-native-vision-camera (barcode scanning)
- react-native-camera-kit (alternative scanner)
- react-native-sensors (accelerometer, pedometer)
- react-native-health (HealthKit integration)
- react-native-haptic-feedback (tactile responses)

**Development Tools:**
- ESLint + Prettier
- Husky (git hooks)
- Jest + React Native Testing Library
- Detox (E2E testing)
- Flipper (debugging)

### 2.2 Architecture Pattern

**MVVM (Model-View-ViewModel) + Clean Architecture**

```
┌─────────────────────────────────────────────────────┐
│                  Presentation Layer                  │
│  (Screens, Components, Animations, Gesture Handlers) │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────┐
│                   ViewModel Layer                    │
│        (Zustand Stores, Business Logic, Hooks)       │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────┐
│                    Domain Layer                      │
│          (Entities, Use Cases, Repositories)         │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────┐
│                     Data Layer                       │
│     (SQLite, AsyncStorage, HealthKit, Sensors)       │
└─────────────────────────────────────────────────────┘
```

### 2.3 Project Structure

```
nutriflow/
├── src/
│   ├── core/
│   │   ├── constants/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   ├── spacing.ts
│   │   │   ├── animations.ts
│   │   │   └── nutrition.ts
│   │   ├── theme/
│   │   │   ├── lightTheme.ts
│   │   │   ├── darkTheme.ts
│   │   │   └── themeContext.tsx
│   │   └── utils/
│   │       ├── calculations.ts
│   │       ├── validation.ts
│   │       ├── formatting.ts
│   │       └── haptics.ts
│   ├── data/
│   │   ├── database/
│   │   │   ├── schema.ts
│   │   │   ├── migrations/
│   │   │   └── seeds/
│   │   ├── repositories/
│   │   │   ├── FoodRepository.ts
│   │   │   ├── DiaryRepository.ts
│   │   │   ├── UserRepository.ts
│   │   │   └── MeasurementRepository.ts
│   │   └── models/
│   │       ├── Food.ts
│   │       ├── DiaryEntry.ts
│   │       ├── User.ts
│   │       └── Measurement.ts
│   ├── domain/
│   │   ├── entities/
│   │   ├── usecases/
│   │   │   ├── diary/
│   │   │   ├── nutrition/
│   │   │   ├── analytics/
│   │   │   └── fasting/
│   │   └── interfaces/
│   ├── presentation/
│   │   ├── navigation/
│   │   │   ├── RootNavigator.tsx
│   │   │   ├── MainTabNavigator.tsx
│   │   │   ├── DiaryStackNavigator.tsx
│   │   │   └── ProfileStackNavigator.tsx
│   │   ├── screens/
│   │   │   ├── splash/
│   │   │   ├── onboarding/
│   │   │   ├── diary/
│   │   │   ├── search/
│   │   │   ├── analytics/
│   │   │   ├── recipes/
│   │   │   ├── fasting/
│   │   │   └── profile/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── diary/
│   │   │   ├── charts/
│   │   │   ├── animated/
│   │   │   └── skia/
│   │   ├── animations/
│   │   │   ├── splash/
│   │   │   ├── transitions/
│   │   │   ├── gestures/
│   │   │   └── micro/
│   │   └── stores/
│   │       ├── diaryStore.ts
│   │       ├── userStore.ts
│   │       ├── nutritionStore.ts
│   │       └── uiStore.ts
│   └── assets/
│       ├── icons/
│       ├── lottie/
│       └── images/
├── ios/
├── android/
└── package.json
```

---

## 3. Data Models & Database Schema

### 3.1 User Schema

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  settings: UserSettings;
  goals: NutritionGoals;
  measurements: UserMeasurements;
  isPremium: boolean;
  premiumExpiresAt: Date | null;
}

interface UserSettings {
  units: 'metric' | 'imperial';
  theme: 'light' | 'dark' | 'auto';
  startOfWeek: 'monday' | 'sunday';
  waterUnit: 'ml' | 'oz' | 'cups';
  notificationsEnabled: boolean;
  hapticFeedbackEnabled: boolean;
  biometricAuthEnabled: boolean;
}

interface NutritionGoals {
  dailyCalories: number;
  carbs: number;
  proteins: number;
  fats: number;
  water: number;
  goalType: 'lose_weight' | 'maintain' | 'gain_muscle';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  weeklyWeightChange: number;
}
```

### 3.2 Food Database Schema

```sql
CREATE TABLE foods (
  id TEXT PRIMARY KEY,
  barcode TEXT UNIQUE,
  name TEXT NOT NULL,
  brand TEXT,
  serving_size REAL NOT NULL,
  serving_unit TEXT NOT NULL,
  calories REAL NOT NULL,
  carbs REAL NOT NULL,
  proteins REAL NOT NULL,
  fats REAL NOT NULL,
  fiber REAL,
  sugar REAL,
  sodium REAL,
  vitamins_json TEXT,
  minerals_json TEXT,
  category TEXT,
  verified INTEGER DEFAULT 0,
  user_created INTEGER DEFAULT 0,
  popularity INTEGER DEFAULT 0
);
```

### 3.3 Diary Schema

```sql
CREATE TABLE diary_entries (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date DATE NOT NULL,
  meal_type TEXT NOT NULL,
  food_id TEXT NOT NULL,
  servings REAL NOT NULL,
  calories REAL NOT NULL,
  carbs REAL NOT NULL,
  proteins REAL NOT NULL,
  fats REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. User Interface Design System

### 4.1 Color Palette

**Light Theme:**
- Primary: #4CAF50 (Green)
- Secondary: #2196F3 (Blue)
- Accent: #FF9800 (Orange)
- Background: #FFFFFF
- Surface: #F5F5F5
- Text Primary: #212121
- Text Secondary: #757575

**Dark Theme:**
- Primary: #66BB6A
- Secondary: #42A5F5
- Accent: #FFA726
- Background: #121212
- Surface: #1E1E1E
- Text Primary: #FFFFFF
- Text Secondary: #B0B0B0

### 4.2 Typography

- Font Family: Inter (Regular, Medium, SemiBold, Bold)
- Sizes: 12px to 48px scale
- Line Heights: 1.2x to 1.5x multipliers
- 10 predefined text styles (h1-h5, body1-2, caption, button, overline)

### 4.3 Spacing System

- Base unit: 4px
- Scale: 4, 8, 16, 20, 24, 32, 40, 48, 64, 80
- Component heights: Button 48px, Input 56px
- Screen padding: 16px horizontal, 20px vertical

---

## 5. Main Screens & User Flows

### 5.1 Splash Screen
- Animated logo with physics-based spring animation
- Background gradient transition
- Database initialization progress
- Duration: 2-3 seconds

### 5.2 Onboarding Flow (5 Screens)
1. **Welcome**: Brand introduction with Lottie animation
2. **Goals**: Select weight goal (lose/maintain/gain)
3. **Profile**: Enter age, gender, height, weight
4. **Activity**: Choose activity level
5. **Nutrition**: Set macro preferences and daily calorie goal

### 5.3 Diary Screen (Main Hub)
**Components:**
- Date selector with swipe gestures
- Calorie ring (Skia-based circular progress)
- Macro breakdown bars (carbs, proteins, fats)
- Meal cards (Breakfast, Lunch, Dinner, Snacks)
- Quick add button (floating action button)
- Water intake tracker
- Daily summary footer

**Interactions:**
- Swipe left/right to change dates
- Long press on food item to edit/delete
- Drag to reorder items
- Pull to refresh

### 5.4 Search Screen
**Features:**
- Search bar with autocomplete
- Recent foods list
- Favorite foods section
- Barcode scanner button
- Food categories
- Custom food creation

**Search Algorithm:**
- Fuzzy matching on food names
- Brand matching
- Popularity scoring
- Recently used prioritization

### 5.5 Analytics Screen
**Charts & Metrics:**
- Calorie trend chart (7/30/90 days)
- Macro distribution pie chart
- Weight progress line chart
- Streak calendar
- Goal achievement badges
- Export data button (Premium)

### 5.6 Profile Screen
**Sections:**
- User info card
- Goals & targets
- Measurements tracker
- Settings
- Subscription status (Premium)
- Help & support

---

## 6. Animations & Gestures

### 6.1 Core Animations

**Splash Screen:**
```typescript
// Logo scale + fade in
useEffect(() => {
  logoScale.value = withSpring(1, {
    damping: 15,
    stiffness: 100
  });
  logoOpacity.value = withTiming(1, { duration: 800 });
}, []);
```

**Calorie Ring:**
```typescript
// Animated circular progress with Skia
const path = Skia.Path.Make();
const progress = useSharedValue(0);

progress.value = withSpring(consumed / target, {
  damping: 20,
  stiffness: 100
});
```

**Meal Card Entry:**
```typescript
// Slide in with stagger
const translateY = useSharedValue(50);
const opacity = useSharedValue(0);

useEffect(() => {
  translateY.value = withDelay(
    index * 100,
    withSpring(0)
  );
  opacity.value = withDelay(
    index * 100,
    withTiming(1)
  );
}, []);
```

### 6.2 Gesture System

**Swipe to Delete:**
```typescript
const gesture = Gesture.Pan()
  .onUpdate((e) => {
    translateX.value = e.translationX;
  })
  .onEnd((e) => {
    if (e.translationX < -100) {
      // Delete item
      runOnJS(handleDelete)();
    } else {
      translateX.value = withSpring(0);
    }
  });
```

**Pull to Refresh:**
```typescript
const scrollHandler = useAnimatedScrollHandler({
  onScroll: (event) => {
    if (event.contentOffset.y < -80) {
      runOnJS(handleRefresh)();
    }
  }
});
```

---

## 7. Offline-First Architecture

### 7.1 Data Synchronization Strategy

1. **Local-First Approach:**
   - All data stored in SQLite
   - Immediate UI updates from local database
   - Background sync when online (future enhancement)

2. **Food Database:**
   - 2M+ items bundled with app
   - Delta updates for new foods
   - User-created foods stored locally

3. **Conflict Resolution:**
   - Last-write-wins for user data
   - Merge strategy for favorites
   - Timestamp-based conflict detection

### 7.2 Cache Strategy

```typescript
// AsyncStorage for app state
const cacheKeys = {
  USER_PREFERENCES: '@user_preferences',
  THEME_MODE: '@theme_mode',
  LAST_SYNC: '@last_sync',
  RECENT_SEARCHES: '@recent_searches'
};

// SQLite for structured data
// - User profile
// - Food database
// - Diary entries
// - Measurements history
```

---

## 8. Performance Optimization

### 8.1 List Rendering

```typescript
// Use FlashList for large lists
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={foods}
  renderItem={renderFoodItem}
  estimatedItemSize={72}
  keyExtractor={(item) => item.id}
/>
```

### 8.2 Image Optimization

- Use FastImage for remote images
- Implement progressive loading
- Cache images locally
- Lazy load off-screen images

### 8.3 Database Queries

- Indexed columns for fast searches
- Prepared statements for repeated queries
- Batch inserts for bulk operations
- Virtual tables for full-text search

---

## 9. Security & Privacy

### 9.1 Data Protection

- SQLite database encryption (SQLCipher)
- Biometric authentication option
- No personal data sent to external servers
- Local-only storage by default

### 9.2 Premium Verification

```typescript
// In-app purchase validation
const verifyReceipt = async (receipt: string) => {
  // Validate with Apple/Google servers
  const isValid = await validateWithStore(receipt);

  if (isValid) {
    await userRepository.updatePremiumStatus(
      userId,
      true,
      expirationDate
    );
  }
};
```

---

## 10. Testing Strategy

### 10.1 Unit Tests

```typescript
describe('Nutrition Calculations', () => {
  test('calculates BMR correctly for male', () => {
    const bmr = calculateBMR(80, 180, 30, 'male');
    expect(bmr).toBeCloseTo(1850, 0);
  });

  test('calculates macro distribution', () => {
    const macros = calculateMacroGoals(2000, 40, 30, 30);
    expect(macros.carbs).toBe(200);
    expect(macros.proteins).toBe(150);
    expect(macros.fats).toBe(67);
  });
});
```

### 10.2 Integration Tests

- Database operations
- Repository layer
- Use case logic
- State management

### 10.3 E2E Tests (Detox)

```typescript
describe('Diary Flow', () => {
  it('should add food to diary', async () => {
    await element(by.id('add-food-button')).tap();
    await element(by.id('search-input')).typeText('Banana');
    await element(by.text('Banana, raw')).tap();
    await element(by.id('servings-input')).typeText('1');
    await element(by.id('add-button')).tap();

    await expect(element(by.text('Banana, raw'))).toBeVisible();
  });
});
```

---

## 11. Accessibility

### 11.1 Screen Reader Support

```typescript
<TouchableOpacity
  accessible={true}
  accessibilityLabel="Add food to breakfast"
  accessibilityHint="Opens food search screen"
  accessibilityRole="button"
>
  <Text>Add Food</Text>
</TouchableOpacity>
```

### 11.2 Dynamic Type Support

- Respect system font size settings
- Scalable UI components
- Minimum touch target: 44x44 points

### 11.3 Color Contrast

- WCAG AA compliance
- Minimum 4.5:1 contrast ratio for normal text
- 3:1 for large text and UI components

---

## 12. Internationalization

### 12.1 Supported Languages (Future)

- English (default)
- Spanish
- French
- German
- Portuguese

### 12.2 Localization Strategy

```typescript
import i18n from 'i18next';

i18n.t('diary.breakfast'); // "Breakfast"
i18n.t('diary.addFood'); // "Add Food"
i18n.t('analytics.caloriesConsumed'); // "Calories Consumed"
```

---

## 13. Premium Features Implementation

### 13.1 Feature Gating

```typescript
const isPremiumFeature = (feature: string) => {
  const premiumFeatures = [
    'advanced_analytics',
    'recipe_creator',
    'meal_planning',
    'export_data',
    'custom_fasting'
  ];

  return premiumFeatures.includes(feature);
};

const checkAccess = async (feature: string) => {
  if (isPremiumFeature(feature)) {
    const user = await userRepository.getById(userId);
    return user?.isPremiumActive();
  }
  return true;
};
```

### 13.2 Subscription Tiers

**Monthly:** $4.99/month
**Yearly:** $39.99/year (33% savings)
**Lifetime:** $99.99 (one-time)

---

## 14. Error Handling

### 14.1 Global Error Boundary

```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error tracking service
    logError(error, errorInfo);

    // Show user-friendly error screen
    this.setState({ hasError: true });
  }
}
```

### 14.2 Network Error Handling

```typescript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new NetworkError('Request failed');
  }
} catch (error) {
  if (error instanceof NetworkError) {
    showToast('Network error. Using offline data.');
  }
}
```

---

## 15. Analytics & Monitoring

### 15.1 App Analytics

- Screen views
- User flows
- Feature usage
- Crash reports
- Performance metrics

### 15.2 Key Metrics

- Daily Active Users (DAU)
- Retention rate (D1, D7, D30)
- Premium conversion rate
- Average session duration
- Diary entry completion rate

---

## 16. Future Enhancements

### 16.1 Roadmap

**v1.1 (Q2 2025):**
- Apple Watch companion app
- Widgets for iOS home screen
- Siri shortcuts integration

**v1.2 (Q3 2025):**
- Social features (share progress)
- Community recipes
- Challenges and achievements

**v1.3 (Q4 2025):**
- AI meal suggestions
- Photo food recognition
- Voice input for logging

### 16.2 Cloud Sync (Future)

```typescript
// Sync architecture
const syncToCloud = async () => {
  const localChanges = await getLocalChanges();
  const cloudChanges = await fetchCloudChanges();

  const merged = mergeChanges(localChanges, cloudChanges);

  await updateLocal(merged);
  await updateCloud(merged);
};
```

---

## 17. Development Workflow

### 17.1 Git Strategy

- Main branch: production-ready code
- Develop branch: integration branch
- Feature branches: feature/feature-name
- Hotfix branches: hotfix/issue-description

### 17.2 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run lint
      - run: npm run type-check
      - run: npm test

  build:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: cd ios && pod install
      - run: npm run build:ios
```

---

## 18. Deployment

### 18.1 iOS App Store

**Requirements:**
- App Store Connect account
- Developer certificate and provisioning profiles
- App icons (1024x1024)
- Screenshots for all device sizes
- Privacy policy URL
- App description and metadata

**Build Process:**
```bash
# iOS Release Build
cd ios
fastlane release
```

### 18.2 Version Management

- Semantic versioning (MAJOR.MINOR.PATCH)
- Build number auto-increment
- Release notes for each version

---

## 19. Maintenance & Support

### 19.1 Update Strategy

- Security patches: Within 24 hours
- Bug fixes: Weekly releases
- Features: Monthly releases
- Major versions: Quarterly

### 19.2 User Support

- In-app help documentation
- FAQ section
- Email support: support@nutriflow.app
- Premium users: Priority support (24h response)

---

## 20. Appendix

### 20.1 Third-Party Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| React Native | 0.76+ | Framework |
| TypeScript | 5.3+ | Type safety |
| Reanimated | 3.6+ | Animations |
| Skia | 1.0+ | Graphics |
| Zustand | 4.5+ | State management |
| SQLite | 6.0+ | Database |
| React Navigation | 6.x | Navigation |

### 20.2 API Endpoints (Future)

```
POST /api/v1/sync
GET  /api/v1/foods/search
POST /api/v1/user/profile
GET  /api/v1/recipes
POST /api/v1/subscription/verify
```

### 20.3 Database Schema Diagram

```
┌─────────────┐
│    users    │
└──────┬──────┘
       │
       │ 1:N
       ├──────────┬──────────────┬─────────────┐
       │          │              │             │
┌──────▼──────┐  │              │             │
│diary_entries│  │              │             │
└─────────────┘  │              │             │
                 │              │             │
          ┌──────▼──────┐ ┌────▼─────┐ ┌─────▼────────┐
          │  activities │ │ fasting  │ │ measurements │
          │             │ │ sessions │ │   history    │
          └─────────────┘ └──────────┘ └──────────────┘

┌─────────────┐
│    foods    │
└──────┬──────┘
       │
       │ N:M
       ▼
┌──────────────┐
│favorite_foods│
└──────────────┘
```

### 20.4 Nutrition Calculation Formulas

**BMR (Basal Metabolic Rate) - Mifflin-St Jeor:**
```
Men: BMR = 10W + 6.25H - 5A + 5
Women: BMR = 10W + 6.25H - 5A - 161

Where:
W = weight in kg
H = height in cm
A = age in years
```

**TDEE (Total Daily Energy Expenditure):**
```
TDEE = BMR × Activity Multiplier

Activity Multipliers:
- Sedentary: 1.2
- Light: 1.375
- Moderate: 1.55
- Active: 1.725
- Very Active: 1.9
```

**Macro Distribution:**
```
Carbs: Daily Calories × Carb% / 4
Proteins: Daily Calories × Protein% / 4
Fats: Daily Calories × Fat% / 9
```

---

## Conclusion

NutriFlow represents a comprehensive, modern approach to nutrition tracking that prioritizes user experience, performance, and offline capability. The application leverages cutting-edge React Native technologies including Reanimated 3 for fluid animations, Skia for high-performance graphics, and SQLite for robust offline-first data management.

The architecture follows Clean Architecture principles with a clear separation of concerns across the presentation, domain, and data layers. This ensures maintainability, testability, and scalability as the application evolves.

Key differentiators include:
- **Gesture-driven UX**: Intuitive swipe, drag, and long-press interactions
- **Offline-first**: Full functionality without internet connection
- **Physics-based animations**: Delightful, natural-feeling interactions
- **Comprehensive tracking**: Calories, macros, micronutrients, water, weight, activities
- **Premium features**: Advanced analytics, recipes, meal planning, fasting tools
- **Type-safe development**: 100% TypeScript for reliability and developer experience

The application is designed for extensibility, with clear paths for adding features like cloud sync, AI recommendations, social features, and wearable integrations in future iterations.

---

**Document Version:** 1.0
**Last Updated:** 2025-01-24
**Author:** Development Team
**Status:** Complete - Ready for Implementation
