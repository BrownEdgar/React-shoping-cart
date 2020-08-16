//feature1
import React from 'react';
import data from './data.json'
import Products from './Components/Products';
import Filter from './Components/Filter';
import Cart from './Components/Cart';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
			products: data.products,
			cartItems: JSON.parse(localStorage.getItem('cartItems')) ?
				JSON.parse(localStorage.getItem('cartItems')) : [],
            size: "",
            sort: ""
        };
	}
	createOrder = (order) =>{
		alert("to save order for " + order.name )
	}
	removeFromCart = (product)=>{
		const cartItems = this.state.cartItems.slice();
		let newCartItems =  cartItems.filter(item => item._id !== product._id)
		this.setState({ cartItems: newCartItems});
		localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
 	}
	addToCard = (product) =>{
		const cartItems = this.state.cartItems.slice();
		let alredyInCard = false;
		cartItems.forEach((item =>{
			if (item._id === product._id) {
				item.count++;
				alredyInCard = true;
			}
		}))
		if (!alredyInCard) {
			cartItems.push({...product, count:1})
		}
		this.setState({ cartItems });
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}

    filterProducts = (event) => {
        if (event.target.value === "") {
            this.setState({size: event.target.value, products: data.products});
        } else {
            this.setState({
                size: event.target.value,
                products: data
                    .products
                    .filter((product) => {
                        return product
                            .availableSizes
                            .indexOf(event.target.value) >= 0
                    })
            });
        }
    }
    sortProducts = (event) => {
		console.log(event.target.value);
        let sort = event.target.value;
        this.setState({
			sort: event.target.value,
            products: this.state.products
                .slice()
                .sort((a, b) => (sort === "lowest"
                    ? a.price > b.price
                        ? 1
                        : -1
                    : sort === "highest"
                        ? a.price < b.price
                            ? 1
                            : -1
                        : a._id > b._id
                            ? 1
							: -1
				),
			)
        });
    }
    render() {
		console.log('this.state.cartItems', this.state.cartItems)
        return (
            <div className="grid-container">
                <header>
                    <a href="/">React Shopping Cart</a>
                </header>
                <main>
                    <div className="content">
                        <div className="main">
                            <Filter
                                count={this.state.products.length}
                                size={this.state.size}
                                sort={this.state.sort}
                                filterProducts={this.filterProducts}
                                sortProducts={this.sortProducts}></Filter>
                            <Products
							 products={this.state.products}
								addToCard={this.addToCard}
							 />
                        </div>
                        <div className="sidebar">
							<Cart 
							cartItems={this.state.cartItems}
							removeFromCart={this.removeFromCart}
							createOrder={this.createOrder}
							
							/>
						</div>
                    </div>
                </main>
                <footer>
                    All My ooter
                </footer>
            </div>
        );
    }
}

export default App;
