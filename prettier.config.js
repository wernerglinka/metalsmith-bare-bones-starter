export default {
  trailingComma: 'none',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  bracketSpacing: true, // Adds spaces inside object literals: { foo: 'bar' }
  arrowParens: 'always',
  printWidth: 120,
  bracketSameLine: false, // Ensures closing brackets are on a new line in multiline objects/arrays

  // Configure how to process different file types
  overrides: [
    {
      files: '*.njk',
      options: {
        parser: 'html',
        htmlWhitespaceSensitivity: 'css' // Respects CSS display property
      }
    },
    {
      files: '*.css',
      options: {
        tabWidth: 2,
        printWidth: 100
      }
    }
  ]
};
