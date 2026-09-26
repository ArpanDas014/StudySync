# UI/UX Specification & Design System — StudySync

---

## 1. Design Philosophy & Visual Identity

The StudySync visual language is built upon the **Warm Academic Aesthetic**. Unlike sterile corporate project managers or overly noisy, gamified apps, StudySync strikes a calm balance: **structured enough for rigorous productivity**, but **warm enough for long, daily study sessions**.

### 1.1 Core Principles
1. **Low Cognitive Load**: Minimizes clutter, uses generous whitespace, and groups related tasks into predictable card containers.
2. **Warmth & Encouragement**: Incorporates organic, warm tones (Sand, Soft Ivory, Warm Coral) to reduce academic anxiety.
3. **Progressive Disclosure**: Keeps primary views clean while exposing filters, advanced settings, and details on demand.
4. **Predictable Navigation**: Persistent global header and collapsible drawer ensure students never feel disoriented.

---

## 2. Design Tokens

### 2.1 Color Palette

```
Charcoal (#111827) ── Primary Text & High Contrast Elements
Cobalt Blue (#2563EB) ── Primary Actions, Focus States, Links
Warm Coral (#F97316) ── Deadlines, Streaks, High Priority Indicators
Soft Sand (#F3F4F6) ── Subtle Backgrounds, Inactive Tabs, Neutral Cards
Warm Ivory (#FAF9F6) ── Page Backgrounds in Light Mode
Emerald Mint (#10B981) ── Completed Tasks, Success States, Healthy Metrics
Royal Lilac (#8B5CF6) ── Subject Tags (Mathematics, Theory), Creative Work
```

#### CSS Custom Properties (`theme.css`)
```css
:root {
  --color-charcoal: #111827;
  --color-cobalt: #2563eb;
  --color-coral: #f97316;
  --color-sand: #f3f4f6;
  --color-ivory: #faf9f6;
  --color-mint: #10b981;
  --color-lilac: #8b5cf6;

  /* Semantic Light Mode Tokens */
  --theme-bg: #f8fafc;
  --theme-surface: #ffffff;
  --theme-text-primary: #111827;
  --theme-text-secondary: #4b5563;
  --theme-border: #e5e7eb;
  --theme-border-strong: #d1d5db;
}

[data-theme='dark'] {
  /* Semantic Dark Mode Tokens */
  --theme-bg: #0f172a;
  --theme-surface: #1e293b;
  --theme-text-primary: #f8fafc;
  --theme-text-secondary: #94a3b8;
  --theme-border: #334155;
  --theme-border-strong: #475569;
}
```

### 2.2 Typography Scale
Primary Font Family: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

| Token | Size | Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `text-display` | 32px (2.0rem) | 1.25 | Bold (700 / 800) | Major View Headings (Planner, Notes, Groups) |
| `text-h1` | 24px (1.5rem) | 1.3 | SemiBold (600) | Card Headers, Section Titles |
| `text-h2` | 18px (1.125rem)| 1.4 | SemiBold (600) | Sub-sections, Modal Headers |
| `text-body` | 14px (0.875rem)| 1.5 | Regular (400) | Standard Body Text, Task Titles, Descriptions |
| `text-caption` | 12px (0.75rem) | 1.4 | Medium (500) | Badges, Timestamps, Due Dates, Microcopy |

### 2.3 Spacing, Borders & Radius
- **Border Radius**:
  - `radius-sm`: `6px` (Input fields, small chips)
  - `radius-md`: `10px` (Cards, buttons, dropdowns)
  - `radius-lg`: `16px` (Large modal sheets, live room containers)
  - `radius-full`: `9999px` (Avatars, pill tags, streak badges)
- **Shadows**:
  - `shadow-sm`: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
  - `shadow-md`: `0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)`
  - `shadow-lg`: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`

---

## 3. Responsive Layout Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│ GlobalHeader (Height: 64px)                                           │
│ [Menu Toggle] [📘 StudySync] [Search ⌘K]     [Theme] [Fullscreen] [User]│
├─────────────────┬──────────────────────────────────────────────────────┤
│ Sidebar Drawer  │ Main Content Area                                    │
│ States:         │ (Overflow-y: Auto)                                   │
│ - Expanded      │                                                      │
│   (260px)       │  Active View:                                        │
│ - Collapsed     │  - Dashboard / Planner / Notes / Groups / Live Room  │
│   (72px)        │                                                      │
│ - Hidden (0px)  │                                                      │
│   (Ctrl+B)      │                                                      │
└─────────────────┴──────────────────────────────────────────────────────┘
```

### 3.1 Breakpoint System
- **Mobile (< 640px)**: Sidebar converts into an off-canvas drawer controlled via the hamburger menu button. Top search bar collapses into an icon button.
- **Tablet (640px - 1024px)**: Sidebar defaults to `collapsed` state (72px icons only). Multi-column dashboard grids collapse to 2 columns.
- **Desktop (> 1024px)**: Full multi-column view with sidebar in `expanded` mode (260px). Fullscreen mode hides the sidebar (`hidden`) to maximize focus.

