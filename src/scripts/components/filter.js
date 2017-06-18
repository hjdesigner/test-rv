const filterClick = document.querySelector('h3[data-js="open-filter"]');

function filter(){

    if( this.classList.contains('active') ){
        this.classList.remove('active');
    }else{
        this.classList.add('active');
    }

    const filters = document.querySelector('.filters');

    if( filters.classList.contains('active') ){
        filters.classList.remove('active');
    }else{
        filters.classList.add('active');
    }

}

filterClick.addEventListener('click', filter);