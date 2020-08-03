//feature1
import React from 'react';
import data from './data.json'
import Products from './Components/Products';
import Filter from './Components/Filter';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            products: data.products,
            size: "",
            sort: ""
        };
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
        this.setState((state) => ({
            sort,
            products: this
                .state
                .products
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
        }));

    }
    render() {
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
                            <Products products={this.state.products}/>
                        </div>
                        <div className="sidebar">Cart Items</div>
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
