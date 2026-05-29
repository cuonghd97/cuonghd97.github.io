## ADDED Requirements

### Requirement: Blog Content Schema
The system MUST enforce a Zod schema for Markdown blog posts in `src/content/config.ts`.

#### Scenario: Validating a new blog post
- **WHEN** a markdown file in `src/content/blog/` is processed
- **THEN** the system validates it against the schema requiring `title`, `description`, `pubDate`, `tags`, and `draft` frontmatter fields.

### Requirement: Blog List Page
The system MUST provide a Blog List Page at `/blog` displaying all blog posts.

#### Scenario: User views the blog list
- **WHEN** user navigates to `/blog`
- **THEN** they see a vertical list or grid of all non-draft blog posts, with publication date, title, description, and tags for each post.

#### Scenario: User filters posts by tag
- **WHEN** user selects a tag on the `/blog` page
- **THEN** the list is filtered to display only posts containing that tag.

### Requirement: Blog Detail Page
The system MUST render individual blog posts at `/blog/[slug]` using `PostLayout.astro`.

#### Scenario: User reads a blog post
- **WHEN** user navigates to a specific blog post (e.g. `/blog/my-post`)
- **THEN** they see the post title, date, estimated reading time, tags at the top, followed by the markdown content rendered using Tailwind Typography (`prose prose-invert ...`).

### Requirement: Syntax Highlighting
The system MUST provide syntax highlighting for code blocks in blog posts.

#### Scenario: Rendering code blocks
- **WHEN** a markdown file containing code blocks is rendered
- **THEN** the code is highlighted using Astro's built-in Shiki integration.
