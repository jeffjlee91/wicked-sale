import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  if (props.props[0] === undefined) {
    return (
      <div>
        <div onClick={() => goToCatalog(props)} type='button' className='btn btn-dark goBackButton'>Back to Catalog</div>
        <h3 className='detailcontainer'>No items in your cart!</h3>
      </div>
    );
  } else {
    return (
      <div>
        <div onClick={() => goToCatalog(props)} type='button' className='btn btn-dark goBackButton'>Back to Catalog</div>
        <div className="container detailcontainer">
          <div className='flex-column'>
            {props.props.map(item => {
              return (
                <CartSummaryItem key={item.id} props={item}/>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

function goToCatalog(props) {
  props.setView('catalog', null);
}

export default CartSummary;
