export { instance, apiKey, searchQuery, page, perPage, totalPhotos, incrementPage, resetPage, decrementTotalPhotos, fetchImages }

import axios from "axios";

    const instance = axios.create({
        baseURL: 'https://pixabay.com/api/',
        timeout: 1000,
        headers: {'Content-Type': 'application/json'}
});


    let apiKey = '37832662-f165f86f030158457b17e6716'

    let searchQuery = ''
    let page = 1
    let perPage = 50
    let totalPhotos = 0

    function getValueFromInput() {
        searchQuery = input.value
        // console.log(searchQuery)
}
const input = document.querySelector('input')

input.addEventListener('input', () => getValueFromInput())



    function incrementPage() {
        page += 1
}

    function resetPage() {
        page = 1
}

    function decrementTotalPhotos() {
        totalPhotos -= (page * perPage)
}



    async function fetchImages() {
    return await instance.get(`?key=${apiKey}&q=${searchQuery}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(res => {
            // console.log(res.data)
            photos = res.data.totalPhotos
            decrementTotalPhotos()
            return res.data
        })
        .catch(error => Notiflix.Notify.warning(error))
}