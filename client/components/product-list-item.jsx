import React from 'react';

class ProductListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setView('details', this.props.products);
  }

  render() {
    return (
      <div className='col-lg-4 col-sm-6 col-md-6'>
        <div onClick={this.handleClick} className='card height-500 overflow-hidden my-3'>
          <img src={this.props.products.image} className='card-img-top fit-image'></img>
          <div className='card-body'>
            <h5 className='card-title'>{this.props.products.name}</h5>
            <div className='card-text'>{this.price}</div>
            <p className='card-text'>{this.props.products.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
