# StudySync — Master Product Design & Brand System

**Document:** `design.md`  
**Status:** Design Direction — Version 1.0  
**Product:** StudySync  
**Design Direction:** Minimal Monogram “S” + Calm Academic Productivity  
**Primary Brand Concept:** Learning, progress, synchronization, and continuous improvement  
**Primary Typeface:** Inter

---

## 1. Purpose

This document is the master visual design specification for StudySync. It expands the existing UI/UX specification into a complete product-level design system covering brand identity, logo construction, colors, typography, layout, components, iconography, illustrations, motion, responsive behavior, accessibility, screen-level visual rules, and production assets.

The existing UI/UX specification defines the product around a **Warm Academic Aesthetic**, low cognitive load, warmth, progressive disclosure, and predictable navigation. This document preserves those principles while establishing the finalized **Minimal Monogram “S”** visual identity.

### Design goals

1. Make StudySync immediately recognizable without relying on generic education symbols.
2. Keep the interface calm enough for long study sessions.
3. Use a compact visual language that works equally well on web, mobile, favicon, app icon, splash screen, and print.
4. Use color primarily as a semantic communication layer rather than decoration.
5. Keep interactions obvious, consistent, and accessible.

---

# 2. Brand Identity

## 2.1 Brand personality

StudySync should feel:

- Calm
- Focused
- Modern
- Encouraging
- Intelligent
- Approachable
- Organized
- Growth-oriented

It should **not** feel:

- Childish
- Gamified for its own sake
- Corporate or enterprise-heavy
- Visually noisy
- Overly academic or institutional
- Glossy/futuristic without purpose

## 2.2 Brand idea

StudySync combines two concepts:

**Study** → learning, knowledge, discipline, progress.  
**Sync** → alignment, consistency, collaboration, routines, and coordinated progress.

The identity should therefore visually communicate **movement toward a better learning state**, not simply “education”.

---

# 3. Logo System

## 3.1 Final logo direction

### Primary concept: Minimal Monogram “S”

The logo uses a flowing **S-shaped monogram** constructed from two complementary forms. The two forms visually converge around a shared center, representing:

- Two study paths coming together
- Knowledge + productivity
- Planning + execution
- Individual study + collaboration
- Continuous motion and improvement
- The “Sync” concept

A small spark/star element sits near the upper-right portion of the mark to represent a new idea, achievement, progress, and a brighter future.

### Core visual components

1. **Flowing S** — primary recognition shape.
2. **Two-tone forms** — two complementary paths working together.
3. **Single spark** — progress/insight cue.
4. **Wordmark** — `StudySync`.
5. **Optional tagline** — `Plan • Focus • Learn • Grow`.

The tagline is a supporting marketing element and must not be permanently locked into the primary logo artwork.

---

## 3.2 Logo lockups

### A. Horizontal primary lockup

Use for:

- Desktop header
- Website navigation
- Documentation
- Social banners
- Presentations
- Email signatures
- Marketing pages

Structure:

`[S Mark] [StudySync wordmark]`

Optional tagline appears beneath the wordmark only in marketing contexts.

### B. Stacked lockup

Use for:

- Splash screen
- Login / authentication screen
- Centered brand placements
- Promotional graphics

Structure:

`[S Mark]`  
`StudySync`  
`Plan • Focus • Learn • Grow` (optional)

### C. Icon-only mark

Use for:

- App icon
- Favicon
- Mobile navigation
- Compact sidebar
- Browser tab
- Avatar-like product identifier

Only the monogram and spark are used.

### D. Monochrome mark

Use for:

- Printing
- Embossing
- Low-color environments
- Legal/official documents
- Watermarks

Approved versions:

- Deep Green / Charcoal on light surfaces
- White on dark surfaces

### E. Outline mark

Use only as a secondary technical/illustrative variant. It is not the default brand mark.

---

## 3.3 Logo proportions

The logo must be maintained as a vector system with a consistent relationship between symbol and wordmark.

Recommended construction:

- Symbol width = 1.0× reference unit
- Symbol height = approximately 1.10–1.20× symbol width
- Wordmark height = approximately 0.30–0.38× symbol height in the horizontal lockup
- Minimum gap between symbol and wordmark = 0.18× symbol width
- Spark clear of the main S silhouette = at least 0.06× symbol width

The exact production SVG should be defined as the authoritative geometry once the logo is finalized in a vector design tool.

