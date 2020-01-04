import { Component, Element, h, State, Prop } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'my-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true
})
export class MyComponent {
  stockInput: HTMLInputElement;
  @Element() el: HTMLElement;
  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @Prop() stockSymbol: string;

  componentWillLoad() {
    console.log('componentWillLoad');
    console.log('this.stockSymbol', this.stockSymbol);
    if (this.stockSymbol) {
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentDidLoad() {
    console.log('componentDidLoad');
    console.log('this.stockSymbol', this.stockSymbol);
    if (this.stockSymbol) {
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentDidUnload() {
    console.log('componentDidUnload');
  }

  onUserInput(e: Event) {
    this.stockUserInput = (e.target as HTMLInputElement).value;
    if ( this.stockUserInput.trim() !== '' ) {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  onFetchStockPrice(e: Event) {
    e.preventDefault();
    const stockSymbol = this.stockInput.value;
    this.fetchStockPrice(stockSymbol);
  }

  fetchStockPrice(stockSymbol) {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
      .then(res => {
        if ( res.status !== 200 ) {
          throw new Error('Invalid!');
        }
        return res.json()
      })
      .then(parsedRes => {
        if ( parsedRes['Error Message'] ) {
          throw new Error('Invalid symbol!');
        }
        this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
        this.error = null;
      })
      .catch(err => {
        this.error = err.message;
      })
  }

  render() {
    console.log('render');
    let dataContent = <p>Plese enter a symbol!</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }

    if (this.fetchedPrice) {
      dataContent = <p>Price: {this.fetchedPrice}</p>;
    }

    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input
          id="stock-symbol"
          ref={el => this.stockInput = el}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)}
        />
        <button type="submit" disabled={!this.stockInputValid}>Fetch</button>
      </form>,
      <div>
        { dataContent }
      </div>
    ];
  }
}
