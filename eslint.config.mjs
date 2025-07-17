import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["**/build"]), {
    extends: compat.extends("eslint:recommended"),

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.mocha,
            Iterator: true,
            $Keys: true,
        },

        parser: babelParser,
        ecmaVersion: 12,
        sourceType: "module",
    },

    rules: {
        camelcase: "off",
        "consistent-return": "off",
        curly: "off",
        "linebreak-style": ["error", "unix"],
        "max-len": ["error", 120, 2],
    },
}]);