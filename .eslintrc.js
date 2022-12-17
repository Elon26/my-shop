module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "standard"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
        tsconfigRootDir: "."
    },
    plugins: ["@typescript-eslint"],
    rules: {
        indent: ["error", 4],
        semi: [2, "always"],

        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],

        "multiline-ternary": ["off"],
        "react/display-name": "off",
        "no-undef": "off",

        quotes: ["error", "double", { allowTemplateLiterals: true }],

        "no-use-before-define": "off",

        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "warn"
    }
};
