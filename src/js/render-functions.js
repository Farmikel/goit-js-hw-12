import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
let lightbox;

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
        </a>
        <div class="image-info">
            <div class="info">
              <span class="info-title">Likes</span>
              <span class="stats">${likes}</span>
            </div> 
            <div class="info">
              <span class="info-title">Views</span>
              <span class="stats">${views}</span>
            </div> 
            <div class="info">
              <span class="info-title">Comments</span>
              <span class="stats">${comments}</span>
            </div> 
            <div class="info">
              <span class="info-title">Downloads</span>
              <span class="stats">${downloads}</span>
            </div> 
        </div>
      </li>
    `).join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('visually-hidden');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('visually-hidden');
}