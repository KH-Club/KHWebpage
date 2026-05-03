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
| [Supabase](https://supabase.com) | Database & API |

## 📁 Project Structure

```
src/
├── assets/              # Static assets and data
│   └── data/            # Camp data (JSON/TS)
├── components/          # Shared components
│   ├── Footer/
│   ├── Header/
│   └── ui/              # Reusable UI components
│       ├── AnimatedCounter/
│       ├── Button/
│       ├── InfoCard/
│       ├── LazyImage/
│       ├── ScrollIndicator/
│       └── SocialLinks/
├── config/              # App configuration
├── hooks/               # Custom React hooks
│   ├── useCamps/        # Camp data fetching from Supabase
│   └── useSearch/       # Search with debouncing
├── services/            # API services
│   └── campService.ts   # Supabase camp data fetching
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
  - `__tests__/` - Test files (`.spec.tsx`)
- Barrel exports (`index.ts`) are used at folder group level (e.g., `hooks/index.ts`, `ui/index.ts`)

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

## ✅ CI

This project uses GitHub Actions for continuous integration. Feature branches are merged into `dev`, then `dev` is promoted into `main` when the code is ready for production. The workflow runs checks on pushes and pull requests to `dev` and `main`.

### Pipeline Stages

1. **Code Quality** (runs first)
   - ESLint linting
   - TypeScript type checking

2. **Build** (after code quality passes)
   - Production build
   - Artifact upload

3. **Test** (after code quality passes)
   - Unit tests
   - Coverage report

The workflow does not deploy to Vercel or require a Vercel token. Deploy manually only when the project owner explicitly decides to spend deployment/build usage.

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

### Supabase (Database)

Camp data is fetched from Supabase. Configure in `.env.local`:

```bash
# Copy the example file
cp .env.local.example .env.local

# Add your Supabase credentials (same as kaihor-backoffice)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Camp Data Structure

Each camp entry in the database includes:
- `campID` - Unique identifier
- `name` - Camp name
- `location` - Camp location
- `province` - Province
- `director` - Camp director
- `date` - Camp date
- `imgSrc` - Array of image URLs

### Alumni/Student Voice Data

The homepage Camp Voices section reads from the Supabase
`alumni_student_voices` table through `src/services/alumniStudentVoiceService.ts`.
Only rows where `is_published = true` are eligible, and the homepage renders the
first 3 records by `display_order` then `created_at`. Content is managed in
`kaihor-backoffice` at `/alumni-student-voices`; the required SQL contract is in
that repo at `docs/alumni-student-voices.md`.

## 📱 Features

- **Responsive Design** - Works on mobile, tablet, and desktop
- **Lazy Loading** - Images load on demand with loading UI
- **Code Splitting** - Routes are lazy-loaded for faster initial load
- **Search** - Debounced search for camps by name or location
- **Animated Counters** - Dynamic statistics with animation
- **Accessible** - Built with Radix UI for accessibility

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

**Quick Overview:**
1. Create a feature branch from `dev`
2. Make your changes and verify locally (`yarn format && yarn lint && yarn test:run`)
3. Open a Pull Request
4. **Make CI pass** before requesting review
5. Wait for approval from reviewer
6. Let the owner merge the PR

## 📄 License

This project is private and maintained by Kaihor Club, Chulalongkorn University.

---

**ค่ายอาสา | Volunteer Camp | Since 1998** 🏕️
