# Tailwind mapping

If Research later adopts Tailwind, map the CSS variables rather than hardcoding values.

```ts
extend: {
  colors: {
    tamver: {
      black: 'var(--tamver-black)',
      olive: 'var(--tamver-olive-black)',
      paper: 'var(--tamver-paper)',
      ivory: 'var(--tamver-white)',
      amber: 'var(--tamver-amber)',
      alert: 'var(--tamver-alert)'
    }
  },
  fontFamily: {
    tamver: ['var(--tamver-body)'],
    display: ['var(--tamver-display)']
  },
  borderRadius: { tamver: '0px' }
}
```