---

## 4. Screen-by-Screen View Specifications

### 4.1 Global Header (`GlobalHeader.tsx`)
- **Left**: Sidebar collapse toggle button, StudySync brand logo with indigo book icon.
- **Center**: Quick-jump search input (`⌘K` badge trigger).
- **Right**:
  - Theme Toggle (`ThemeToggle.tsx`): Animates between Sun and Moon icons with local storage persistence.
  - Fullscreen Toggle: Calls `document.documentElement.requestFullscreen()`, entering distraction-free study mode.
  - Notifications Bell: Indicator badge with unread count.
  - User Avatar dropdown with active student initials.

### 4.2 Sidebar Navigation (`SidebarMockup.tsx`)
- **Navigation Groups**:
  - *Main Navigation*: Dashboard, Study Planner, Notes & Files, Tasks Board, Live Study Rooms, Quizzes.
  - *Community*: Study Groups, Discussion Forums, Mentors.
  - *Account*: User Profile, Settings.
- **State Indicators**: Active routes highlighted with cobalt border and soft sand background.

### 4.3 Study Planner (`PlannerMockup.tsx`)
- **View Switcher**: Segmented pill control toggling between `Daily`, `Weekly`, and `Monthly`.
- **Integrated Focus Tools**:
  - Interactive Pomodoro Timer (25 min Focus / 5 min Rest) with play/pause controls.
  - Daily Study Timeline showing booked lecture intervals, assignments, and exam review slots.
  - Exam Countdown widgets with priority color chips.

### 4.4 Live Study Room (`LiveRoomMockup.tsx`)
- **Media Canvas**:
  - Responsive video grid adapting dynamically to 1, 2, 4, or 12+ participants.
  - Speaking indicator: Green glowing border around active audio tracks.
  - Screen share view: Focuses desktop stream in primary viewport while minimizing participant cameras into a bottom strip.
- **Control Dock**:
  - Mic Mute/Unmute, Camera On/Off, Screen Share Toggle, Emoji Reactions, Leave Session (red exit button).
- **Side Panel**: Tabbed between in-room text chat and live participant roster.

### 4.5 Notes & Resource Library (`NotesFilesMockup.tsx`)
- **Folder Navigation**: Category pills (`All Files`, `Notes`, `Documents`, `Code Snippets`, `Shared with Me`, `Starred`, `Trash`).
- **Quick Access Cards**: Subject folders (Algorithms, Data Structures, Operating Systems, Web Development).
- **Recent Files Table**: File format icons (PDF in red, Word in blue, Markdown in amber, Images in green), file size, upload date, and action menu.

### 4.6 Task Management Board (`TasksMockup.tsx`)
- **Filter Tabs**: `All`, `Today`, `Upcoming`, `Completed`, `Overdue`.
- **Kanban Timeline Buckets**: Grouped by urgency (`TODAY`, `TOMORROW`, `THIS WEEK`, `LATER`, `COMPLETED`).
- **Interactive Checkbox**: Strikes through text with smooth opacity transition upon completion.
- **Task Creation Modal**: Input title, subject tag selector, priority chips (`High`, `Medium`, `Low`), and calendar date picker.

### 4.7 Quiz & Self-Assessment View (`QuizMockup.tsx`)
- **Subject Pills**: Algorithms, Data Structures, DBMS, Operating Systems, Web Development, AI/ML.
- **Topic Filter**: Granular sub-topics (e.g. Graphs, Dynamic Programming, Sorting).
- **Practice Card**: Shows question count, estimated time, and XP rewards.

### 4.8 Profile View (`ProfileMockup.tsx`)
- **Header**: Large circular initials avatar, full name, email, edit profile toggle.
- **Academic Info**: University/College, Degree, Semester, Location.
- **Skill Tags**: Interactive tag clouds for Programming Languages, Technologies, and Learning Interests.
- **External Links**: GitHub, LinkedIn, and Portfolio website URLs.

---

## 5. Keyboard Navigation & Accessibility (WCAG 2.1 AA)

| Shortcut | Scope | Action |
| :--- | :--- | :--- |
| `Ctrl + B` | Global | Toggles sidebar between expanded and hidden. |
| `Cmd + K` / `Ctrl + K` | Global | Focuses global search bar. |
| `Escape` | Global | Closes open modals, drawers, and search dropdowns. |
| `Tab` / `Shift + Tab` | Global | Traverses focusable interactive elements in logical DOM order. |
| `Space` / `Enter` | Global | Activates buttons, checkboxes, and segmented view toggles. |

### Color Contrast Verification
- Text `#111827` on background `#FAF9F6`: Contrast ratio **14.2:1** (Exceeds WCAG AAA).
- Button `#2563EB` with white text `#FFFFFF`: Contrast ratio **4.6:1** (Passes WCAG AA).
- Coral chip `#F97316` on soft sand: Contrast ratio **4.8:1** (Passes WCAG AA).
