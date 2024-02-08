'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const photosList = document.querySelector('ul');

form.addEventListener('submit', searchImages);

function searchImages(event) {
  event.preventDefault();
  const inputContent = event.currentTarget.text.value.trim();
  if (inputContent === '') {
    iziToast.info({
      title: 'Attention',
      message: 'Please enter a request',
    });
    return;
  }
  console.log(inputContent);

  const searchParams = new URLSearchParams({
    key: '42277642-5b5e0c3e2383e813180f7c1aa',
    q: inputContent,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(fetchThen)
    .catch(error => {
      console.log(error);
    });
}

function fetchThen(photos) {
  if (photos.totalHits == 0) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }
  console.log(photos);

  const markup = photos.hits
    .map(photo => {
      return `
          <li>
            <img src=${photo.webformatURL} alt="${photo.tags}">
          </li>
      `;
    })
    .join('');
  photosList.insertAdjacentHTML('beforeend', markup);
}
