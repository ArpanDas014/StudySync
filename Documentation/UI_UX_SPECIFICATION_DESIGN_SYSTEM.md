# UI/UX Specification & Design System — StudySync

**Version:** 2.0  
**Status:** Updated to align with the finalized Minimal Monogram “S” brand direction

---

## 1. Design Philosophy & Visual Identity

The StudySync visual language is built upon the **Warm Academic Aesthetic**. Unlike sterile corporate project managers or overly noisy, gamified apps, StudySync strikes a calm balance: **structured enough for rigorous productivity**, but **warm enough for long, daily study sessions**.

The visual identity is now anchored by a **Minimal Monogram “S”** rather than a generic education/book symbol. The mark represents learning, progress, continuous movement, and synchronization while remaining compact enough for application icons, favicons, mobile navigation, and desktop branding.

### 1.1 Core Principles

1. **Low Cognitive Load**: Minimizes clutter, uses generous whitespace, and groups related tasks into predictable card containers.
2. **Warmth & Encouragement**: Uses warm neutral surfaces, soft mint backgrounds, and controlled green/lime accents.
3. **Progressive Disclosure**: Keeps primary views clean while exposing filters, advanced settings, and details on demand.
4. **Predictable Navigation**: Persistent global header and collapsible drawer ensure students never feel disoriented.
5. **Brand Recognition**: The Minimal Monogram “S” is the primary identity element across web, mobile, and promotional surfaces.

---

## 2. Design Tokens

### 2.1 Color Palette

The design system has been updated to use the green-forward StudySync identity.

```text
Deep Green (#0B3D2E)    ── Primary brand dark, high-emphasis text/surfaces
Forest Green (#126F4F)  ── Primary actions, links, active controls
Lime Green (#A7F15B)    ── Highlights, progress, achievements, visual accents
Pale Mint (#D8F6DD)     ── Soft backgrounds, selected/completed states
White (#FFFFFF)         ── Primary light surfaces
Warm Sand (#F8FAF2)     ── Light-mode page backgrounds and warm panels
Charcoal (#1E1E1E)      ── Secondary text and neutral high-contrast content
```

Semantic colors remain available where their meaning is important:

```text
Danger  (#DC2626) ── Destructive actions / leave / delete
Warning (#D97706) ── Warnings / approaching deadlines
Info    (#2563EB) ── Informational states
```

These semantic colors should not replace the brand palette for ordinary navigation and primary actions.

#### CSS Custom Properties (`theme.css`)

```css
:root {
  --color-deep-green: #0b3d2e;
  --color-forest-green: #126f4f;
  --color-lime: #a7f15b;
  --color-pale-mint: #d8f6dd;
  --color-white: #ffffff;
  --color-warm-sand: #f8faf2;
  --color-charcoal: #1e1e1e;

  --color-danger: #dc2626;
  --color-warning: #d97706;
  --color-info: #2563eb;

  /* Semantic Light Mode Tokens */
  --theme-bg: #f8faf2;
  --theme-surface: #ffffff;
  --theme-surface-soft: #f1f7f2;
  --theme-text-primary: #1e1e1e;
  --theme-text-secondary: #5b635f;
  --theme-border: #dde7e0;
  --theme-border-strong: #b9cbbf;
  --theme-primary: #126f4f;
  --theme-primary-strong: #0b3d2e;
  --theme-highlight: #a7f15b;
  --theme-success-surface: #d8f6dd;
}

[data-theme='dark'] {
  /* Semantic Dark Mode Tokens */
  --theme-bg: #071812;
  --theme-surface: #0d241b;
  --theme-surface-soft: #123124;
  --theme-text-primary: #f4faf6;
  --theme-text-secondary: #a6b7ae;
  --theme-border: #244438;
  --theme-border-strong: #355848;
  --theme-primary: #55b88b;
  --theme-primary-strong: #7adf58;
  --theme-highlight: #a7f15b;
  --theme-success-surface: #123b2a;
}
```

### 2.2 Typography Scale

Primary Font Family: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

