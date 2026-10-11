# Swolie Landing Page

A simple landing page for the Swolie fitness app (iOS and Android).

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

### Android App Links

`public/.well-known/assetlinks.json` associates `swolie.com` with the Play-signed
`com.koahzee.swolie` app. Its SHA-256 fingerprint comes from Play Console's
App signing → Digital Asset Links JSON, not the upload certificate. The Android
manifest limits matching links to `/share` paths. When changing Play signing
keys, refresh this file using the certificates needed by distributed builds.

Vite copies this file into `dist/.well-known/assetlinks.json`. Keep
`public/.nojekyll` and the deploy command's `--dotfiles` option so GitHub Pages
serves it. After deploying, verify that
`https://swolie.com/.well-known/assetlinks.json` returns HTTP 200 with an
`application/json` content type and no redirect.
