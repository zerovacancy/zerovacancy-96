
# Font Files

This directory contains custom font files for the website.

## How to use

1. Upload your font files (woff, woff2, ttf) to this directory
2. Update the @font-face declarations in src/styles/base.css
3. Use the fonts in your components with Tailwind classes

## Supported formats

For best browser compatibility, we recommend uploading fonts in the following formats:
- .woff2 (Best compression and modern browser support)
- .woff (Good compression and wide browser support)
- .ttf (For maximum compatibility)

## Examples

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/customfont.woff2') format('woff2'),
       url('/fonts/customfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

Then register the font in tailwind.config.ts:

```ts
extend: {
  fontFamily: {
    'custom': ['CustomFont', 'sans-serif'],
  },
}
```

And use it in your components:

```tsx
<div className="font-custom">Text in custom font</div>
```
