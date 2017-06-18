const endpoint = 'http://www.raphaelfabeni.com.br/rv/data.json';
const ulReleases = document.querySelector('.releases ul');
const ulBestSellers = document.querySelector('.best-sellers ul');
const labelFilter = document.querySelectorAll('.filters-inputs label[data-js="label-filter"]');
const btnAll = document.querySelector('button[data-js="all"]');

let prodReleases = [];
let prodBestSellers = [];


function viewAll(){
    fetch(endpoint)
        .then(function(response){
            response.json().then(function(data){
                prodReleases = data.releases;
                prodBestSellers = data["best-sellers"];

                
                
                const viewReleases = prodReleases.map(function(prod) {
                    return `
                        <li>
                            <figure class="showcase-image">
                                <a href="#"><img src="${prod.image}" alt="${prod.title}"></a>
                            </figure>
                            <div class="showcase-customize">
                                Personalise
                            </div>
                            <div class="showcase-title">
                                <a href="#">${prod.title}</a>
                            </div>
                            <div class="showcase-category">
                                ${prod.category}
                            </div>
                            <div class="showcase-price">
                                R$ ${parseFloat(prod.price).toFixed(2).replace('.',',')}
                            </div>
                            <div class="showcase-portion">
                                ou ${prod.installments.number}x de ${parseFloat(prod.installments.value).toFixed(2)} sem juros
                            </div>
                            <div class="showcase-btn">
                                <button class="btn btn-purchase">Comprar</button>
                            </div>
                        </li>
                    `
                }).join('');
                
                ulReleases.innerHTML = viewReleases;


                const viewBestSellers = prodBestSellers.map(function(prod) {
                    return `
                        <li>
                            <figure class="showcase-image">
                                <a href="#"><img src="${prod.image}" alt="${prod.title}"></a>
                            </figure>
                            <div class="showcase-customize">
                                Personalise
                            </div>
                            <div class="showcase-title">
                                <a href="#">${prod.title}</a>
                            </div>
                            <div class="showcase-category">
                                ${prod.category}
                            </div>
                            <div class="showcase-price">
                                R$ ${parseFloat(prod.price).toFixed(2)}
                            </div>
                            <div class="showcase-portion">
                                ou ${prod.installments.number}x de ${parseFloat(prod.installments.value).toFixed(2)} sem juros
                            </div>
                            <div class="showcase-btn">
                                <button class="btn btn-purchase">Comprar</button>
                            </div>
                        </li>
                    `
                }).join('');
                
                ulBestSellers.innerHTML = viewBestSellers;
            });
        })
        .catch(function(err){
        console.error('Failed retrieving information', err);
    });
    document.querySelector('.releases .controls-showcase').classList.remove('no-carousel');
    document.querySelector('.best-sellers .controls-showcase').classList.remove('no-carousel');
}

function viewFilter(){
    
    document.querySelector('.releases .controls-showcase').classList.add('no-carousel');
    document.querySelector('.best-sellers .controls-showcase').classList.add('no-carousel');

    const idFilter = this.attributes.for.value.replace('-', ' ');

        let poBest = prodBestSellers.filter(function(prodFilter) {
            return prodFilter.category == idFilter;            
        });

        let poRele = prodReleases.filter(function(prodFilterRele) {
            return prodFilterRele.category == idFilter;
        });

        if( poBest.length >= 1){
            const viewBestSellers = poBest.map(function(prod) {
                return `
                    <li>
                        <figure class="showcase-image">
                            <a href="#"><img src="${prod.image}" alt="${prod.title}"></a>
                        </figure>
                        <div class="showcase-customize">
                            Personalise
                        </div>
                        <div class="showcase-title">
                            <a href="#">${prod.title}</a>
                        </div>
                        <div class="showcase-category">
                            ${prod.category}
                        </div>
                        <div class="showcase-price">
                            R$ ${prod.price}
                        </div>
                        <div class="showcase-portion">
                            ou ${prod.installments.number}x de ${prod.installments.value} sem juros
                        </div>
                        <div class="showcase-btn">
                            <button class="btn btn-purchase">Comprar</button>
                        </div>
                    </li>
                `
            }).join('');
            ulBestSellers.innerHTML = viewBestSellers;            
        }else{
            ulBestSellers.innerHTML = '<p class="no-fillter">Desculpe, fitro não encontrado :(</p>'
        }
        if( poRele.length >= 1){
            const viewReleases = poRele.map(function(prod) {
                return `
                    <li>
                        <figure class="showcase-image">
                            <a href="#"><img src="${prod.image}" alt="${prod.title}"></a>
                        </figure>
                        <div class="showcase-customize">
                            Personalise
                        </div>
                        <div class="showcase-title">
                            <a href="#">${prod.title}</a>
                        </div>
                        <div class="showcase-category">
                            ${prod.category}
                        </div>
                        <div class="showcase-price">
                            R$ ${prod.price}
                        </div>
                        <div class="showcase-portion">
                            ou ${prod.installments.number}x de ${prod.installments.value} sem juros
                        </div>
                        <div class="showcase-btn">
                            <button class="btn btn-purchase">Comprar</button>
                        </div>
                    </li>
                `
            }).join('');
            
            ulReleases.innerHTML = viewReleases;
        }else{
            ulReleases.innerHTML = '<p class="no-filter">Desculpe, filtro não encontrado :(</p>'
        }

        
        


}

labelFilter.forEach(value => value.addEventListener('click', viewFilter));

btnAll.addEventListener('click', viewAll);

viewAll();