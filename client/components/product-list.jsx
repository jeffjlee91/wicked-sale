import React from 'react';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => {
        this.setState({
          products: products
        });
      });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <div className='container'>
        <div className='card-deck'>
          <div className='row'>
            {this.state.products.map(product => {
              return (
                <ProductListItem key={product.productId} products={product}/>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
