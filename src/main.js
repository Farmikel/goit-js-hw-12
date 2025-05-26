// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import { getImagesByQuery } from './js/pixabay-api.js';
// import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

// const searchForm = document.querySelector('.form');

// let currentPage = 1;
// let currentQuery = '';
// let totalHits = 0;

// searchForm.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   currentPage = 1;
//   currentQuery = event.target.elements['search-text'].value.trim();
  
//   const searchInput = event.target.elements['search-text'];
//   const query = searchInput.value.trim();

//   if (!query) {
//     iziToast.error({
//       message: "Please enter a search query",
//       position: "topRight",
//       color: "#EF4040",
//       maxWidth: "432px",
//       messageColor: "#FAFAFB",
//       iconColor: "#FFFFFF",
//       messageSize: "16px",
//     });
//     return;
//   }

//   try {
//     showLoader();
//     clearGallery();
    
//     const data = await getImagesByQuery(currentQuery, currentPage);
//     totalHits = data.totalHits;
    
//     if (data.hits.length === 0) {
//       iziToast.error({
//         message: "Sorry, there are no images matching your search query. Please try again!",
//         position: "topRight",
//         color: "#EF4040",
//         maxWidth: "432px",
//         messageColor: "#FAFAFB",
//         iconColor: "#FFFFFF",
//         messageSize: "16px",
//       });
//       return;
//     }
//     else {
//       createGallery(data.hits);
      
//       if (totalHits > 15)
//         showLoadMoreButton();
//     }

//     createGallery(data.hits);
//   } catch (error) {
//     iziToast.error({
//       message: "Something went wrong. Please try again later!",
//       position: "topRight",
//       color: "#EF4040",
//       maxWidth: "432px",
//       messageColor: "#FAFAFB",
//       iconColor: "#FFFFFF",
//       messageSize: "16px",
//     });
//   } finally {
//     hideLoader();
//     searchForm.reset();
//   }
// });

// document.querySelector('.load-more').addEventListener('click', async () => {
//   try {
//     const data = await getImagesByQuery(currentQuery, currentPage);

//     showLoader();
//     currentPage += 1;
//     createGallery(data.hits);
//     smoothScroll();
//     checkLoadMoreVisibility(data);
//   } catch (error) {
//     iziToast.error({
//       message: "Something went wrong. Please try again later!",
//       position: "topRight",
//       color: "#EF4040",
//       maxWidth: "432px",
//       messageColor: "#FAFAFB",
//       iconColor: "#FFFFFF",
//       messageSize: "16px",
//     });
//   } finally {
//     hideLoader();
//   }
// });

// function checkLoadMoreVisibility(data) {
//   const totalLoaded = currentPage * 15;
//   if (totalLoaded >= totalHits) {
//     hideLoadMoreButton();
//     iziToast.info({
//       message: "We're sorry, but you've reached the end of search results.",
//       position: 'topRight',
//       color: "#EF4040",
//       maxWidth: "432px",
//       messageColor: "#FAFAFB",
//       iconColor: "#FFFFFF",
//       messageSize: "16px",
//     });
//   } else {
//     // showLoadMoreButton();
//   }
// }

// function smoothScroll() {
//   const cardHeight = galleryContainer.firstElementChild.getBoundingClientRect().height;
  
//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth'
//   });
// }

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  const query = event.target.elements['search-text'].value.trim();
  if (!query) {
    iziToast.error({
      message: 'Please enter a search query',
      position: 'topRight',
      color: "#EF4040",
      maxWidth: "432px",
      messageColor: "#FAFAFB",
      iconColor: "#FFFFFF",
      messageSize: "16px"
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        color: "#EF4040",
        maxWidth: "432px",
        messageColor: "#FAFAFB",
        iconColor: "#FFFFFF",
        messageSize: "16px"
      });
      return;
    }

    createGallery(data.hits);

    if (currentPage * 15 < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight'
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
      color: "#EF4040",
      maxWidth: "432px",
      messageColor: "#FAFAFB",
      iconColor: "#FFFFFF",
      messageSize: "16px"
    });
  } finally {
    hideLoader();
    searchForm.reset();
  }
}

async function onLoadMore() {
  if (currentPage * 15 >= totalHits) return;

  currentPage += 1;
  hideLoadMoreButton();

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });

    if (currentPage * 15 < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight'
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
      color: "#EF4040",
      maxWidth: "432px",
      messageColor: "#FAFAFB",
      iconColor: "#FFFFFF",
      messageSize: "16px"
    });
  } finally {
    hideLoader();
  }
}