| Token | Size | Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `text-display` | 32px (2.0rem) | 1.25 | Bold (700 / 800) | Major View Headings (Planner, Notes, Groups) |
| `text-h1` | 24px (1.5rem) | 1.3 | SemiBold (600 / 700) | Card Headers, Section Titles |
| `text-h2` | 18px (1.125rem) | 1.4 | SemiBold (600) | Sub-sections, Modal Headers |
| `text-body` | 14px (0.875rem) | 1.5 | Regular (400) | Standard Body Text, Task Titles, Descriptions |
| `text-body-medium` | 14px (0.875rem) | 1.5 | Medium (500) | Labels, emphasized supporting text |
| `text-caption` | 12px (0.75rem) | 1.4 | Medium (500) | Badges, Timestamps, Due Dates, Microcopy |
| `text-overline` | 11px | 1.3 | SemiBold (600) | Short category labels |

### 2.3 Spacing, Borders & Radius

Use a 4px base spacing grid:

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64px`

- **Border Radius:**
  - `radius-sm`: `6px` (Input fields, small chips)
  - `radius-md`: `10px` (Cards, buttons, dropdowns)
  - `radius-lg`: `16px` (Large modal sheets, live room containers)
  - `radius-xl`: `20px` (Feature/hero cards)
  - `radius-full`: `9999px` (Avatars, pill tags, streak badges)

- **Shadows:**
  - `shadow-sm`: `0 1px 2px rgba(11, 61, 46, 0.05)`
  - `shadow-md`: `0 4px 10px rgba(11, 61, 46, 0.07)`
  - `shadow-lg`: `0 10px 24px rgba(11, 61, 46, 0.10)`

Cards should prefer subtle borders with restrained elevation rather than heavy floating shadows.

---

## 3. Responsive Layout Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│ GlobalHeader (Height: 64px)                                           │
│ [Menu Toggle] [S Mark + StudySync] [Search ⌘K] [Theme] [Bell] [User] │
├─────────────────┬──────────────────────────────────────────────────────┤
│ Sidebar Drawer  │ Main Content Area                                    │
│ States:         │ (Overflow-y: Auto)                                   │
│ - Expanded      │                                                      │
│   (260px)       │  Active View:                                        │
│ - Collapsed     │  - Dashboard / Planner / Notes / Groups / Live Room │
│   (72px)        │                                                      │
│ - Hidden (0px)  │                                                      │
│   (Ctrl+B)      │                                                      │
└─────────────────┴──────────────────────────────────────────────────────┘
```

### 3.1 Breakpoint System

- **Mobile (< 640px):** Sidebar converts into an off-canvas drawer controlled via the hamburger menu button. Top search bar collapses into an icon button.
- **Tablet (640px - 1024px):** Sidebar defaults to `collapsed` state (72px icons only). Multi-column dashboard grids collapse to 2 columns.
- **Desktop (> 1024px):** Full multi-column view with sidebar in `expanded` mode (260px). Fullscreen mode hides the sidebar (`hidden`) to maximize focus.

---

## 4. Branding & Shared UI Components

### 4.1 Global Header (`GlobalHeader.tsx`)

- **Left:** Sidebar collapse toggle, StudySync S monogram, StudySync wordmark.
- **Center:** Quick-jump search input (`⌘K` badge trigger).
- **Right:**
  - Theme Toggle (`ThemeToggle.tsx`): Animates between Sun and Moon icons with local persistence.
  - Fullscreen Toggle: Calls `document.documentElement.requestFullscreen()` for distraction-free study mode.
  - Notifications Bell: Indicator badge with unread count.
  - User Avatar dropdown with active student initials.

The header should use the white/surface token in light mode and the dark surface token in dark mode, with a subtle border.

### 4.2 Sidebar Navigation (`SidebarMockup.tsx`)

- **Navigation Groups:**
  - *Main Navigation*: Dashboard, Study Planner, Notes & Files, Tasks Board, Live Study Rooms, Quizzes.
  - *Community*: Study Groups, Discussion Forums, Mentors.
  - *Account*: User Profile, Settings.
- **State Indicators:** Active routes highlighted using Pale Mint background and Forest Green icon/text treatment, with a clear active indicator.

### 4.3 Shared Components

The product should use one shared component language for:

