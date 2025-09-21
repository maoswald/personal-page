# Aurora Dark Personal Site

Production-ready Hugo site showcasing a dual identity across IT transformation and sailing adventures. The project ships with a custom theme (`themes/aurora-dark`), EN/DE localisation, GDPR-aware analytics consent, and a GitHub Actions pipeline for GitHub Pages deployment.

## Requirements
- Hugo Extended ≥ 0.118
- Node.js ≥ 18

## Getting Started
```bash
npm install
npm run dev
```

The development server runs at `http://localhost:1313`. Content changes, SCSS, and JS modules rebuild automatically.

## Key Features
- Premium dark UI with self-hosted Inter and Source Serif Pro fonts, Hugo Pipes SCSS compilation, and autoprefixed CSS.
- Split hero, sticky navigation, accessible focus management, skip links, and keyboard-friendly controls meeting WCAG 2.1 AA targets.
- Multi-language support (EN/DE) with translated menus, legal pages, and UI strings.
- Client-side search powered by Elasticlunr indexing posts, projects, and travel entries.
- Interactive Leaflet travel map with filters, marker clustering, haversine-based nearby recommendations, and noscript fallbacks.
- Affiliate shortcode that injects disclosure copy and sponsored link attributes automatically.
- Consent-managed analytics with Plausible by default and optional GA4 configuration.
- GitHub Actions workflow deploying `public/` to `gh-pages` on pushes to `main`.

## NPM Scripts
- `npm run dev` – start Hugo with live reload.
- `npm run build` – production build with minification.
- `npm run lint` – run ESLint and Stylelint.
- `npm run format` – apply Prettier formatting.
- `npm run test` – execute Node.js unit tests (haversine utility).
- `npm run lighthouse` – run Lighthouse using `tests/lighthouse.config.json` (requires site running locally).

## Configuration
Site configuration lives in `config/_default/` with environment overrides in `config/production/`. Update values such as `baseURL`, social links, analytics provider, and hero taglines to match your production setup.

## Content Model
- `content/blog`: long-form posts (tags, categories, cover image, optional affiliate disclosure flag).
- `content/projects`: project cards with repo/demo links and tech stacks.
- `content/travel`: map-enabled travel logs with GPS coordinates and metadata.
- Additional sections: Now, Services, Speaking, Gallery, Uses, Contact, Impressum, Datenschutzerklärung, Search.

Archetypes are defined under `archetypes/` to streamline new content creation.

## Extending
- Add new partials and SCSS modules under `themes/aurora-dark/`.
- Use `{{< gallery >}}`, `{{< map >}}`, `{{< affiliate >}}`, and `{{< youtube-lite >}}` shortcodes for rich content.
- Update the travel map by adding new `content/travel` entries or supplementing `data/travel.yaml`.
- To introduce new taxonomies, create configuration files within `config/_default/` and corresponding section templates.

## Deployment
The included GitHub Actions workflow installs dependencies, builds the site with `hugo --minify --gc`, and publishes to the `gh-pages` branch. Enable GitHub Pages from that branch in repository settings.

### Deploy on Pull Request approval
Pull request reviews with an **Approved** state automatically trigger the deployment workflow. The action checks out the head commit of the approved PR, builds the site, and publishes it to `gh-pages/previews/pr-<PR_NUMBER>` while keeping the production build at the repository root. That makes it possible to share a live preview before merging. Once the PR is merged, the regular push-to-`main` deployment overwrites the root of `gh-pages` with the production build and removes the preview folder for that PR.

If your repository uses branch protection or a different default branch, adjust the `if` condition in `.github/workflows/deploy.yml` so that only approved reviews targeting your release branch trigger the preview publication.
