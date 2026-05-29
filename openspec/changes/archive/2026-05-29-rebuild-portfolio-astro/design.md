## Context

The current project is a Create React App, which implies a heavier JavaScript bundle and client-side rendering approach not ideally suited for a static portfolio and blog. To improve performance, SEO, and maintainability, the project will be completely rebuilt using Astro—a modern web framework designed specifically for content-rich websites. The styling will transition from standard CSS/SASS to Tailwind CSS to ensure a scalable and utility-first design approach.

## Goals / Non-Goals

**Goals:**
- Completely replace the React-based architecture with Astro.
- Build a responsive, single-page portfolio layout for the home page.
- Implement a robust static blog system using Markdown and Astro's Content Collections.
- Utilize Tailwind CSS for styling, specifically adopting `@tailwindcss/typography` for blog content.
- Ensure automated deployment to GitHub Pages via GitHub Actions.

**Non-Goals:**
- Retain the existing React components or architecture.
- Add complex backend integrations (e.g., databases); content will be strictly static Markdown.
- Support dynamic user-generated content (e.g., comments).

## Decisions

1. **Framework Choice: Astro**
   - **Rationale**: Astro is optimized for content-driven sites and ships zero JavaScript by default, resulting in vastly superior performance metrics and SEO out-of-the-box compared to a CRA SPA.
   - **Alternatives Considered**: Next.js (too heavy for a simple static site) or raw HTML/CSS (lacks developer experience and reusable components).

2. **Styling: Tailwind CSS**
   - **Rationale**: Tailwind provides utility classes that speed up UI development and ensures consistent styling without context switching between HTML and CSS files. The `@tailwindcss/typography` plugin perfectly styles rendered Markdown content.
   - **Alternatives Considered**: SCSS/SASS (current approach, can lead to bloated stylesheets) or CSS Modules.

3. **Content Management: Astro Content Collections (with Zod)**
   - **Rationale**: Astro provides built-in Markdown support and `Zod` validation for frontmatter schema, guaranteeing type safety and content consistency for the blog posts.

4. **Syntax Highlighting: Shiki**
   - **Rationale**: Astro has built-in support for Shiki, providing excellent, visually appealing syntax highlighting for code blocks in the blog posts.

## Risks / Trade-offs

- **Risk: Total Rewrite**: The entire existing codebase will be discarded, which may introduce short-term regressions if any custom React logic was heavily relied upon.
  - **Mitigation**: The new scope is well-defined as a static portfolio and blog, which minimizes the need for complex state management.
- **Risk: Markdown Styling Customization**: Styling raw markdown output can sometimes be rigid.
  - **Mitigation**: The use of `@tailwindcss/typography` (the `prose` classes) provides a highly customizable and polished baseline for markdown content.
