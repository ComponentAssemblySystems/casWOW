export default {
  title: 'Styleguide/Typography',
  tags: ['styleguide', 'variables', '!autodocs'],
  globals: {
    background: { value: 'light' },
  },
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};

export const Headings = () => {
  return `
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
  `;
};
export const Body = () => {
  return `
    <p>This is a paragraph of body text. It is used for regular content and provides a comfortable reading experience.</p>
    <p>Another paragraph to demonstrate body text styling in the CAS WOW design system.</p>
    <a href="#">This is a sample link</a>
    <p>
      <small>This is small text.</small>
    </p>
  `;
};
