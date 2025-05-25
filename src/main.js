import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

const searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const searchInput = event.target.elements['search-text'];
  const query = searchInput.value.trim();

  if (!query) {
    iziToast.error({
      message: "Please enter a search query",
      position: "topRight",
      color: "#EF4040",
      maxWidth: "432px",
      messageColor: "#FAFAFB",
      iconColor: "#FFFFFF",
      messageSize: "16px",
    });
    return;
  }

  try {
    showLoader();
    clearGallery();
    
    const data = await getImagesByQuery(query);
    
    if (data.hits.length === 0) {
      iziToast.error({
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: "topRight",
        color: "#EF4040",
        maxWidth: "432px",
        messageColor: "#FAFAFB",
        iconColor: "#FFFFFF",
        messageSize: "16px",
      });
      return;
    }

    createGallery(data.hits);
  } catch (error) {
    iziToast.error({
      message: "Something went wrong. Please try again later!",
      position: "topRight",
      color: "#EF4040",
      maxWidth: "432px",
      messageColor: "#FAFAFB",
      iconColor: "#FFFFFF",
      messageSize: "16px",
    });
  } finally {
    hideLoader();
    searchForm.reset();
  }
});