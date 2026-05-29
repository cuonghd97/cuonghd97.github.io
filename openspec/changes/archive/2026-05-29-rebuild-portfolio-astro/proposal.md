## Why

The current project is a Create React App (CRA) application which is heavy and not optimized for static content like a portfolio and blog. Rebuilding the entire website using Astro and Tailwind CSS will provide a blazingly fast, modern single-page portfolio and a static blog with excellent SEO and developer experience. It also aligns better with the user's goal to showcase their work as a Backend / Systems Engineer.

## What Changes

- **BREAKING**: Replaces the existing Create React App foundation with Astro.
- Adds Tailwind CSS for modern, utility-first styling.
- Creates a new single-page Portfolio Home Page (`/`) with Hero, Featured Projects, and Latest Blog Posts sections.
- Creates a new Blog List Page (`/blog`) with tag filtering.
- Creates a Blog Detail Page (`/blog/[slug]`) with markdown rendering, syntax highlighting (Shiki), and specific typography styles using `@tailwindcss/typography`.
- Defines a Zod schema for Markdown frontmatter in `src/content/config.ts`.
- Implements layouts `BaseLayout.astro` and `PostLayout.astro`.
- Adds a GitHub Actions workflow `.github/workflows/deploy.yml` for automated GitHub Pages deployment.

## Capabilities

### New Capabilities
- `portfolio-home`: The main landing page showcasing the hero section, featured projects, and latest blog posts.
- `blog-system`: The static blog system including the blog list page, tag filtering, detail page with Markdown rendering and Shiki syntax highlighting, and content schema.
- `automated-deployment`: GitHub Actions workflow to deploy the static Astro site to GitHub Pages.

### Modified Capabilities


## Impact

- The entire existing React codebase will be replaced.
- Build system changes from `react-scripts` to Astro.
- Styling paradigm changes from standard CSS/SASS to Tailwind CSS.
- Automated deployment to GitHub Pages will be handled via GitHub Actions instead of the existing `gh-pages` script.
