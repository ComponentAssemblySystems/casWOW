import './Cards.css';

export const createCard = ({
  image = false,
}) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'card';

  const cardImageHTML = `<img src="https://placehold.co/150x150.png" class="card-img-top" alt="Card image">`;
  if (image) {
    // Replace card-header with image
    const cardImageElem = document.createElement('div');
    cardImageElem.innerHTML = cardImageHTML;
    wrapper.appendChild(cardImageElem.firstChild);
  } else {
    // Card header as usual
    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    const cardHeaderContent = `
      <h5 class="card-title">Card Title</h5>
    `;
    cardHeader.innerHTML = cardHeaderContent;
    wrapper.appendChild(cardHeader);
  }

  // Card body text (adjacent to cardHeader)
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const cardBodyContent = `
    <p class="card-text">
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </p>
  `;

  cardBody.innerHTML = cardBodyContent;
  wrapper.appendChild(cardBody);

  const cardFooterContent = `
    <div class="card-footer border-0">
      Footer content
    </div>
  `;

  // Card footer text (adjacent to cardBody)
  const cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer';

  cardFooter.innerHTML = cardFooterContent;
  wrapper.appendChild(cardFooter);

  return wrapper;
};

// Storybook stories
export const Default = () =>
  createCard({
    state: 'Default',
    image: false,
  });
export const CardImage = () =>
  createCard({
    state: 'Image',
    image: true,
  });
