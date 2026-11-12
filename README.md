# Rishi — personal portfolio

A responsive developer portfolio with a narrow framed layout, dotted side margins, an original botanical banner, a centered monogram, and a mix of serif and sans-serif typography. The design follows the composition of bhaskarsaikia.dev while keeping the artwork, personal content, and implementation original.

## Run locally

Requires Node.js 20.9 or newer (Node 22/24 recommended).

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

This project uses Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, and Lucide React. Outfit, Figtree, Instrument Serif, and Space Mono fonts are bundled locally through npm; no runtime Google Fonts connection is required. Deploy to a Node.js-compatible Next.js host. API routes require a server; this is not a static export.

## Make it yours

- `src/data/portfolio.ts`: personal copy, availability, projects, tags, links, and the currently-building card. Current work stages are editorial, not measured progress.
- `src/components/portfolio.tsx`: original SVG botanical artwork, profile introduction, real India clock, interactive tool wheel, theme and motion controls, current work, and contact.
- `src/components/projects.tsx`: list/spotlight views, project carousel, and accessible detail dialogs.
- `src/components/project-visual.tsx` and `project-visual.css`: lightweight CSS/SVG interface concepts. Replace with your own screenshots when available; the current previews are clearly labeled illustrative and contain no claimed live data.
- `src/app/globals.css`: design tokens, typography, layouts, responsive styles, reduced-motion support.
- `src/components/activity.tsx`: reusable contribution calendar, dashboard, and Discord presence.
- `src/app/layout.tsx` and `src/app/opengraph-image.tsx`: SEO and social share image.

Copy `.env.example` to `.env.local` and fill in the values you want to enable. Never commit `.env.local`. Restart the development server after changing variables. Public variables are included at build time; rebuild production after updating them.

| Variable | Purpose | Secret? |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin for sitemap and social metadata (e.g. `https://your-domain.com`) | No |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Your actual GitHub username; enables public profile, repository count, followers and recent events | No |
| `GITHUB_TOKEN` | Server-only GitHub token for the contribution calendar and higher API rate limits | **Yes** |
| `DISCORD_USER_ID` | Your Discord numeric user ID, used server-side by Lanyard | No, but kept server-side |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Enables email links and copy-email interaction | No |
| `NEXT_PUBLIC_LINKEDIN_URL` | Complete HTTPS LinkedIn profile URL | No |
| `NEXT_PUBLIC_RESUME_URL` | A resume URL, preferably `/resume.pdf` with the file in `public/` | No |

Project repository and demo URLs are optional fields in `src/data/portfolio.ts`. Missing links remain explicitly unavailable; they never navigate to somebody else’s account.

## GitHub integration

`GET /api/github` fetches GitHub’s official REST API for public profile information and up to 30 recent public events. This count is labeled as an API window, not an all-time total or coding-hours statistic. GitHub may return no public activity even for an active developer.

The yearly contribution calendar uses GitHub’s official GraphQL `contributionsCollection` query and requires `GITHUB_TOKEN`. Create a token that can read the intended public profile through GraphQL; no write permissions are needed. For your own private contribution counts, configure the account’s visibility preferences and any required read access deliberately. Tokens never enter client components or response payloads. Profile and contribution data are cached for 15 minutes. GitHub rate limits, invalid tokens, missing users, timeouts, unavailable events and partial contribution failures have explicit fallbacks.

The client includes loading, error with retry, unconfigured, empty, and zero-contribution states. It displays dashes for unavailable metrics, never invented numbers. The neutral empty grid is a decorative placeholder, not sample contribution activity. Configure your real username before publishing.

API reference: https://docs.github.com/en/rest/users/users and https://docs.github.com/en/graphql

## Discord integration

`GET /api/discord` reads public presence from [Lanyard](https://github.com/Phineas/lanyard). Join the Lanyard Discord server with the account whose presence you want to share, then set `DISCORD_USER_ID`. No bot token or Discord secret is needed. This makes the supported presence information publicly readable through Lanyard.

The UI polls once per minute while the page is visible. It supports online, idle, do-not-disturb and offline when returned by the service. Unconfigured, missing and failed presence are distinct from offline. Activity names are shown only when supplied by Lanyard.

## Accessibility and interaction

- Semantic sections, skip link, visible keyboard focus and an accessible mobile menu.
- Native modal project dialogs support Escape, focus containment, and focus return.
- Project list/spotlight controls expose pressed state, with accessible carousel buttons and project selection.
- The tool wheel is keyboard-operable and pauses when hovered or focused; decorative movement can also be paused from the banner.
- Dark/light theme switch, live India clock, expandable build notes, and copy-email feedback.
- Reduced-motion preferences suppress decorative CSS animation and Framer Motion transforms.
- Touch-friendly layouts at mobile, tablet and desktop sizes.
- No analytics, trackers, external imagery or API credentials in client code.

## Before publishing

Set your production site URL, contact details, actual GitHub username and LinkedIn URL. Add your resume, project URLs and screenshots. Configure the optional GitHub token and Discord presence only if wanted. Review the editable current-work stages and availability copy. Run lint and the production build, then deploy the project to your chosen Next.js host.
