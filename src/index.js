import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { axios } from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewApi from "./api";

const getEl = selector => document.querySelector(selector)

getEl('.search-form').addEventListener('submit', onSubmit)
getEl('.load-more').addEventListener('click', onMore)

let cardMarkup = ''
const newApi = new NewApi()
const modalWindow = new SimpleLightbox('.gallery a');
modalWindow.on('show.simplelightbox', function () {});


function onSubmit  (e) {
        e.preventDefault()

        newApi.resetPage()
        newApi.query = getEl('input').value
        if (getEl('input').value === ''|| getEl('input').value === " ") {
          return 
        }

        newApi.fetchArticles()
          .then(data =>{ if (data.hits.length === 0) {
            throw new Error() 
          } else {
             
              Notify.success(`Hooray! We found ${data.totalHits} images.`)
              getEl('.gallery').innerHTML = ''
              drawMarkup(data.hits) 
              addMarkup(cardMarkup)  
              showBtn(data)
                                 
          }})
          .catch(onError)         
          
               
    }

function onMore() {
        newApi.fetchArticles()
          .then(data => 
            drawMarkup(data.hits),
            addMarkup(cardMarkup),                        
          )              
}    

function onError(err) {   
           console.log(err)  
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
       
function drawMarkup(arr) {
        cardMarkup = arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `<div class="photo-card">
        <a class="gallery__item" href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <b>${likes}</b>
          </p>
          <p class="info-item">
            <b>Views</b>
            <b>${views}</b>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <b>${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <b>${downloads}</b>
          </p>
        </div>
      </div>`
        }).join('')        
}    

function addMarkup(markup) {
    getEl('.gallery').insertAdjacentHTML('beforeend', markup)
}

function showBtn(params) {
  if (params.totalHits > 40 * newApi.showPage()) {
    getEl('.load-more').classList.add('active') 
  } else {
    Notify.failure("We're sorry, but you've reached the end of search results.")
           getEl('load-more').classList.remove('active')
  }
}


