import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProdcutDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      products: {},
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(itemsInCart => {
        this.setState({
          cart: itemsInCart
        });
      });
  }

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: product })
    };
    fetch('/api/cart', req)
      .then(res => res.json())
      .then(item => {
        this.setState({
          cart: this.state.cart.concat(item)
        });
      });

  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (<div>
        <Header cartItemCount={this.state.cart.length} ></Header>
        <ProductList setView={this.setView}/>
      </div>);
    } else if (this.state.view.name === 'details') {
      return (<div>
        <Header cartItemCount={this.state.cart.length}></Header>
        <ProdcutDetails
          product={this.state.view.params}
          setView={this.setView}
          addToCart={this.addToCart}/>
      </div>

      );
    }

  }
}
