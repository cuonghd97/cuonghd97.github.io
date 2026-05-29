## 1. Project Initialization

- [x] 1.1 Scaffold a new Astro project (replacing the existing CRA) or initialize Astro in the current directory, choosing an empty template.
- [x] 1.2 Install required dependencies: `astro`, `tailwindcss`, `@astrojs/tailwind`, `@tailwindcss/typography`, `zod`.
- [x] 1.3 Configure `astro.config.mjs` to include the Tailwind integration and enable Shiki for syntax highlighting.
- [x] 1.4 Configure `tailwind.config.mjs` to include `@tailwindcss/typography` plugin.

## 2. Layouts & Configuration

- [x] 2.1 Define content collection schema in `src/content.config.ts` using `zod` for the blog collection (`title`, `description`, `pubDate`, `tags`, `draft`).
- [x] 2.2 Create `src/layouts/BaseLayout.astro` containing the common HTML shell, meta tags, and global styles.
- [x] 2.3 Create `src/layouts/PostLayout.astro` which uses `BaseLayout`, displaying post metadata (title, date, reading time, tags) and wraps `<slot />` inside a `prose prose-invert lg:prose-xl max-w-none prose-headings:text-emerald-400 prose-code:text-cyan-300` container.

## 3. Core Pages

- [x] 3.1 Implement `src/pages/index.astro` for the Portfolio Home Page featuring a Hero section, Featured Projects grid, and Latest Blog Posts list fetched from the `blog` collection.
- [x] 3.2 Implement `src/pages/blog/index.astro` for the Blog List Page showing all non-draft posts with filtering by tags.
- [x] 3.3 Implement `src/pages/blog/[...slug].astro` using `getStaticPaths()` to render individual blog posts dynamically from the `src/content/blog/` markdown files.

## 4. Content & Deployment

- [x] 4.1 Create sample markdown posts in `src/content/blog/` adhering to the Zod schema to test the rendering and syntax highlighting.
- [x] 4.2 Create `.github/workflows/deploy.yml` with a GitHub Actions workflow to build and deploy the static site to GitHub Pages.
- [x] 4.3 Clean up residual Create React App files (`src/App.tsx`, `src/index.tsx`, `public/index.html`, etc.) to ensure a clean Astro workspace.
