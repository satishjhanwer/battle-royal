import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import js from "@eslint/js";

export default defineConfig([globalIgnores(["**/build"]), {
    ...js.configs.recommended,

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