## 3.4 Clear space

Define clear space as the height of the lower loop of the S.

No typography, borders, icons, or UI elements should intrude into the clear-space zone.

Recommended minimum:

`Clear Space = 0.25 × logo mark height` on all sides.

## 3.5 Minimum sizes

| Context | Minimum recommended size |
|---|---:|
| Primary logo on web | 120px wide |
| Horizontal header logo | 132px wide |
| Stacked logo | 96px wide |
| Icon-only digital mark | 20px |
| Favicon | 16px |
| Mobile app icon | 32px visual mark inside adaptive icon |
| Print logo | 18mm wide |

At 16px and 20px, remove micro-detail that cannot survive rasterization.

## 3.6 Logo misuse

Do not:

- Add drop shadows directly to the primary vector mark.
- Stretch or compress the logo.
- Rotate the S.
- Change the S into a different type treatment.
- Add multiple decorative sparkles.
- Put the logo over visually noisy photographs without a supporting surface.
- Recolor the logo arbitrarily.
- Place the full logo inside a shape that reduces its clear space.
- Use the tagline in situations where the logo must remain compact.

---

# 4. Color System

## 4.1 Brand palette

The finalized visual direction uses a green-forward palette derived from the chosen Option 6 concept.

| Token | Hex | Primary role |
|---|---|---|
| `brand-deep-green` | `#0B3D2E` | Primary brand dark, headings, dark surfaces |
| `brand-forest-green` | `#126F4F` | Primary action color, links, active states |
| `brand-lime` | `#A7F15B` | Highlight, progress, achievement, visual spark |
| `brand-pale-mint` | `#D8F6DD` | Soft backgrounds, selected states, success surfaces |
| `brand-white` | `#FFFFFF` | Primary light surface |
| `brand-warm-sand` | `#F8FAF2` | Warm page background and cards/panels |
| `brand-charcoal` | `#1E1E1E` | Secondary text/high-contrast neutral |

## 4.2 Semantic colors

| Semantic token | Value | Usage |
|---|---|---|
| `primary` | `#126F4F` | Main buttons, active routes, links, focus controls |
| `primary-strong` | `#0B3D2E` | Hover/pressed states, high-emphasis brand surfaces |
| `highlight` | `#A7F15B` | Progress, streak accents, achievement markers |
| `success` | `#126F4F` | Completed actions, positive state |
| `success-surface` | `#D8F6DD` | Completed task background, confirmations |
| `page` | `#F8FAF2` | Light-mode page background |
| `surface` | `#FFFFFF` | Cards, panels, inputs |
| `text-primary` | `#1E1E1E` | Main content |
| `text-secondary` | `#5B635F` | Secondary copy |
| `border` | `#DDE7E0` | Default boundaries |
| `border-strong` | `#B9CBBF` | Emphasized boundaries |
| `danger` | `#DC2626` | Destructive/leave actions |
| `warning` | `#D97706` | Warnings, due-soon states |
| `info` | `#2563EB` | Informational states where semantic blue improves clarity |

Brand colors should remain dominant in the interface, while danger/warning/info colors may remain semantically distinct.

## 4.3 Color hierarchy

Use color in this order:

1. Neutral surfaces
2. Deep/forest green for primary interaction
3. Pale mint for supportive states
4. Lime for emphasis and progress
5. Semantic colors only when required

Avoid filling entire screens with bright lime. Lime is an accent, not the base UI color.

---

# 5. Theme System

## 5.1 Light mode

Light mode is the default visual environment.

Recommended semantic CSS variables:

```css
:root {
  --color-brand-deep-green: #0b3d2e;
  --color-brand-forest-green: #126f4f;
  --color-brand-lime: #a7f15b;
  --color-brand-pale-mint: #d8f6dd;
  --color-brand-white: #ffffff;
  --color-brand-warm-sand: #f8faf2;
  --color-brand-charcoal: #1e1e1e;

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
```

## 5.2 Dark mode

Dark mode should preserve the green identity without producing a saturated neon interface.

```css
[data-theme='dark'] {
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

Dark mode should use lime sparingly because large areas of bright lime create eye fatigue during long study sessions.

---

# 6. Typography

## 6.1 Primary font

`Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

Inter remains the product typeface from the original design system.

## 6.2 Type scale

