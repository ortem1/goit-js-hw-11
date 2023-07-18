export { renderImages, renderImage }
import Notiflix from "notiflix"
import { clear, toggleLoader } from ".." 
import {searchQuery, incrementPage, resetPage, fetchImages } from "./apiService"


function renderImages(array) {
    const markup = array.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
            <article class="card">
                    <div class="img__thumb">
                        <a class="img__link" href=${largeImageURL}>
                            <img src=${webformatURL} data-source=${largeImageURL} alt="${tags}" title="${tags}">
                        </a>
                    </div>
                    <ul class="img-info__list">

                        <li class="img-info__item">
                            <p class="img-info__text">
                                <b>likes</b> ${likes}
                            </p>
                        </li>

                        <li class="img-info__item">
                            <p class="img-info__text">
                                <b>comments</b> ${comments}
                            </p>
                        </li>

                        <li class="img-info__item">
                            <p class="img-info__text">
                                <b>downloads</b> ${downloads}
                            </p>
                        </li>

                        <li class="img-info__item">
                            <p class="img-info__text">
                                <b>views</b> ${views}
                            </p>
                        </li>

                    </ul>
                </article>
                `
    })

    document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup)

    var lightbox = new SimpleLightbox('.gallery a')
    lightbox.refresh()
}



function renderImage(example) {
    example.preventDefault()

    resetPage()

    searchQuery = example.currentTarget.elements.searchQuery.value.trim()
    
    if (searchQuery === '') {
        return Notiflix.Notify.warning('Please enter more query to find!')
    }
    
    

    clear()
    
    fetchImages()
        .then(data => {
            if (data.hits.length === 0) {
                return Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
            }
            Notiflix.Notify.success(`Hooray! We found ${data.hits.length} images.`)
            renderImages(data.hits)
            incrementPage()
            toggleLoader()
        })

}