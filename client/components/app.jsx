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
      products: {}
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (<div>
        <Header></Header>
        <ProductList setView={this.setView}/>
      </div>);
    } else if (this.state.view.name === 'details') {
      return (<div>
        <Header></Header>
        <ProdcutDetails product={this.state.view.params} setView={this.setView}/>
      </div>

      );
    }

  }
}
