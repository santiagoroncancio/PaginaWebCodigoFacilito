import Slider from './slider';
import elements from './elements';
import Preloader from './preloader/preloader';

let titleContainer=document.querySelector("#slider-title");
let subtitleContainer=document.querySelector("#slider-subtitle");
let textContainer=document.querySelector("#slider-text");
let imageContainer=document.querySelector("#slider-image");

let textContent = document.querySelector("#slider-text-content");

let leftArrow=document.querySelector(".left-arrow");
let rightArrow=document.querySelector(".right-arrow");

let slider = new Slider({
    elements,
    animationFunc:function(element)
    {
        textContent.classList.add("hide");
        imageContainer.classList.add("hide");

        setTimeout(function()
        {
            titleContainer.innerHTML = element.title;
            subtitleContainer.innerHTML = element.subtitle;
            imageContainer.src = element.image;
            textContainer.innerHTML = element.text;
            
            textContent.classList.remove("hide");
            imageContainer.classList.remove("hide");
        },600);
    }
});

slider.play();

leftArrow.addEventListener('click',slider.prev);
rightArrow.addEventListener('click',slider.next);

const imagePaths=elements.map(el => el.image);

Preloader.preloadImages({
    images:imagePaths,
    completed:function(){
        document.querySelector(".controls").style.display="block";
    }
});