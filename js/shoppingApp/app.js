import api from "./api.js";
import localStorageApi from "./localStorageApi.js";

export default class app{
    constructor(){
        this.productsContainer = document.querySelector(".products-container");
        this.cartContainer = document.querySelector(".cart-items");
        this.showItems = async () => {
            const items = await new api();
            items.map(item => {
                this.productsContainer.innerHTML += `
                    <div class="box">
                        <img src="img/${item.img}">
                        <h3>${item.name}</h3>
                        <p>${item.price} kn</p>
                        <button class="addCart" id=${item.id}>add to cart</button>
                    </div>
                `
            });
            let btn = document.querySelectorAll(".addCart");
            this.addToCart(btn, items);
        }
        this.showItems();
        window.addEventListener("load", () => {
           let cart = localStorageApi.getItems();
           this.displayCart(cart);
        })

    }
    addToCart(button, items){
       button.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                const id = index + 1;
                const cart = localStorageApi.getItems();
                const product = items.find(item => item.id == id);
                if(!cart.length){
                    product.id = 1;
                    localStorage.setItem("cart", JSON.stringify([product]))
                }
                localStorageApi.setItems(product);
                const newCart = localStorageApi.getItems();
                localStorageApi.totalPrice(); 
                this.displayCart(newCart);

            });
       })
    }
    displayCart(product){
           const total = localStorageApi.totalPrice();
           const totalInCart = localStorageApi.totalInCart();
           const shoppingIcon = document.querySelector(".fa-cart-shopping");
           shoppingIcon.setAttribute("data-inCart", totalInCart); 
           const button = `<button>Checkout</button>`;
           const totalPrice = `<h4 class="total-price">Sveukupno: ${total}</h4>`;
           this.cartContainer.innerHTML = ""; 
           product.map(item => {
                this.cartContainer.innerHTML += `
                    <div class="cart-item">
                        <aside>
                            <span id=${item.id} class="fas fa-times"></span>
                            <img src="img/${item.img}">
                            <input type="number" value="${item.inCart}" min="1" max="10">
                        </aside>
                        <article class="cart-text">
                            <h4>${item.name}</h4>
                            <small>${item.price}</small>
                        </article>
                    </div>
                `   
           });
           this.cartContainer.insertAdjacentHTML("beforeend", totalPrice);
           this.cartContainer.insertAdjacentHTML("beforeend", button);
           this.deleteItem();      
    }
    deleteItem(){
        const deletebtn = document.querySelectorAll(".fa-times");
           deletebtn.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const id = e.target.id;
                    localStorageApi.deleteCart(id);
                    const newCart = localStorageApi.getItems();
                    this.displayCart(newCart);
                })
           }) 
    }
}