| Token | Size | Line height | Weight | Usage |
|---|---:|---:|---:|---|
| `text-display` | 32px | 1.25 | 700–800 | Major page headings |
| `text-h1` | 24px | 1.30 | 600–700 | Section/card headers |
| `text-h2` | 18px | 1.40 | 600 | Sub-sections/modal headers |
| `text-body` | 14px | 1.50 | 400 | Main body copy/task text |
| `text-body-medium` | 14px | 1.50 | 500 | Labels/emphasis |
| `text-caption` | 12px | 1.40 | 500 | Badges/timestamps/microcopy |
| `text-overline` | 11px | 1.30 | 600 | Tiny section labels |

## 6.3 Typography rules

- Use sentence case for interface labels.
- Avoid all-caps except for short urgency/category labels.
- Maintain strong visual contrast between page title and supporting description.
- Never rely on font weight alone to communicate state.

---

# 7. Layout System

## 7.1 Global architecture

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Global Header — 64px                                                 │
│ [Menu] [S Mark + StudySync] [Search / ⌘K] [Theme] [Bell] [Avatar]   │
├────────────────┬─────────────────────────────────────────────────────┤
│ Sidebar        │ Main Content                                       │
│ 260px expanded │                                                     │
│ 72px collapsed │                                                     │
│ 0px hidden     │                                                     │
└────────────────┴─────────────────────────────────────────────────────┘
```

## 7.2 Content container

Desktop:

- Maximum content width: 1440px
- Default horizontal padding: 24px
- Large desktop padding: 32px

Tablet:

- Horizontal padding: 20px

Mobile:

- Horizontal padding: 16px

## 7.3 Grid rules

- Desktop dashboard: 3–4 flexible columns depending on card type.
- Tablet: 2 columns for dashboard cards.
- Mobile: 1 column by default.
- Critical data tables may use horizontal scrolling rather than shrinking below usability.

## 7.4 Spacing scale

Use a consistent 4px base grid:

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64`

---

# 8. Radius, Borders & Elevation

## 8.1 Radius

| Token | Value | Usage |
|---|---:|---|
| `radius-sm` | 6px | Inputs, compact chips |
| `radius-md` | 10px | Buttons, standard cards, dropdowns |
| `radius-lg` | 16px | Large panels, modal sheets, live room containers |
| `radius-xl` | 20px | Hero sections / featured cards |
| `radius-full` | 9999px | Avatars, pills, status markers |

## 8.2 Elevation

Use shadows lightly to preserve the calm academic aesthetic.

```css
--shadow-sm: 0 1px 2px rgba(11, 61, 46, 0.05);
--shadow-md: 0 4px 10px rgba(11, 61, 46, 0.07);
--shadow-lg: 0 10px 24px rgba(11, 61, 46, 0.10);
```

Cards should generally use a border first and a shadow second.

---

# 9. Header Design

## 9.1 Structure

### Left

- Sidebar toggle
- S monogram
- StudySync wordmark

### Center

- Global quick search
- Search shortcut badge (`⌘K` on macOS / `Ctrl+K` on Windows/Linux)

### Right

- Theme toggle
- Fullscreen toggle
- Notifications
- User avatar

## 9.2 Header behavior

- Fixed/sticky on desktop.
- On mobile, the wordmark may collapse to the monogram when width is constrained.
- Search becomes an icon-triggered sheet on narrow screens.
- Header background uses `surface` with subtle bottom border.

---

# 10. Sidebar Design

## 10.1 States

1. Expanded — 260px
2. Collapsed — 72px
3. Hidden — 0px
4. Mobile off-canvas drawer

## 10.2 Navigation groups

### Main navigation

- Dashboard
- Study Planner
- Notes & Files
- Tasks Board
- Live Study Rooms
- Quizzes

### Community

- Study Groups
- Discussion Forums
- Mentors

### Account

- Profile
- Settings

## 10.3 Active state

Use:

- Pale Mint background
- Forest Green text/icon
- 3px leading indicator or equivalent clear active marker

Avoid using the lime highlight as the only active-state indicator.

---

# 11. Component Design System

## 11.1 Buttons

### Primary

- Forest Green fill
- White text
- 10px radius
- Medium/semibold text

### Secondary

- White/transparent surface
- Forest Green text
- Subtle border

### Tertiary

- No fill
- Text/link styling
- Minimal padding

### Destructive

