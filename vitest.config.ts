import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
        provider: "c8",
        all: true,
        include: ["src/**/*.ts"],
      },
  },
})