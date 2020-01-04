import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-stock-price',
  styleUrl: 'my-stock-price.css',
  shadow: true
})
export class MyComponent {
  render() {
    return [
      <form>
        <input id="stock-symbol"/>
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: {0}</p>
      </div>
    ];
  }
}
