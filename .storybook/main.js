/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "staticDirs": [
    '../docs',
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-designs",
    '@storybook/addon-a11y',
    '@storybook/addon-themes'
  ],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  },
  "docs": {
    defaultName: "Documentation"
  }
};
export default config;
