# KH Webpage - ชมรมค่ายอาสาสมัครนิสิตหอพักจุฬาฯ

A responsive static website for **Kaihor Club** (ชมรมค่ายอาสาสมัครนิสิตหอพักจุฬาลงกรณ์มหาวิทยาลัย) - a volunteer camp club at Chulalongkorn University that has been organizing community development camps since 1998.

## 🏕️ About

Kaihor Club is dedicated to:
- Organizing volunteer development camps for schools and communities
- Fostering a spirit of volunteerism among university students
- Building relationships and developing new skills through hands-on activities

This website showcases our camps, activities, and provides information for prospective volunteers.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [React 18](https://react.dev) | UI library |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [React Router](https://reactrouter.com) | Client-side routing |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first CSS |
| [Radix UI](https://www.radix-ui.com) | Accessible UI primitives |
| [shadcn/ui](https://ui.shadcn.com) | Pre-built components |
| [Vitest](https://vitest.dev) | Unit testing |
| [React Testing Library](https://testing-library.com/react) | Component testing |

## 📁 Project Structure

```
src/
├── assets/              # Static assets and data
│   └── data/            # Camp data (JSON/TS)
├── components/          # Shared components
│   ├── Footer/
│   ├── Header/
│   └── ui/              # Reusable UI components
│       ├── Button/
│       ├── InfoCard/
│       ├── LazyImage/
│       ├── SocialLinks/
│       └── StatCard/
├── config/              # App configuration
├── hooks/               # Custom React hooks
│   ├── useCamps/        # Camp data fetching & caching
│   ├── useImageCarousel/# Image carousel logic
│   └── useSearch/       # Search with debouncing
├── layouts/             # Layout components
├── lib/                 # Utility functions
├── pages/               # Page components (route-based)
│   ├── Homepage/
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── About/
│   │       ├── Core/
│   │       └── LandingView/
│   ├── Camppage/
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── CampCard/
│   │       ├── CampSearch/
│   │       └── ListView/
│   ├── CampDetailpage/
│   ├── Activitypage/
│   └── Contactpage/
├── test/                # Test utilities & setup
└── types/               # TypeScript type definitions
```

### Folder Conventions

- Each component/hook has its own folder with:
  - `ComponentName.tsx` - Main component file
  - `index.ts` - Barrel export
  - `__tests__/` - Test files (`.spec.tsx`)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd KHWebpage

# Install dependencies
yarn install
```

### Development

```bash
# Start development server
yarn dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
# Type check and build
yarn build

# Preview production build
yarn preview
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn lint` | Run ESLint |
| `yarn lint:fix` | Fix ESLint issues |
| `yarn format` | Format code with Prettier |
| `yarn format:check` | Check code formatting |
| `yarn typecheck` | Run TypeScript type checking |
| `yarn test` | Run tests in watch mode |
| `yarn test:run` | Run tests once |
| `yarn test:coverage` | Run tests with coverage report |

## ✅ CI/CD

This project uses GitHub Actions for continuous integration. On every push and PR to `main`, `master`, or `develop`:

### Pipeline Stages

1. **Code Quality** (runs first)
   - Prettier formatting check
   - ESLint linting
   - TypeScript type checking

2. **Build** (after code quality passes)
   - Production build
   - Artifact upload

3. **Test** (after code quality passes)
   - Unit tests
   - Coverage report

## 🧪 Testing

Tests are written using Vitest and React Testing Library.

```bash
# Run all tests
yarn test:run

# Run tests in watch mode
yarn test

# Generate coverage report
yarn test:coverage
```

### Test Structure

- Hook tests: `src/hooks/<hookName>/__tests__/<hookName>.spec.ts`
- Component tests: `src/components/**/__tests__/<ComponentName>.spec.tsx`
- Page component tests: `src/pages/**/__tests__/*.spec.tsx`

## 🎨 Code Style

This project uses:
- **Prettier** for code formatting (tabs, no semicolons)
- **ESLint** for linting with TypeScript and React rules
- **Tailwind CSS** class sorting via Prettier plugin

Run `yarn format` before committing to ensure consistent formatting.

## 🔧 Configuration

### Site Configuration

Edit `src/config/site.ts` to update site-wide settings:

```typescript
export const siteConfig = {
  name: "KH",
  description: "ชมรมค่ายอาสาสมัครนิสิตหอพักจุฬาลงกรณ์มหาวิทยาลัย",
  foundingYear: 1998,
  // ... social links, navigation, etc.
}
```

### Camp Data

Camp data is stored in `src/assets/data/KHdata.ts`. Each camp entry includes:
- `campID` - Unique identifier
- `name` - Camp name
- `location` - Camp location
- `province` - Province
- `director` - Camp director
- `date` - Camp date
- `imgSrc` - Array of image URLs

## 📱 Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Lazy Loading** - Images load on demand for better performance
- **Code Splitting** - Routes are lazy-loaded for faster initial load
- **Search** - Debounced search for camps by name or location
- **Image Carousel** - Auto-playing image carousel on homepage
- **Accessible** - Built with Radix UI for accessibility

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Ensure all tests pass: `yarn test:run`
4. Ensure code is formatted: `yarn format:check`
5. Ensure no lint errors: `yarn lint`
6. Create a pull request

## 📄 License

This project is private and maintained by Kaihor Club, Chulalongkorn University.

---

**ค่ายอาสา | Volunteer Camp | Since 1998** 🏕️