- Buttons
- Inputs
- Dropdowns
- Tabs
- Segmented controls
- Cards
- Badges
- Subject pills
- Modals
- Drawers
- Tooltips
- Progress indicators
- Empty/loading/error states

Every interactive component should define default, hover, focus, active/pressed, disabled, and relevant loading/error/success states.

---

## 5. Screen-by-Screen View Specifications

### 5.1 Study Planner (`PlannerMockup.tsx`)

- **View Switcher:** Segmented control toggling between `Daily`, `Weekly`, and `Monthly`.
- **Interactive Pomodoro:** 25 min Focus / 5 min Rest.
- **Daily Study Timeline:** Lecture intervals, assignments, revision, and exam-review slots.
- **Exam Countdown:** Date, remaining time, and priority state.
- **Visual hierarchy:** Keep the timer and current-day planning visually dominant while secondary scheduling data remains compact.

### 5.2 Live Study Room (`LiveRoomMockup.tsx`)

- **Media Canvas:** Responsive video grid adapting dynamically to 1, 2, 4, or 12+ participants.
- **Speaking indicator:** Green glowing border around active audio tracks, supported by accessible state information.
- **Screen share:** Primary viewport for desktop stream with minimized participant cameras in a bottom strip.
- **Control Dock:** Mic, camera, screen share, emoji reactions, more options, and Leave Session.
- **Side Panel:** Tabbed between in-room chat and participant roster.

### 5.3 Notes & Resource Library (`NotesFilesMockup.tsx`)

- **Folder Navigation:** `All Files`, `Notes`, `Documents`, `Code Snippets`, `Shared with Me`, `Starred`, `Trash`.
- **Quick Access Cards:** Subject folders such as Algorithms, Data Structures, Operating Systems, and Web Development.
- **Recent Files Table:** File format icons, file size, upload date, and action menu.
- **File colors:** Semantic file-type colors may remain multi-color where that improves recognition.

### 5.4 Task Management Board (`TasksMockup.tsx`)

- **Filter Tabs:** `All`, `Today`, `Upcoming`, `Completed`, `Overdue`.
- **Timeline Buckets:** `TODAY`, `TOMORROW`, `THIS WEEK`, `LATER`, `COMPLETED`.
- **Interactive Checkbox:** Strikes through text with a subtle opacity transition.
- **Task Creation Modal:** Input title, subject, priority (`High`, `Medium`, `Low`), and calendar date picker.

Priority color guidance:

- High → semantic danger/coral treatment
- Medium → semantic warning/amber treatment
- Low → neutral/green-soft treatment

### 5.5 Quiz & Self-Assessment View (`QuizMockup.tsx`)

- **Subject Pills:** Algorithms, Data Structures, DBMS, Operating Systems, Web Development, AI/ML.
- **Topic Filter:** Granular sub-topics such as Graphs, Dynamic Programming, Sorting.
- **Practice Card:** Shows question count, estimated time, difficulty, and optional XP/reward.
- **Question view:** Progress → Question → Answers → Submit/Next.

### 5.6 Profile View (`ProfileMockup.tsx`)

- **Header:** Large circular initials avatar, full name, email, edit profile toggle.
- **Academic Info:** University/College, Degree, Semester, Location.
- **Skill Tags:** Programming Languages, Technologies, Learning Interests.
- **External Links:** GitHub, LinkedIn, Portfolio website URLs.

---

## 6. Logo & Brand Asset Specifications

### 6.1 Primary mark

**Minimal Monogram “S”** consisting of:

- Two flowing forms creating the S silhouette.
- A small spark above/right representing ideas, achievement, progress, and a brighter future.
- Green-forward two-tone treatment.

The monogram is the primary recognizable product symbol.

### 6.2 Logo variants

Required variants:

1. Horizontal primary lockup
2. Stacked lockup
3. Icon-only mark
4. Wordmark-only treatment
5. Monochrome dark
6. Monochrome light
7. Outline technical variant

### 6.3 Logo clear space

Recommended clear-space minimum:

`0.25 × logo mark height` on all sides.

### 6.4 Logo sizing

