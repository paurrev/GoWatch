// Home
const optionsHome = {
  root: document.querySelector('#section-home'),
  rootMargin: '0px',
  threshold: 0.01,
};

const loadImages = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const image = entry.target;
      const src = image.getAttribute('data-img');
      image.src = src;
      LazyLoadHome.unobserve(image);
    }
  });
};

const LazyLoadHome = new IntersectionObserver(loadImages, optionsHome);

const optionsBillboard = {
  root: null,
  rootMargin: '0px 0px 0px 0px',
  threshold: 0,
};

const loadImagesBillboard = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const image = entry.target;
      const src = image.getAttribute('data-img');
      image.src = src;
      observer.unobserve(image);
    }
  });
};

const lazyLoadBillboard = new IntersectionObserver(
  loadImagesBillboard,
  optionsBillboard
);

export { LazyLoadHome, lazyLoadBillboard };
