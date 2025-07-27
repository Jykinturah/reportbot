import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
    { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
    {
        'rules': {
            'curly': ['error', 'multi-line', 'consistent'],
            'dot-location': ['error', 'property'],
            'max-nested-callbacks': ['error', { 'max': 4 }],
            'no-console': 'off',
            'no-empty-function': 'error',
            'no-inline-comments': 'error',
            'no-lonely-if': 'error',
            'no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
            'no-shadow-restricted-names': 'error',
            'no-trailing-spaces': ['error'],
            'no-var': 'error',
            'no-undef': 'off',
            'prefer-const': 'error',
            'yoda': 'error',
        },
    },
    {
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            '@stylistic/arrow-spacing': ['warn', { 'before': true, 'after': true }],
            '@stylistic/brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/comma-spacing': 'error',
            '@stylistic/comma-style': 'error',
            '@stylistic/handle-callback-err': 'off',
            '@stylistic/indent': 'error',
            '@stylistic/keyword-spacing': 'error',
            '@stylistic/max-statements-per-line': ['error', { 'max': 2 }],
            '@stylistic/no-floating-decimal': 'error',
            '@stylistic/no-multi-spaces': 'error',
            '@stylistic/no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1, 'maxBOF': 0 }],
            '@stylistic/object-curly-spacing': ['error', 'always'],
        },
    },
]);