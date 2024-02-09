'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
  photosList.innerHTML = '';

  const louder = `<div class="loader"></div>`;
  photosList.insertAdjacentHTML('beforebegin', louder);
  const loaderBox = document.querySelector('.loader');

  const markupGalleryPhotos = photos.hits
    .map(photo => {
      return `
        <li class="gallery-item">
          <a href="${photo.largeImageURL}">
          <img src="${photo.webformatURL}" alt="${photo.tags}">
          <ul class="photo-info">
            <li>
                <h3>Likes</h3>
                <p>${photo.likes}</p>
            </li>
            <li>
                <h3>Views</h3>
                <p>${photo.views}</p>
            </li>
            <li>
                <h3>Comments</h3>
                <p>${photo.comments}</p>
            </li>
            <li>
                <h3>Downloads</h3>
                <p>${photo.downloads}</p>
            </li>
          </ul>
          </a>
        </li>
      `;
    })
    .join('');

  setTimeout(() => {
    loaderBox.remove();
    if (photos.totalHits === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    photosList.insertAdjacentHTML('beforeend', markupGalleryPhotos);
    let lightbox = new SimpleLightbox('.gallery-list a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
  }, 1000);
}
