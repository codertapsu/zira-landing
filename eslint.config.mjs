import { createRequire } from "node:module";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const require = createRequire(import.meta.url);

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // eslint-config-next sets `react.version: "detect"`, but the bundled
    // eslint-plugin-react's detection path still calls the
    // `context.getFilename()` API that ESLint 10 removed, crashing the run.
    // Pinning the installed React version skips detection and resolves to
    // the exact same value.
    settings: {
      react: {
        version: require("react/package.json").version,
      },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