- Semantic danger red
- Used for delete, leave session, destructive confirmation

## 11.2 Inputs

- White surface
- 1px neutral border
- 10px radius
- 40–44px minimum control height
- Visible focus ring using green with sufficient contrast

## 11.3 Cards

Card anatomy:

`Header → Context → Main content → Actions`

Cards should support clear scanning and avoid overloading users with simultaneous metadata.

## 11.4 Pills and badges

Use for:

- Subjects
- Status
- Priority
- Dates
- Filters
- Study modes

Do not use more than two strong accent colors within the same compact card unless the card has a clear semantic reason.

## 11.5 Checkboxes

Completion behavior:

1. Check animation
2. Label strikethrough
3. Slight opacity reduction
4. Pale Mint supporting background where useful

The interaction should be immediate but subtle.

---

# 12. Study Planner Visual Design

The Study Planner should be the most information-dense screen without becoming visually crowded.

## 12.1 View switcher

Segmented control:

`Daily | Weekly | Monthly`

Active segment:

- Forest Green text
- Pale Mint background
- Semibold typography

## 12.2 Pomodoro

Default cycle:

- 25 minutes Focus
- 5 minutes Rest

Visual treatment:

- Large numeric timer
- One primary action
- Secondary reset/settings actions
- Progress ring may use Forest Green with Lime only for completion/highlight

## 12.3 Timeline

Display:

- Lectures
- Assignments
- Revision blocks
- Exam review slots
- Personal focus sessions

Use soft semantic blocks rather than highly saturated colors.

## 12.4 Exam countdown

Hierarchy:

`Exam name → date → days remaining → priority`

Use Lime for positive progress and Coral/amber/danger semantics only where deadline urgency demands them.

---

# 13. Live Study Room Visual Design

## 13.1 Video grid

Support:

- 1 participant
- 2 participants
- 4 participants
- 12+ participants

Participant tiles should preserve faces at usable size and avoid excessive decorative framing.

## 13.2 Speaking indicator

Use a glowing **green ring/border** around the active speaker.

Do not rely on glow alone; pair it with an accessible visual state or label where appropriate.

## 13.3 Screen share

When screen sharing is active:

- Main viewport becomes the shared desktop stream.
- Participant cameras move to a compact bottom strip.
- Controls remain persistent.

## 13.4 Control dock

Controls:

- Microphone
- Camera
- Screen share
- Reactions
- More options
- Leave session

The leave button is the only persistent destructive control and should be visually separated from the safe controls.

---

# 14. Notes & Resource Library Visual Design

## 14.1 Category pills

- All Files
- Notes
- Documents
- Code Snippets
- Shared with Me
- Starred
- Trash

## 14.2 Subject folders

Example subjects:

- Algorithms
- Data Structures
- Operating Systems
- Web Development

Folder cards use subtle subject accents but remain within the brand system.

## 14.3 File-type icons

File formats may retain conventional semantic colors because users often identify file types by color.

Recommended examples:

- PDF → red semantic indicator
- Word → blue semantic indicator
- Markdown → amber semantic indicator
- Image → green semantic indicator

These colors are content semantics, not primary brand colors.

---

# 15. Task Management Visual Design

## 15.1 Filter tabs

- All
- Today
- Upcoming
- Completed
- Overdue

## 15.2 Buckets

- TODAY
- TOMORROW
- THIS WEEK
- LATER
- COMPLETED

Use visual weight rather than intense color to establish urgency.

## 15.3 Priority chips

- High → semantic danger/coral treatment
- Medium → semantic warning/amber treatment
- Low → neutral/green-soft treatment

## 15.4 Task creation modal

Fields:

- Title
- Subject
- Priority
- Due date
- Notes/details if needed

The modal should show only fields required for successful creation; advanced options should remain progressive.

---

# 16. Quiz & Self-Assessment Design

## 16.1 Subject pills

Examples:

- Algorithms
- Data Structures
- DBMS
- Operating Systems
- Web Development
- AI/ML

## 16.2 Practice card

Show:

- Title
- Topic
- Question count
- Estimated time
- Difficulty
- Optional XP/reward

The main CTA should remain visually dominant.

## 16.3 Question screen

Layout priority:

`Progress → Question → Answer options → Submit/Next → Secondary help`

Avoid introducing decorative elements that compete with the question text.

---

# 17. Profile Design

## 17.1 Header

