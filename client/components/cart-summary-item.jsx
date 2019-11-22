import React from 'react';

function CartSummaryItem(props) {
  const price = '$' + (props.props.price / 100).toFixed(2);
  return (
    <ul className='list-group'>
      <li className='list-group-item d-flex justify-content-between align-items-center'>
        <div className='leftSideImage'>
          <img src={props.props.image} className='detail-image'></img>
        </div>
        <div className='rightSideInfo'>
          <h5 className=''>{props.props.name}</h5>
          <div className=''>{price}</div>
          <p className=''>{props.props.shortDescription}</p>
        </div>
      </li>
    </ul>
  );
}

export default CartSummaryItem;
