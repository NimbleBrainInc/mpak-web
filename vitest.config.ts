import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Scope to src/ so a nested worktree or checkout can't get collected and
    // report the same suite twice.
    include: ['src/**/*.test.ts'],
  },
});
