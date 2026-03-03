# Livd App Pro

## Requirements

- Node.js 20+
- npm

## Local Development

**Main app:**
```bash
cd apps/app && npm ci && npm run dev
```

**Marketing app:**
```bash
cd apps/marketing && npm ci && npm run dev
```

## Environment Variables

The following environment variables are required (set in your `.env.local`):

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## Typography — Söhne (self-hosted)

Both apps use the **Söhne** typeface by [Klim Type Foundry](https://klim.co.nz/retail-fonts/soehne/) as their primary `font-sans`.

Font files are **not** committed to this repository (commercial licence). You must supply the `.woff2` files yourself:

| App | Font directory |
|-----|----------------|
| `apps/app` | `apps/app/public/fonts/soehne/` |
| `apps/marketing` | `apps/marketing/public/fonts/soehne/` |

Minimum required files in each directory:

```
Soehne-Buch.woff2      (weight 400)
Soehne-Kraftig.woff2   (weight 500)
Soehne-Halbfett.woff2  (weight 600, optional)
```

See the `README.md` inside each font directory for full details on adding more weights.

If font files are absent the apps will fall back gracefully to `ui-sans-serif / system-ui`. No build step fetches fonts from the network.

## Deploy

- Hosted on Vercel
- The `main` branch deploys to production
- Pull requests create preview deployments
