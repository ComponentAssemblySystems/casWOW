export const createContainer = ({
  option = 'ContainerFluid',
}) => {
  const createContainer = document.createElement('div');

  let mode;
  let content;
  if (option === 'ContainerFluid') {
    mode = 'container-fluid';
    content = `
      <div class="col">
        <p>The default <code>.container</code> class is a responsive, fixed-width container, meaning its max-width changes at each breakpoint.</p>
      </div>
    `;
  } else if (option === 'FixedContainerWidths') {
    mode = 'container';
    content = `
      <div class="row">
        <div class="col-4 border">Fixed columns 1-4</div>
        <div class="col-4 border">Fixed columns 5-8</div>
        <div class="col-4 border">Fixed columns 9-12</div>
      </div>
    `;
  } else if (option === 'FixedColumnWidths') {
    mode = 'container-lg';
    content = `
      <div class="row">
        <div class="col-4 border">Fixed 4 columns</div>
        <div class="col col-lg-2 border">Fill until large, then fixed 2 column</div>
        <div class="col border">Fills available space</div>
      </div>
    `;
  }

  createContainer.innerHTML = content;
  createContainer.className = [mode].join(' ');

  return createContainer;
};

// Storybook stories
export const ContainerFluid = () =>
  createContainer({
    option: 'ContainerFluid',
  });
// Storybook stories
export const FixedContainerWidths = () =>
  createContainer({
    option: 'FixedContainerWidths',
  });
export const FixedColumnWidths = () =>
  createContainer({
    option: 'FixedColumnWidths',
  });
