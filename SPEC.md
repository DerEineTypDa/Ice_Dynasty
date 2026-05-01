# Ice Dynasty - Hockey Manager Simulator

## Project Overview
- **Project Name**: Ice Dynasty
- **Type**: Browser-based hockey management simulation game
- **Core Functionality**: Complete hockey club management with realistic simulation, team building, and season progression
- **Target Users**: Hockey fans who enjoy management/simulation games

## UI/UX Specification

### Layout Structure
- **Main Container**: Full viewport, centered content (max-width: 1400px)
- **Header**: Fixed top bar with logo, navigation tabs, and user info
- **Sidebar**: Left-side navigation for main sections (280px width)
- **Content Area**: Main dynamic content area
- **Footer**: Status bar with game date, finances, and notifications

### Responsive Breakpoints
- Desktop: 1200px+ (full layout)
- Tablet: 768px-1199px (collapsed sidebar)
- Mobile: <768px (bottom navigation)

### Visual Design

#### Color Palette
- **Primary Dark**: #0a0e17 (main background)
- **Secondary Dark**: #141b2d (cards/panels)
- **Tertiary Dark**: #1e2940 (hover states)
- **Ice Blue**: #00d4ff (primary accent)
- **Ice Blue Dim**: #0099cc (secondary accent)
- **Frost White**: #e8f4fc (text primary)
- **Silver**: #8b9eb3 (text secondary)
- **Success Green**: #00ff88 (positive)
- **Warning Orange**: #ff9500 (warnings)
- **Danger Red**: #ff4757 (negative/errors)
- **Gold**: #ffd700 (highlights/premium)

#### Typography
- **Primary Font**: 'Rajdhani', sans-serif (headings, UI)
- **Secondary Font**: 'Chakra Petch', sans-serif (body text)
- **Monospace**: 'Share Tech Mono', monospace (stats/numbers)
- **Heading Sizes**: H1: 2.5rem, H2: 1.8rem, H3: 1.4rem, H4: 1.1rem
- **Body Size**: 0.95rem
- **Small Text**: 0.8rem

#### Spacing System
- Base unit: 8px
- Margins: 8px, 16px, 24px, 32px, 48px
- Padding: 8px, 12px, 16px, 24px
- Border radius: 4px (small), 8px (medium), 12px (large)

#### Visual Effects
- Box shadows: 0 4px 20px rgba(0, 212, 255, 0.1)
- Glow effects: 0 0 20px rgba(0, 212, 255, 0.3)
- Ice texture overlays on headers
- Subtle particle effects on important moments
- Smooth transitions: 0.3s ease-out

### Components

