## ADDED Requirements

### Requirement: GitHub Actions Deployment
The system MUST provide a `.github/workflows/deploy.yml` workflow file.

#### Scenario: Deploying to GitHub Pages
- **WHEN** code is pushed to the main branch
- **THEN** the GitHub Action automatically builds the Astro static site and deploys it to GitHub Pages.
