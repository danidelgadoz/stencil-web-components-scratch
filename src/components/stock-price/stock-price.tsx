import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true
})
export class MyComponent {
  onFetchStockPrice(e: Event) {
    e.preventDefault();
    console.log('Submited!');
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice}>
        <input id="stock-symbol"/>
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: {0}</p>
      </div>
    ];
  }
}
