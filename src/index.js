import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from "axios";
import Notiflix from "notiflix";


import { renderImage, renderImages } from './js/renderService';
import { fetchImages} from './js/apiService';

export {clear, form, gallery, loadMore, toggleLoader}


// api

function clear() {
    document.querySelector('.gallery').textContent = ''
}

const form = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')

form.addEventListener('submit', renderImage)


// render


let loadMore = document.querySelector('.load-more')

loadMore.addEventListener('click', () => {
    fetchImages()
        .then(data => {
            renderImages(data.hits)
            Notiflix.Notify.success(`Hooray! We found ${data.hits.length} more images.`)
        })
})

function toggleLoader() {
    loadMore.classList.toggle('is-hidden')
}

// function scroll() {
//     const height = document.body.offsetHeight
//     const windowHeight = window.innerHeight
//     const scrolled = window.scrollY
//     const threshold = height - windowHeight / 4
//     const position = scrolled + windowHeight

//     if (position >= threshold) {
//         loadMore()
//     }
// }