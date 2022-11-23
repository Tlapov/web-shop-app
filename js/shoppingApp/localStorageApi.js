export default class localStorageApi {
    static getItems() {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        return cart;
    }
    static totalPrice(){
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if(cart.length){
            const cartPrice = cart.map(item => {return item.price})
            const sum = cartPrice.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            );
            return sum;
        }
        return 0;
    }
    static totalInCart(){
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if(cart.length){
            const cartInCart = cart.map(item => {return item.inCart})
            const sum = cartInCart.reduce(
                (accumulator, currentValue) => accumulator + currentValue
            );
            return sum;
        }
        return 0;
    }
    static setItems(itemToSave){
        const cart = localStorageApi.getItems();
        const existing = cart.find(item => item.id == itemToSave.id);
        if(existing){ 
                const inCart = existing.inCart++;
                const price = existing.price = itemToSave.price * existing.inCart;
                const newExisting = {...existing, inCart: inCart, price:price };
                cart.map(item => item.id == itemToSave.id ? {...newExisting} : item);
                localStorage.setItem("cart", JSON.stringify(cart));
        }else{
                const newItemToSave = {...itemToSave, inCart: 1 };
                localStorage.setItem("cart", JSON.stringify([...cart, newItemToSave]));
        }                
    }   
    
    static deleteCart(id) {
        const cart = localStorageApi.getItems();
        console.log(cart);
        const newCart = cart.filter(item => item.id != id);
        console.log(newCart)
        localStorage.setItem("cart", JSON.stringify(newCart));
    }
}