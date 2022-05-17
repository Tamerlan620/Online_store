const cartBtn = document.querySelector(".cart-btn") 
const closeCartBtn = document.querySelector(".close-cart")
const clearCartBtn = document.querySelector(".clear-cart")
const cartDOM = document.querySelector(".cart")
const cartOverlay = document.querySelector(".cart-overlay")
const cartItems = document.querySelector(".cart-items")
const cartTotal = document.querySelector(".cart-total")
const cartContent = document.querySelector(".cart-content")
const productsDOM = document.querySelector(".productss")

//cart
let cart = [];
//buttons
let buttonsDOM = [];

// getting products
    class Products {
        async getProduct(){
            try {
                let result = await fetch('products.json');
                let data = await result.json();
                let products = data.items;
                products = products.map(item =>{
                    const {title,price,clas} = item.fields;
                    // const clas = item.fields.claslar;
                    const {id} = item.sys;
                    const image = item.fields.image.fields.file.url;
                return {title,price,clas,id,image};
                
                });
                
                return products;
                
            } catch (error) {
                console.log(error);
            }
        }
    }

//display products

class UI {
    displayProducts(products){

let result = '';
        products.forEach(product => {
        result += '<div class="all-products '+product.clas+' col-lg-3 col-md-4 col-sm-2 col-12"><article class="productes"><div class="kolge product-img w-100 col-12"><img class="col-md-11 col-9 ml-2" src='+product.image+' alt="product"><button class="position-absolute add_to_card c-pointer font-size-14 no_border" data-id ='+product.id+'>add to card<i class="fas fa-cart-plus ml-2"></i></button><button class="position-absolute like c-pointer font-size-14 no_border">Like<i class="fas fa-heart ml-4"></i></button></div><div class="texts text-center mt-3"><a href=""><h6>'+product.title+'</h6></a><h6 class="price font-size-18">$'+product.price+'</h6></div></article></div>'
        });
productsDOM.innerHTML = result;

        var $grid = $(".productss").isotope({
            itemSelector:".all-products",
            layoutMode:"fitRows"
        })

        $(".button-group").on("click","button",function(){
            $(".buttonlar").removeClass("border-botom")
            $(this).addClass("border-botom")


            var filterValue = $(this).attr("data-filter");
            $grid.isotope({filter:filterValue})
        })
    }
    getBagButtons(){
        const btns = [...document.querySelectorAll('.add_to_card')];
        buttonsDOM =btns;
        btns.forEach(button =>{
            let id = button.dataset.id;
            let inCart = cart.find(item =>item.id === id);
            if(inCart){
                button.innerText = "In cart"
                button.disabled = true
            }
            
                button.addEventListener("click",(event)=>{
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                    //get product from products
                    let cartItem = {...Storage.getProduct(id),amount:1}
                    //add products to the cart
                    cart = [ ...cart,cartItem];                    
                    //save cart in localStorage
                    Storage.saveCart(cart);
                    //set cart values
                    this.setCartValues(cart);
                    //display cart item
                    this.addCartItem(cartItem);
                    //show the cart
                    
                })
            
        })
    }
    setCartValues(cart){
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item=>{
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
        cartItems.innerText =itemsTotal;
        console.log(cartTotal,cartItems);
    }
    addCartItem(item){
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = '<img src='+item.image+' alt="product"><div><h4>'+item.title+'</h4><h5>$'+item.price+'</h5><span class="remove-item" data-id ='+item.id+'>remove</span></div><div class = "asagi_yuxari"><i class="fas fa-chevron-up" data-id ='+item.id+'></i><p class="item-amount">'+item.amount+'</p><i class="fas fa-chevron-down" data-id ='+item.id+'></i></div>'
        cartContent.appendChild(div);
        
    }
    setupAPP(){
        cart = Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart);
        
    }
    populateCart(cart){
        cart.forEach(item =>this.addCartItem(item))
    }
    cartLogic(){
        clearCartBtn.addEventListener("click",()=>{
            this.clearCart()
        })
        cartContent.addEventListener('click',event=>{
           if(event.target.classList.contains('remove-item')){
               let removeItem =event.target;
               let id = removeItem.dataset.id;
               cartContent.removeChild
               (removeItem.parentElement.parentElement);
               this.removeItem(id);
           } 
           else if(event.target.classList.contains('fa-chevron-up')){
            let addAmount = event.target;
            let id = addAmount.dataset.id;
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount = tempItem.amount + 1;
            Storage.saveCart(cart);
            this.setCartValues(cart);
            addAmount.nextElementSibling.innerText = tempItem.amount;
           }
           else if(event.target.classList.contains('fa-chevron-down')){
            let lowerAmount = event.target;
            let id = lowerAmount.dataset.id;
            let tempItem = cart.find(item => item.id === id);
            tempItem.amount = tempItem.amount - 1;
            if(tempItem.amount > 0){
                Storage.saveCart(cart);
                this.setCartValues(cart);
                lowerAmount.previousElementSibling.innerText =tempItem.amount
            }
            else{
                cartContent.removeChild(lowerAmount.parentElement.parentElement);
                this.removeItem(id)
            }
            
           }
        });
    }
    clearCart(){
        let cartItems = cart.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));

        while(cartContent.children.length>0){
            cartContent.removeChild(cartContent.children[0])
        }
    }
    removeItem(id){
        cart = cart.filter(item => item.id !==id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = "add to cart     <i class = 'fas fa-shopping-cart'></i>";
        
    }
    getSingleButton(id){
        return buttonsDOM.find(button =>button.dataset.id === id)
    }
}

//local storage

class Storage{
static saveProduct(products){
    localStorage.setItem("products",JSON.stringify(products))
}
static getProduct(id){
    let products = JSON.parse(localStorage.getItem('products'))
return products.find(product=> product.id === id)
}
static saveCart(){
    localStorage.setItem('cart',JSON.stringify(cart))
}
static getCart(){
    return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
}
}


document.addEventListener("DOMContentLoaded",()=>{
    const ui = new UI()
    const products = new Products()
    //setup app
    ui.setupAPP()
    //get all products
    products.getProduct().then(products=> {ui.displayProducts(products)
    Storage.saveProduct(products);
}).then(()=>{
    ui.getBagButtons();
    ui.cartLogic()
})
})





