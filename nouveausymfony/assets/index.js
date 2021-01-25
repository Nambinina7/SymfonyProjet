import './styles/index.css';
import './js/Index/App';
import './js/App';
import './js/components/Lists';
import './js/components/TestForm'

const navbar = document.querySelector('.navbar');
const home = document.querySelector('.home');
const monsite = document.querySelector('.monsite');

window.onscroll = () => {
    if (window.scrollY > 0) {
        navbar.classList.add('nav-active');
        home.classList.add('home1');
        monsite.classList.add('monsite1');
    } else {
        navbar.classList.remove('nav-active');
        home.classList.remove('home1');
        monsite.classList.remove('monsite1');
    }
};

