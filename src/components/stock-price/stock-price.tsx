import { Component, Element, h, State, Prop, Watch, Listen } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'my-stock-price',
  styleUrl: 'stock-price.css',
  shadow: true
})
export class MyComponent {
  // initialStockSymbol: string;
  stockInput: HTMLInputElement;
  @Element() el: HTMLElement;
  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @Prop({ mutable: true, reflect: true }) stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.stockInputValid = true;
      this.fetchStockPrice(newValue);
    }

  }

  componentWillLoad() {
    console.log('componentWillLoad');
  }

  componentDidLoad() {
    console.log('componentDidLoad');
    if (this.stockSymbol) {
      // this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    // if (this.stockSymbol !== this.initialStockSymbol) {
    //   this.initialStockSymbol = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }

  componentDidUnload() {
    console.log('componentDidUnload');
  }

  @Listen('mySymbolSelected', { target: 'body' })
  onStockSymbolSelected(event: CustomEvent) {
    console.log('stock symbol selected');
    if (event.detail && event.detail !== this.stockSymbol) {
      this.stockSymbol = event.detail;
    }
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
    this.stockSymbol = this.stockInput.value;
  }

  fetchStockPrice(ss) {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ss}&apikey=${AV_API_KEY}`)
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
        this.fetchedPrice = null;
      })
  }

  hostData() {
    return { class: this.error ? 'hydrated error' : 'hydrated' };
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
