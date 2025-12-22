# Swolie Landing Page

A simple landing page for the Swolie iOS fitness app.

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

1. Create a GitHub repository named `swolie-landing`
2. Push your code to the repository
3. Run `npm run deploy` to deploy to GitHub Pages
4. Your site will be available at `https://[username].github.io/swolie-landing/`

### Using a Custom Domain

If you want to use a custom domain (e.g., `swolie.com`):

1. Update `vite.config.js` and change `base` to `'/'`
2. Add a `CNAME` file in the `public/` folder with your domain
3. Configure your DNS to point to GitHub Pages