- Circular initials/avatar
- Full name
- Email
- Edit profile action

## 17.2 Academic information

- University/College
- Degree
- Semester
- Location

## 17.3 Skill tags

Group into:

- Programming Languages
- Technologies
- Learning Interests

## 17.4 External links

- GitHub
- LinkedIn
- Portfolio

External links should look interactive but visually secondary to academic information.

---

# 18. Iconography

## 18.1 Style

Use a unified outline icon family with:

- Rounded line endings
- Consistent 1.75–2px stroke at 24px
- Minimal internal detail
- Clear silhouettes

Recommended source style:

- Lucide-like geometry or another consistent SVG icon set

Do not mix filled, 3D, hand-drawn, and outlined icon families in the same interface.

## 18.2 Core icon categories

### Navigation

Menu, dashboard, calendar, notes, files, tasks, rooms, quiz, groups, forum, mentor, profile, settings.

### Actions

Search, add, edit, delete, archive, download, upload, share, copy, filter, sort, more.

### Study

Timer, focus, book, bookmark, exam, target, chart, check, progress.

### Communication

Microphone, camera, screen share, reaction, chat, participants.

---

# 19. Illustration System

## 19.1 Illustration style

Use a soft editorial illustration style that feels like part of the StudySync brand rather than a generic stock-illustration library.

Visual characteristics:

- Warm off-white backgrounds
- Rounded forms
- Simplified objects
- Green/mint/lime accents
- Small academic references such as books, planners, calendars, laptops, notes, plants, targets, and clocks
- Minimal visual noise

Avoid excessive 3D realism.

## 19.2 Illustration use cases

- Empty states
- Onboarding
- Study plan completion
- No files found
- Empty task board
- Quiz completion
- Group/community onboarding
- Error recovery

---

# 20. Background & Decorative Language

Use decoration sparingly.

Approved motifs:

- Soft flowing green curves
- Pale mint blobs
- Tiny single spark accents
- Abstract page/book shapes
- Gentle paper-like layers

Do not use:

- Constant animated particles
- Heavy gradients behind dense data
- Strong glassmorphism everywhere
- Random decorative shapes unrelated to learning/productivity

---

# 21. Motion & Animation

Animation should reinforce understanding, not demand attention.

## 21.1 Timing

Recommended:

- Micro interaction: 120–180ms
- Standard transition: 180–240ms
- Larger panel/modal: 240–320ms

## 21.2 Motion patterns

### Navigation

- Sidebar width transition
- Active indicator fade/slide

### Buttons

- Small scale/brightness response
- No exaggerated bounce

### Checkboxes

- Checkmark draw/fade
- Label strikethrough

### Theme toggle

- Smooth icon rotation/crossfade

### Modal

- Fade + subtle upward movement

### Page transitions

Keep page transitions minimal or use none when they delay task completion.

## 21.3 Reduced motion

Respect:

`prefers-reduced-motion: reduce`

Disable non-essential decorative motion in reduced-motion mode.

---

# 22. Responsive Rules

## Mobile — < 640px

- Sidebar becomes off-canvas drawer.
- Search becomes icon-triggered.
- Header compresses.
- Cards become single-column.
- Tables can horizontally scroll.
- Primary actions remain thumb-reachable.
- Use 16px page padding.

## Tablet — 640–1024px

- Sidebar defaults to collapsed 72px mode.
- Dashboard uses two columns.
- Keep touch targets large enough for touch interaction.

## Desktop — > 1024px

- Sidebar expands to 260px by default.
- Multi-column content is allowed.
- Fullscreen mode may hide sidebar.

---

# 23. Accessibility

StudySync targets **WCAG 2.1 AA**.

## 23.1 Keyboard support

| Shortcut | Action |
|---|---|
| `Ctrl + B` | Toggle sidebar expanded/hidden |
| `Cmd + K` / `Ctrl + K` | Focus global search |
| `Escape` | Close active modal/drawer/search surface |
| `Tab` / `Shift + Tab` | Traverse focusable controls |
| `Space` / `Enter` | Activate focused control |

## 23.2 Contrast guidance

For the green redesign, do not carry over the old contrast ratios from the previous blue/coral palette without re-validation.

Reference ratios from the updated palette:

