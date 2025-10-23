# NutriFlow

A gesture-driven, offline-first calorie and nutrition tracking application built with React Native.

## Overview

NutriFlow is a comprehensive nutrition tracking app that combines powerful functionality with delightful animations and intuitive UX. The app empowers users to track their daily nutrition, monitor weight progress, log activities, and achieve their health goals through an elegant, physics-based interface.

## Technology Stack

- **Framework:** React Native 0.76+
- **Language:** TypeScript 5.3+
- **State Management:** Zustand 4.5+
- **Database:** SQLite (react-native-sqlite-storage)
- **Animations:** React Native Reanimated 3.6+, React Native Skia 1.0+
- **Navigation:** React Navigation 6.x
- **UI Components:** React Native Paper, Custom components
- **Charts:** Victory Native

## Project Status

### ✅ Phase 1: Project Setup & Foundation (COMPLETE)
- ✓ React Native project initialization
- ✓ TypeScript configuration
- ✓ Project structure setup
- ✓ Development tools (ESLint, Prettier, Jest)

### ✅ Phase 2: Core Infrastructure (COMPLETE)
- ✓ Constants (colors, typography, spacing, animations, nutrition)
- ✓ Theme system (light/dark themes with auto mode)
- ✓ Utility functions (calculations, validation, formatting, haptics)
- ✓ Comprehensive TypeScript type definitions

### ✅ Phase 3: Data Layer (COMPLETE)
- ✓ SQLite database setup and schema
- ✓ Database migration system
- ✓ Data models (User, Food, DiaryEntry)
- ✓ Repositories (User, Food, Diary)
- ✓ Database service with transaction support

### 🚧 Phase 4: Domain Layer (IN PROGRESS)
- ⏳ Domain entities and interfaces
- ⏳ Use cases (diary, nutrition, analytics, fasting)
- ⏳ Business logic layer

### ⏳ Phase 5: State Management (PENDING)
- Zustand stores (diary, user, nutrition, UI)
- Custom React hooks for business logic
- State persistence

### ⏳ Phase 6-15: Remaining Phases (PENDING)
- UI Components
- Navigation structure
- Screens (Splash, Onboarding, Diary, Search, Analytics, etc.)
- Animations and gestures
- Platform integrations (HealthKit, Camera, Sensors)
- Premium features
- Testing and optimization

## Project Structure

```
nutriflow/
├── src/
│   ├── core/
│   │   ├── constants/       # App-wide constants
│   │   ├── theme/           # Theme system
│   │   └── utils/           # Utility functions
│   ├── data/
│   │   ├── database/        # SQLite database setup
│   │   │   ├── migrations/  # Database migrations
│   │   │   └── seeds/       # Seed data
│   │   ├── models/          # Data models
│   │   └── repositories/    # Data access layer
│   ├── domain/
│   │   ├── entities/        # Business entities
│   │   ├── usecases/        # Business logic
│   │   └── interfaces/      # Domain interfaces
│   ├── presentation/
│   │   ├── navigation/      # Navigation structure
│   │   ├── screens/         # App screens
│   │   ├── components/      # UI components
│   │   ├── animations/      # Animation definitions
│   │   └── stores/          # State management
│   ├── types/               # TypeScript type definitions
│   ├── assets/              # Static assets
│   └── App.tsx              # Root component
├── ios/                     # iOS native code
├── android/                 # Android native code
├── package.json
├── tsconfig.json
└── README.md
```

## Core Features

### Free Tier
- Daily food diary with meal tracking
- Comprehensive food database (2M+ items)
- Barcode scanner
- Calorie and macronutrient tracking
- Basic weight tracking
- Water intake logging
- Daily step counter
- Basic activity logging
- Progress visualization
- Goal setting
- Favorite foods
- Basic intermittent fasting timer

### Premium Tier (PRO)
- Advanced meal planning
- 500+ curated recipes
- Extended fasting plans
- Detailed micronutrient tracking
- Advanced analytics
- Extended body measurements
- Data export (CSV/PDF)
- Multiple nutrition goals
- Advanced recipe creator
- Meal templates
- Priority support
- Ad-free experience

## Database Schema

The app uses SQLite with the following main tables:

- **users**: User profiles and settings
- **foods**: Food database (2M+ items)
- **diary_entries**: Daily food log entries
- **daily_summaries**: Daily nutrition summaries
- **activities**: Exercise and activity log
- **fasting_sessions**: Intermittent fasting tracking
- **recipes**: Recipe database
- **favorite_foods**: User's favorite foods
- **measurements_history**: Weight and body measurements

## Setup Instructions

### Prerequisites
- Node.js >= 18
- npm >= 9
- React Native development environment set up
- iOS: Xcode 14+, CocoaPods
- Android: Android Studio, JDK 11+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NutriFlow
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies:
```bash
cd ios && pod install && cd ..
```

4. Run the app:

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

### Development Commands

```bash
npm start              # Start Metro bundler
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator
npm test               # Run tests
npm run lint           # Lint code
npm run format         # Format code with Prettier
npm run type-check     # TypeScript type checking
```

## Architecture

The app follows Clean Architecture principles with MVVM pattern:

```
┌─────────────────────────────────────┐
│      Presentation Layer             │
│  (Screens, Components, Animations)  │
└──────────────┬──────────────────────┘
               │
┌──────────────┴──────────────────────┐
│       ViewModel Layer                │
│  (Zustand Stores, Business Logic)   │
└──────────────┬──────────────────────┘
               │
┌──────────────┴──────────────────────┐
│        Domain Layer                  │
│  (Entities, Use Cases, Repositories) │
└──────────────┬──────────────────────┘
               │
┌──────────────┴──────────────────────┐
│         Data Layer                   │
│  (SQLite, AsyncStorage, HealthKit)  │
└─────────────────────────────────────┘
```

## Key Features Implementation Status

- [x] Offline-first architecture
- [x] SQLite database with migrations
- [x] Theme system (light/dark/auto)
- [x] Type-safe development with TypeScript
- [x] Nutrition calculations utilities
- [x] Data models and repositories
- [ ] Zustand state management
- [ ] React Navigation setup
- [ ] UI component library
- [ ] Reanimated 3 animations
- [ ] Skia-based graphics
- [ ] Gesture-based interactions
- [ ] HealthKit integration
- [ ] Barcode scanning
- [ ] In-app purchases
- [ ] Unit and E2E tests

## Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run E2E tests (Detox)
npm run e2e:ios
npm run e2e:android
```

## Contributing

This is a private project. For any questions or issues, please contact the development team.

## License

Proprietary - All rights reserved

## Development Roadmap

### Next Steps (Phase 4-7)
1. Implement domain layer use cases
2. Setup Zustand stores
3. Create navigation structure
4. Build UI component library
5. Implement main screens (Diary, Search, Analytics)
6. Add animations and gestures

### Future Phases (Phase 8-15)
1. Splash screen and onboarding
2. Advanced features (Recipes, Fasting)
3. Platform integrations
4. Premium features
5. Testing and optimization
6. App Store preparation

## Version History

- **v1.0.0** - Foundation Complete
  - Core infrastructure
  - Database layer
  - Data models and repositories
  - Theme system
  - Type definitions

---

**Built with ❤️ for health-conscious individuals**