#### Navigation Tabs
- States: default, hover (#1e2940), active (ice blue border-bottom)
- Icons with labels
- Animated underline on active

#### Player Cards
- Photo placeholder (gradient)
- Name, position, rating
- Key stats (OVR, AGE, SALARY)
- Skill bars (6 attributes)
- Contract info
- Hover: scale(1.02), glow effect

#### Team Roster Table
- Sortable columns
- Position indicators (C, LW, RW, D, G)
- Color-coded overall ratings
- Click to view details

#### Match Screen
- Period indicator (1st, 2nd, 3rd, OT)
- Score display (large, centered)
- Shot counter
- Time remaining
- Live commentary feed
- Team stats comparison

#### Buttons
- Primary: Ice blue background, dark text
- Secondary: Transparent, ice blue border
- Danger: Red background
- Disabled: 50% opacity
- Hover: brightness(1.2), scale(1.02)

#### Input Fields
- Dark background (#141b2d)
- Ice blue border on focus
- Placeholder text in silver
- Validation states (green/red borders)

#### Modals
- Centered overlay
- Dark semi-transparent backdrop
- Slide-in animation
- Close button top-right

## Functionality Specification

### 1. Team Management
- Create custom team (name, colors, logo selection)
- 30-player roster limit
- Player attributes: OVR, POS, AGE, SAL, CONTRACT, MORALE, CONDITION
- 6 skill attributes: SPE, SHO, PAS, DEF, PHY, IQ
- Salary cap: $85M (adjustable)
- Contract length: 1-8 years
- Player morale: 0-100 (affects performance)
- Player condition: 0-100 (affects injury risk)
- Fatigue system: players need rest

### 2. Lines & Tactics
- 4 forward lines (3 players each)
- 3 defensive pairings (2 players each)
- Powerplay lines (1st, 2nd)
- Penalty kill lines (1st, 2nd)
- Goaltender rotation
- Tactics:
  - System: Aggressive (4), Balanced (3), Defensive (2)
  - Forecheck: High (4), Medium (3), Low (2)
  - Passing: Quick (4), Medium (3), Patient (2)
  - Shot Frequency: High (4), Medium (3), Low (2)
  - Physicality: Hard (4), Medium (3), Soft (2)
- Player fit rating based on tactics

### 3. Match Engine
- 3 periods × 20 minutes (simulated time)
- Overtime: 5 min sudden death
- Shootout: 3 rounds, then infinite
- Stats tracked: Goals, Assists, Shots, Saves, PIM, +/-
- Momentum system (affects probability)
- Commentary events: goals, penalties, saves, hits
- Play-by-play log

### 4. Transfer Market
- 50+ AI teams with realistic behavior
- Transfer budget: $50M starting
- Player values based on age, rating, contract
- Bidding system with acceptance logic
- Trade system (player+pick for player)
- Free agents (unrestricted)
- Scouting: reveals hidden potential (60-99)

### 5. Player Development
- Weekly training sessions
- Individual focus (choose attribute to train)
- Development rate: 0-5 points per week
- Young players (18-23) develop faster
- Veterans (30+) may decline
- Training facilities affect rates

### 6. Academy / Youth System
- 15 prospect slots
- Generate 3-5 new prospects per season
- Prospects: 16-18 years old
- Random potential (50-99)
- Academy level affects quality
- Promote to senior team
- Loan to other teams

### 7. Stadium & Club Upgrades
- Arena levels: 1-10 (capacity, income)
- Training facility: improves development
- Medical center: reduces injury time
- Academy: better prospects
- Analytics: transfer insights
- Sponsors: various tiers

### 8. League System
- 30-team league
- 82-game season
- Top 16 make playoffs
- Best-of-7 playoff series
- Conference finals, Stanley Cup final
- Awards: MVP, Best Goalie, Best Rookie, etc.

### 9. Immersion Features
- News feed with team events
- Press conferences (post-game)
- Player personalities
- Fan happiness (0-100)
- Board expectations
- Social media reactions

### 10. AI Behavior
- AI teams set tactics
- AI makes transfers
- AI develops players
- Difficulty levels: Rookie, Pro, Veteran, Legend

### 11. Save System
- LocalStorage save/load
- Auto-save every game week
- Multiple save slots (3)
- Export/import save data

## Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme with ice blue accents throughout
- [ ] All text readable (contrast ratio 4.5:1+)
- [ ] Smooth animations on all interactions
- [ ] Responsive layout works on all sizes
- [ ] Player cards display all info clearly
- [ ] Match screen is exciting and readable

### Functional Checkpoints
- [ ] Can create and manage team
- [ ] Can edit all lines and tactics
- [ ] Can simulate full game with commentary
- [ ] Can buy/sell players in market
- [ ] Can train and develop players
- [ ] Can generate and manage youth prospects
- [ ] Can upgrade facilities
- [ ] Can play through full season
- [ ] Playoffs and championship work
- [ ] Save/load functions correctly
- [ ] Game is addictive and fun

### Performance
- [ ] Page loads in <3 seconds
- [ ] No lag during game simulation
- [ ] Smooth 60fps animations
- [ ] Memory efficient (no leaks)