- Web primary logo: 120px+ wide
- Header: 132px+ wide where space allows
- Icon-only: 20px+
- Favicon: 16px
- Print: 18mm+ wide

Do not use the full wordmark inside the favicon.

### 6.5 Tagline

Optional supporting tagline:

`Plan • Focus • Learn • Grow`

Do not permanently lock the tagline into the logo artwork.

---

## 7. Iconography & Illustration System

### 7.1 Iconography

Use one consistent outline icon family with rounded geometry, approximately 1.75–2px stroke at 24px. Do not mix unrelated filled/3D/icon styles.

Primary categories:

- Navigation
- Study
- Tasks
- Communication
- Files
- System actions

### 7.2 Illustration style

Use soft editorial academic illustrations featuring:

- Warm neutral backgrounds
- Books, planners, notes, calendars, laptops, plants, targets, clocks
- Green, mint, and lime accents
- Rounded, simplified forms
- Minimal visual noise

The illustration system should support empty states, onboarding, study progress, quiz completion, and community states.

---

## 8. Background, Decoration & Visual Effects

Approved visual motifs:

- Soft green flowing curves
- Pale mint blobs
- Small single spark accents
- Abstract page/book forms
- Subtle paper-like layering

Avoid heavy particles, constant decorative animation, excessive glassmorphism, and strong gradients behind information-dense screens.

---

## 9. Motion & Interaction

Recommended animation timing:

- Micro interaction: 120–180ms
- Standard transition: 180–240ms
- Modal/panel: 240–320ms

Required motion behavior:

- Sidebar expand/collapse animation
- Theme icon crossfade/rotation
- Checkbox completion animation
- Modal fade/slide
- Subtle button feedback

Respect `prefers-reduced-motion: reduce` and disable non-essential movement.

---

## 10. Keyboard Navigation & Accessibility (WCAG 2.1 AA)

| Shortcut | Scope | Action |
| :--- | :--- | :--- |
| `Ctrl + B` | Global | Toggles sidebar between expanded and hidden. |
| `Cmd + K` / `Ctrl + K` | Global | Focuses global search bar. |
| `Escape` | Global | Closes open modals, drawers, and search dropdowns. |
| `Tab` / `Shift + Tab` | Global | Traverses focusable interactive elements in logical DOM order. |
| `Space` / `Enter` | Global | Activates buttons, checkboxes, and segmented view toggles. |

### Updated color contrast reference

Because the brand palette changed, the old contrast measurements from the earlier blue/coral palette should not be used as the accessibility source of truth.

Validated reference ratios for the updated palette:

- `#1E1E1E` on `#F8FAF2`: approximately **15.84:1**.
- `#126F4F` on `#FFFFFF`: approximately **6.15:1**.
- `#0B3D2E` on `#FFFFFF`: approximately **12.20:1**.
- `#A7F15B` on `#0B3D2E`: approximately **8.93:1**.

Do not use `#A7F15B` as small body text directly on white surfaces.

---

## 11. Asset Directory

The complete asset plan is:

```text
assets/
├── branding/
├── app-icon/
├── splash/
├── icons/
├── illustrations/
└── social/
```

See the master `design.md` file for the complete production filename inventory and visual specifications.

---

## 12. Product-Wide Design Rules

1. The S monogram is the primary product identifier.
2. Forest Green is the primary interaction color.
3. Pale Mint supports selection and completion states.
4. Lime is reserved for emphasis/progress rather than large surfaces.
5. Warm Sand and White provide the main light-mode surfaces.
6. Inter remains the primary typeface.
7. Cards, spacing, and controls use the same shared geometry.
8. Decorative elements never outrank functional content.
9. Motion exists to communicate state changes.
10. Accessibility is validated against the final palette and component states.

---

## 13. Relationship to `design.md`

This file remains the high-level **UI/UX Specification & Design System**.

The new `design.md` is the detailed **Master Product Design & Brand System** and expands this document with deeper guidance for:

- Logo construction
- Asset inventory
- App icons
- Favicon
- Splash screen
- Illustration system
- Motion
- Responsive rules
- Content tone
- Empty/loading/error states
- Component design
- Design QA
- Implementation tokens

Both documents should remain synchronized when future branding or UI foundations change.
