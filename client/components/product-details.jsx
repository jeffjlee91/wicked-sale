import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
    this.price = '$' + (this.props.product.price / 100).toFixed(2);
    this.clickHandler = this.clickHandler.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
  }

  componentDidMount() {
    const num = this.props.product.productId;
    fetch(`/api/products?productId=${num}`)
      .then(res => res.json())
      .then(product => {
        this.setState({
          product: product
        });
      });
  }

  addItemToCart() {
    this.props.addToCart(this.state.product.productId);

  }

  clickHandler() {
    this.props.setView('catalog', null);
  }

  render() {
    return (
      <div className='container-top-margin'>
        <div onClick={this.clickHandler} type='button' className='btn btn-dark goBackButton'>Back to Catalog</div>
        <div className='detailcontainer'>
          <img src={this.state.product.image} className='detail-image moveImage'></img>
          <div className='rightofimage'>
            <h1 className=''>{this.state.product.name}</h1>
            <div className=''>{this.price}</div>
            <p className=''>{this.state.product.shortDescription}</p>
            <div onClick={this.addItemToCart} type='button' className='btn btn-dark'>Add to Cart</div>
          </div>
          <p className='margin-top-20'>{this.state.product.longDescription}</p>
        </div>
      </div>
    );
  }
}

export default ProductDetails;
