Create a new feature module for: $ARGUMENTS

Follow these steps:

1. Create folder structure:

```
   src/features/<feature-name>/
   ├── components/
   ├── hooks/
   ├── types/
   └── index.ts
```

2. Set up barrel export in `index.ts`

3. Create initial types in `types/`

4. Ensure no imports from other features

5. Run `pnpm lint` to verify
