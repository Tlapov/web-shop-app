import sliderArray from "./sliderArray.js";
import app from "./shoppingApp/app.js";

const shopping = new app();

const menuToggle = document.querySelector(".fa-bars");
const cartToggle = document.querySelector(".fa-cart-shopping");
const menuLinks = document.querySelector("#showMenu");
const cartItems = document.querySelector(".cart-items")

const sliderIcons = document.querySelectorAll(".slider-icon");
const sliderContainer = document.querySelector(".slider-container");
const sliderHeader = document.querySelector(".slider-container h2");

menuToggle.addEventListener("click", () => {
    cartItems.classList.contains("active") ? cartItems.classList.remove("active") : null;
    menuLinks.classList.toggle("active");
});

cartToggle.addEventListener("click", () => {
    menuLinks.classList.contains("active") ? menuLinks.classList.remove("active") : null;
    cartItems.classList.toggle("active");  
});

const removeActive = () => {
    for(let i =0; i < sliderArray.length; i++){
        sliderIcons[i].classList.remove("active");
    }
}

sliderIcons.forEach(icon => { 
    
    icon.addEventListener("click", (e) => {
        removeActive();
        const id = e.target.id;
        e.target.classList.add("active");
        sliderContainer.style.background = `url(${sliderArray[id].img})`;
        sliderContainer.style.backgroundPosition = "center";
        sliderContainer.style.backgroundRepeat = "no-repeat";
        sliderContainer.style.backgroundSize = "cover";
        sliderHeader.innerHTML = sliderArray[id].h2;

    })
}) 