const mobileClick = document.querySelector('.header-nav-mobile');

function navMobile(){
    
    if(this.classList.contains('active')){
        this.classList.remove('active');
    }else{
        this.classList.add('active');
    }

    const nav = document.querySelector('.header-nav');
    
    if( nav.classList.contains('active')){
        nav.classList.remove('active');
        nav.classList.add('close');
    }else{
        nav.classList.remove('close');
        nav.classList.add('active');
    }
}

mobileClick.addEventListener('click', navMobile);