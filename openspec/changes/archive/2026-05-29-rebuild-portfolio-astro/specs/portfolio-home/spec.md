## ADDED Requirements

### Requirement: Hero Section
The system MUST display a Hero Section on the Home Page (`/`) with a short greeting and introduction.

#### Scenario: User visits the home page
- **WHEN** user navigates to `/`
- **THEN** they see a short greeting (e.g. "Hi, I'm a Backend / Systems Engineer"), an introduction about core technologies, and Call-to-Action buttons (Blog, Github, LinkedIn) with hover effects.

### Requirement: Featured Projects Section
The system MUST display a Featured Projects Section on the Home Page below the Hero section.

#### Scenario: User scrolls to Featured Projects
- **WHEN** user views the Featured Projects section
- **THEN** they see a grid of project cards (2 or 3 columns), each containing the project name, description, tech stack badges, and a GitHub repo link.

### Requirement: Latest Blog Posts Section
The system MUST display a Latest Blog Posts Section on the Home Page.

#### Scenario: User scrolls to Latest Blog Posts
- **WHEN** user views the Latest Blog Posts section
- **THEN** they see the 3 most recently published blog posts from `src/content/blog/` ordered by date.
