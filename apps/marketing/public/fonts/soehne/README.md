# Söhne Font Files

Place your self-hosted Söhne `.woff2` files here. These files are **not committed** to the repository as Söhne is a commercial typeface by [Klim Type Foundry](https://klim.co.nz/retail-fonts/soehne/).

## Required files (minimum)

| File | Weight | CSS `font-weight` |
|------|--------|-------------------|
| `Soehne-Buch.woff2` | Book | `400` |
| `Soehne-Kraftig.woff2` | Kräftig (Medium) | `500` |

## Optional files

| File | Weight | CSS `font-weight` |
|------|--------|-------------------|
| `Soehne-Halbfett.woff2` | Halbfett (SemiBold) | `600` |

## Adding more weights later

1. Purchase and download the additional `.woff2` file from Klim.
2. Drop it into this directory (`apps/marketing/public/fonts/soehne/`).
3. Add a matching `@font-face` block in `apps/marketing/src/app/globals.css`:

```css
@font-face {
  font-family: "Soehne";
  src: url("/fonts/soehne/Soehne-YourWeight.woff2") format("woff2");
  font-weight: 700; /* adjust to match the weight */
  font-style: normal;
  font-display: swap;
}
```

4. Rebuild the app (`npm run build`).