- `#1E1E1E` on `#F8FAF2` ≈ **15.84:1**
- `#126F4F` on `#FFFFFF` ≈ **6.15:1**
- `#0B3D2E` on `#FFFFFF` ≈ **12.20:1**
- `#A7F15B` on `#0B3D2E` ≈ **8.93:1**

Lime should generally not be used as small text on white backgrounds.

## 23.3 Focus state

Every keyboard-focusable control must have a clearly visible focus indicator. Never remove the browser focus outline without replacing it with a stronger accessible state.

---

# 24. Content & Microcopy Style

StudySync copy should feel encouraging but not childish.

Preferred tone:

- Clear
- Direct
- Supportive
- Action-oriented
- Calm

Examples:

**Good:** `Start focus session`  
**Avoid:** `Crush your goals!!!`

**Good:** `2 tasks due today`  
**Avoid:** `OH NO! You have deadlines!`

**Good:** `Your study plan is ready`  
**Avoid:** `Let's supercharge your brain!`

---

# 25. Empty, Loading & Error States

## Empty states

Use a small illustration + explanation + one obvious action.

Example:

`No study sessions yet`  
`Create your first focus session to start building your routine.`  
`[Create session]`

## Loading

Prefer:

- Skeletons for content-heavy layouts
- Small inline spinners only for localized actions

Avoid replacing the entire interface with an opaque full-screen spinner unless the application cannot render any meaningful content yet.

## Error

Error messages should identify:

1. What failed
2. Whether the user's data is safe
3. What they can do next

---

# 26. Branding Asset Inventory

The production asset directory should be organized as follows:

```text
assets/
├── branding/
│   ├── logo-primary.svg
│   ├── logo-horizontal.svg
│   ├── logo-stacked.svg
│   ├── logo-icon.svg
│   ├── logo-monochrome-dark.svg
│   ├── logo-monochrome-light.svg
│   ├── logo-outline.svg
│   ├── logo-wordmark.svg
│   ├── logo-clearspace.svg
│   └── brand-guidelines.pdf
│
├── app-icon/
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   ├── icon-512.png
│   ├── favicon.ico
│   └── site.webmanifest
│
├── splash/
│   ├── splash-light.svg
│   ├── splash-dark.svg
│   └── splash-mark.svg
│
├── icons/
│   ├── navigation/
│   ├── study/
│   ├── tasks/
│   ├── communication/
│   ├── files/
│   └── system/
│
├── illustrations/
│   ├── empty-state/
│   ├── onboarding/
│   ├── study/
│   ├── quiz/
│   ├── community/
│   └── system/
│
└── social/
    ├── og-image.png
    ├── og-image-dark.png
    ├── twitter-card.png
    ├── linkedin-banner.png
    └── social-avatar.png
```

---

# 27. App Icon Specification

The app icon should use the icon-only S mark.

### Light icon

- Warm Sand/White base
- Green S
- Lime spark
- Minimal internal detail

### Dark icon

- Deep Green/dark background
- Light/green S
- Lime spark

### Gradient icon

A gradient variant may be used for promotional visuals, but it should not replace the flat production icon unless the platform context allows it.

### Safe zone

Keep the visual mark inside approximately 80–85% of the canvas so adaptive icon masks do not crop the S.

---

# 28. Favicon Specification

### 16×16

Use simplified S + spark.

### 32×32

Use full icon-only mark.

### 48×48 and above

Use full icon-only mark with normal proportions.

Avoid using the complete `StudySync` wordmark in favicon contexts.

---

# 29. Splash Screen

## Light

- `#F8FAF2` background
- Centered S icon
- `StudySync` wordmark underneath
- Optional very subtle flowing green wave near the bottom edge

## Dark

- Deep dark green background
- Light S/icon treatment
- Minimal supporting typography

Splash screens should feel calm and fast, not promotional.

---

# 30. Social & Marketing Assets

## Open Graph image

Suggested structure:

`[S Mark] StudySync`  
`Plan • Focus • Learn • Grow`  
`Plan smarter. Focus deeper. Learn consistently.`

Use a warm Sand background with flowing green forms and restrained academic imagery.

## Social avatar

Use icon-only S mark.

## Social banner

Use horizontal lockup with a generous safe area around the mark.

---

# 31. Photography Direction

When photography is used, choose imagery that feels:

- Natural
- Bright but not overexposed
- Calm
- Desk/study oriented
- Human and authentic

Preferred subjects:

