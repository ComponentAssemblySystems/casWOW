/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-designs"
  ],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  },
  "docs": {
    "autodocs": true
  }
};
export default config;
