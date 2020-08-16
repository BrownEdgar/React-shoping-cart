import React, { Component } from 'react'
import formatCurrency from '../util'
export default class Cart extends Component {
	constructor(props){
		super(props);
		this.state = {
			name:"",
			email:"",
			address:"",
			showCheckOut:false
		}
	}
	handleInput = (e) =>{
		this.setState({ [e.target.name]: e.target.value });
	}
	createOrder = (e) => {
		e.preventDefault();
		const order = {
			name: this.state.name,
			email: this.state.email,
			address: this.state.address,
			cartItems: this.props.cartItems,
		}
		this.props.createOrder(order);
	}

	render() {
		const {cartItems} = this.props; 
		console.log('cartItems.length', cartItems.length)
		return (
			<div>
				{cartItems.length === 0 
				? <div className="cart cart-header">Cart is empty</div>
					: <div className="cart cart-header">You have {cartItems.length} in the cart</div>
				}
				<div>
					<div className="cart">
						<ul className="cart-items">
							{cartItems.map(item => {
							return 	<li key={item._id}>
									<div>
										<img src={item.image} alt={item.title}/>
									</div>
									<div>
										<div>{item.title}</div>
										<div className="right">
										{formatCurrency(item.price)} x {item.count}{" "}
										<button 
										className="button"
										onClick={() => this.props.removeFromCart(item)}>Remove</button>
										</div>						
									</div>
								</li>
							})}
						</ul>
					</div>
					{cartItems.length !== 0 && (
						<div className="cart">
							<div className="total">
								Total:{" "}
								<div>{formatCurrency(cartItems.reduce((a, b) => a + (b.price * b.count), 0))}</div>
							</div>
							<button className="button primary"
							onClick={() => {this.setState({showCheckOut:true})}}>Proceed</button>
						</div>
					)}
					{this.state.showCheckOut && (
						<div className="cart">
							<form action="#" onSubmit={this.createOrder}>
								<ul className="form-container">
									<li>
										<label>Email</label>
										<input
										 name="email"
										 type="email"
										 onChange={this.handleInput}
										 required 
										 />
									</li>
									<li>
										<label>Name</label>
										<input
										 name="name"
										 type="text"
										 onChange={this.handleInput}
										 required 
										 />
									</li>
									<li>
										<label>Address</label>
										<input
										 name="address"
										 type="text"
										 onChange={this.handleInput}
										 required 
										 />
									</li>
									<li>
										<button 
										type="submit" 
										className="button primary">checkout</button>
									</li>
								</ul>
							</form>
						</div>
					)}
				</div>
			</div>

		)
	}
}