- Study desks
- Notes/books
- Laptops
- Libraries
- Quiet group study
- Planning/calendar scenes

Avoid clichéd graduation-stock imagery unless directly relevant.

Use brand overlays sparingly and never reduce readability of UI or messaging.

---

# 32. Design Tokens — Implementation Reference

```css
:root {
  --brand-deep-green: #0b3d2e;
  --brand-forest-green: #126f4f;
  --brand-lime: #a7f15b;
  --brand-pale-mint: #d8f6dd;
  --brand-white: #ffffff;
  --brand-warm-sand: #f8faf2;
  --brand-charcoal: #1e1e1e;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 2px rgba(11, 61, 46, 0.05);
  --shadow-md: 0 4px 10px rgba(11, 61, 46, 0.07);
  --shadow-lg: 0 10px 24px rgba(11, 61, 46, 0.10);

  --header-height: 64px;
  --sidebar-expanded: 260px;
  --sidebar-collapsed: 72px;
}
```

---

# 33. Tailwind Mapping (Reference)

Recommended conceptual mapping:

```text
brand-deep-green   → #0B3D2E
brand-forest-green → #126F4F
brand-lime         → #A7F15B
brand-pale-mint    → #D8F6DD
brand-warm-sand    → #F8FAF2
brand-charcoal     → #1E1E1E
```

Use semantic utilities/components rather than repeatedly hard-coding hex values across JSX/TSX.

---

# 34. Component Naming Reference

Suggested component names:

```text
GlobalHeader
Sidebar
SidebarItem
GlobalSearch
ThemeToggle
FullscreenToggle
NotificationBell
UserMenu
PageHeader
Button
IconButton
Input
Select
Badge
SubjectPill
Card
Modal
Drawer
Tabs
SegmentedControl
ProgressRing
PomodoroTimer
StudyTimeline
ExamCountdown
TaskCard
TaskBucket
TaskCreateModal
FileCard
FileTable
PracticeCard
QuizQuestion
ParticipantTile
LiveControlDock
ChatPanel
ParticipantRoster
EmptyState
LoadingState
ErrorState
```

---

# 35. State Design

Every interactive component should define at least:

- Default
- Hover
- Focus
- Active/Pressed
- Disabled
- Loading
- Success
- Error (where applicable)

Use the same state logic across components so users do not need to relearn interaction patterns.

---

# 36. Product-Wide Consistency Rules

1. One primary interaction pattern per action.
2. One spacing system across all screens.
3. One icon family across the application.
4. One typography hierarchy across desktop and mobile.
5. One semantic interpretation for each color.
6. Decorative elements never outrank functional content.
7. Primary actions should be visually obvious within 1–2 seconds of opening a screen.
8. Empty and error states should preserve the same brand language as success states.
9. Motion should clarify state changes, not create entertainment loops.
10. The S monogram remains the single strongest visual identifier for StudySync.

---

# 37. Design QA Checklist

Before shipping a screen, verify:

### Brand

- Correct logo variant
- Correct colors
- Correct clear space
- No accidental recoloring

### Layout

- Correct spacing scale
- Correct content padding
- Proper responsive behavior
- No unexpected overflow

### Typography

- Correct font
- Correct size/weight
- Correct line height
- No excessive all-caps usage

### Components

- Consistent radii
- Consistent borders
- Correct state treatment
- Keyboard focus visible

### Accessibility

- Contrast validated
- Labels available to assistive technology
- Keyboard interaction works
- Touch targets remain usable
- Reduced-motion behavior implemented

### Motion

- Motion is purposeful
- Transitions are short
- No distracting loops

---

# 38. Final Visual Direction

StudySync should visually sit between a productivity workspace and a modern academic companion.

The finalized identity is built around the **Minimal Monogram “S”**, supported by a fresh green visual system:

`Deep Green → Forest Green → Pale Mint → Lime Highlight`

The product should feel **calm at rest, clear in use, and rewarding during progress**.

The logo is the recognizable symbol. The green system is the brand language. Inter is the typographic foundation. Cards, whitespace, semantic color, and restrained motion form the interaction language.

---

## 39. Design System Source-of-Truth Order

When design decisions conflict, use this order:

1. Product usability and accessibility
2. This master `design.md`
3. The updated UI/UX specification
4. Screen-specific implementation details
5. Individual component styling

Any new design should preserve the overall StudySync identity instead of introducing an unrelated visual language.
