const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31251439-64cf22bfdeb9633faeca9a5f6';



export default class NewApi {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
   
    async fetchArticles(){

        const url = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`    

        const response = await fetch(url)
        const data = await response.json()
        this.page += 1
        return data
                       
    }

    showPage() {
        return this.page
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
   
}
