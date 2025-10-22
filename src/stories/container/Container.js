export const createContainer = ({
  state = 'default',
}) => {
  const createContainer = document.createElement('div');

  let mode;
  let content;
  if (state === 'Default') {
    mode = 'container-fluid';
    content = `
      <div class="row">
        <div class="col border">1</div>
        <div class="col border">2</div>
        <div class="col border">3</div>
        <div class="col border">4</div>
        <div class="col border">5</div>
        <div class="col border">6</div>
        <div class="col border">7</div>
        <div class="col border">8</div>
        <div class="col border">9</div>
        <div class="col border">10</div>
        <div class="col border">11</div>
        <div class="col border">12</div>
      </div>
    `;
  } else if (state === 'FixedContainerWidths') {
    mode = 'container';
    content = `
      <div class="row">
        <div class="col-4 border">1-4</div>
        <div class="col-4 border">5-8</div>
        <div class="col-4 border">9-12</div>
      </div>
    `;
  } else if (state === 'FixedColumnWidths') {
    mode = 'container-lg';
    content = `
      <div class="row">
        <div class="col-4 border">4 column width</div>
        <div class="col-lg-2 border">2 column width on large viewports</div>
        <div class="col border">fills available space</div>
      </div>
    `;
  }

  createContainer.innerHTML = content;
  createContainer.className = [mode].join(' ');

  return createContainer;
};

// Storybook stories
export const Default = () =>
  createContainer({
    state: 'Default',
  });
// Storybook stories
export const FixedContainerWidths = () =>
  createContainer({
    state: 'FixedContainerWidths',
  });
export const FixedColumnWidths = () =>
  createContainer({
    state: 'FixedColumnWidths',
  });
