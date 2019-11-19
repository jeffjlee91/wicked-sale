import React from 'react';

function ProductListItem(props) {
  const price = '$' + (props.products.price / 100).toFixed(2);
  return (
    <div className='col-4'>
      <div className='card height-500 overflow-hidden margin-top-30'>
        <img src={props.products.image} className='card-img-top fit-image'></img>
        <div className='card-body'>
          <h5 className='card-title'>{props.products.name}</h5>
          <div className='card-text'>{price}</div>
          <p className='card-text'>{props.products.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
