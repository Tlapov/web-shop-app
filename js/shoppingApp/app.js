import api from "./api.js";
import localStorageApi from "./localStorageApi.js";

export default class app {
    constructor() {
        this.productsContainer = document.querySelector(".products-container");
        this.cartContainer = document.querySelector(".cart-items");
        this.showItems = async () => {
            const items = await new api();
            try{
                items.map(item => {
                    this.displayItems(item)    
                });
                let btn = document.querySelectorAll(".addCart");
                this.addToCart(btn, items);
            }catch(err){
                this.productsContainer.innerHTML = `<h3>${err}</h3>`
            }
        }
        this.showItems();
        this.searchProduct();
        window.addEventListener("load", () => {
            const cart = localStorageApi.getItems()
            this.displayCart(cart);
        })
    }
    displayItems(product){
        this.productsContainer.innerHTML += `
        <div class="box">
            <img src="img/${product.img}">
            <h3>${product.name}</h3>
            <p>${product.price} kn</p>
            <button class="addCart" id=${product.id}>add to cart</button>
        </div>
    ` 
    }
    addToCart(button, items) {
        button.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                const cart = localStorageApi.getItems();
                const elementID = index + 1;
                const product = items.find(item => item.id == elementID);
                if (!cart.length) {
                    console.log(product);
                    product.inCart = 1;
                    localStorage.setItem("cart", JSON.stringify([product]))
                } else {
                    localStorageApi.setItems(product);
                }
                localStorageApi.totalPrice();
                this.displayCart(localStorageApi.getItems());
            });
        })
    }
    displayCart(product) {
        const total = localStorageApi.totalPrice();
        const totalInCart = localStorageApi.totalInCart();
        const shoppingIcon = document.querySelector(".fa-cart-shopping");
        shoppingIcon.setAttribute("data-inCart", totalInCart);
        let button = `<button>Checkout</button>`;
        let totalPrice = `<h4 class="total-price">Sveukupno: ${total}</h4>`;
        this.cartContainer.innerHTML = "";
        if (!product.length) {
            button = "";
            totalPrice = "";
            this.cartContainer.innerHTML = `
                    <h4>Vaša košarica je prazna</h4>
                `
        }
        product.map(item => {
            this.cartContainer.innerHTML += `
                    <div class="cart-item">
                        <aside>
                            <span id=${item.id} class="fas fa-times"></span>
                            <img src="img/${item.img}">
                            <input class="changeQty" id=${item.id} type="number" value="${item.inCart}" min="1" max="10">
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
        this.changePrice();
    }
    deleteItem() {
        const deletebtn = document.querySelectorAll(".fa-times");
        deletebtn.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.target.id;
                localStorageApi.deleteCart(id);
                this.displayCart(localStorageApi.getItems());
            })
        })
    }
    async changePrice() {
        const items = await new api();
        try{
            const input = document.querySelectorAll(".changeQty")
            input.forEach(inp => {
                inp.addEventListener("change", (e) => {
                    const cart = localStorageApi.getItems();
                    const id = e.target.id;
                    const inCart = Number(e.target.value);
                    const findItem = items.find(i => i.id == id)
                    const price = inCart * findItem.price;
                    const newItem = { ...findItem, inCart: inCart, price: price };
                    const newCart = cart.map(item => item.id == id ? { ...newItem } : item);
                    localStorage.setItem("cart", JSON.stringify(newCart));
                    this.displayCart(localStorageApi.getItems());
                })
            })
        }catch(err){
            console.log(err)
        }
    }
    async searchProduct(){
        const input = document.querySelector("#search");
        const items = await new api();
        try{
            input.addEventListener("input", (e) => {
                const searchProducts = items.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
                if(e.target.value === ""){
                    this.productsContainer.innerHTML = " ";
                    this.showItems();
                }
                if(!searchProducts.length){
                    this.productsContainer.innerHTML = "<p>Nema pretraženih proizvoda </p>";
                }else{
                    searchProducts.map( it => {
                        console.log(it)
                        this.productsContainer.innerHTML = "";
                        this.displayItems(it);
                    })
                }    
            })
        }catch(err){
            console.log(err);
        }
    }
}


