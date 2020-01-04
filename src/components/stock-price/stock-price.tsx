import { Component, h, State } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'my-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true
})
export class MyComponent {
  @State() fetchedPrice: number;

  onFetchStockPrice(e: Event) {
    e.preventDefault();
    console.log('Submited!');

    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=${AV_API_KEY}`)
      .then(res => {
        return res.json()
      })
      .then(parsedRes => {
        this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol"/>
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: {this.fetchedPrice}</p>
      </div>
    ];
  }
}
