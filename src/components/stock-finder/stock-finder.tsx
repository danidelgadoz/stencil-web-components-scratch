import { Component, h, State, Event, EventEmitter } from '@stencil/core';
import { AV_API_KEY } from '../../global/global';

@Component({
  tag: 'my-stock-finder',
  styleUrl: 'stock-finder.css',
  shadow: true
})
export class MyStockFinder {
  stockNameInput: HTMLInputElement;
  @State() searchResults: { name: string; symbol: string}[] = [];
  @Event({ bubbles: true, composed: true }) mySymbolSelected: EventEmitter<string>;

  onFindStocks(event: Event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value;

    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
    .then(res => res.json())
    .then(parsedRed => {
      this.searchResults = parsedRed['bestMatches'].map(match => ({ name: match['2. name'], symbol: match['1. symbol']}));
    })
    .catch(err => {
      console.log(err);
    })
  }

  onSelectSymbol(symbol: string) {
    this.mySymbolSelected.emit(symbol);
  }

  render() {
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input
          id="stock-symbol"
          ref={el => this.stockNameInput = el}
        />
        <button type="submit">Fetch</button>
      </form>,
      <ul>
        {this.searchResults.map(item => (
          <li onClick={this.onSelectSymbol.bind(this, item.symbol)}>
            <strong>{item.symbol}</strong> - {item.name}
          </li>
        ))}
      </ul>
    ];
  }
}
