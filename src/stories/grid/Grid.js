export const createGrid = ({
  state = 'default',
}) => {
  const createGrid = document.createElement('div');

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
  } else if (state === 'FixedGridWidths') {
    mode = 'container-fluid';
    content = `
      <div class="row">
        <div class="col-4 border">1-4</div>
        <div class="col-4 border">5-8</div>
        <div class="col-4 border">9-12</div>
      </div>
    `;
  } else if (state === 'AdaptiveColumnWidths') {
    mode = 'container-fluid';
    content = `
      <div class="row">
        <div class="col-4 border">4 column width</div>
        <div class="col-lg-2 border">2 column width on large viewports</div>
        <div class="col border">fills available space</div>
      </div>
    `;
  }

  createGrid.innerHTML = content;
  createGrid.className = [mode].join(' ');

  return createGrid;
};

// Storybook stories
export const Default = () =>
  createGrid({
    state: 'Default',
  });
// Storybook stories
export const FixedGridWidths = () =>
  createGrid({
    state: 'FixedGridWidths',
  });
export const AdaptiveColumnWidths = () =>
  createGrid({
    state: 'AdaptiveColumnWidths',
  });
