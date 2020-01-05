/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
  interface MyStockFinder {}
  interface MyStockPrice {
    'stockSymbol': string;
  }
}

declare global {


  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };

  interface HTMLMyStockFinderElement extends Components.MyStockFinder, HTMLStencilElement {}
  var HTMLMyStockFinderElement: {
    prototype: HTMLMyStockFinderElement;
    new (): HTMLMyStockFinderElement;
  };

  interface HTMLMyStockPriceElement extends Components.MyStockPrice, HTMLStencilElement {}
  var HTMLMyStockPriceElement: {
    prototype: HTMLMyStockPriceElement;
    new (): HTMLMyStockPriceElement;
  };
  interface HTMLElementTagNameMap {
    'my-component': HTMLMyComponentElement;
    'my-stock-finder': HTMLMyStockFinderElement;
    'my-stock-price': HTMLMyStockPriceElement;
  }
}

declare namespace LocalJSX {
  interface MyComponent {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }
  interface MyStockFinder {
    'onMySymbolSelected'?: (event: CustomEvent<string>) => void;
  }
  interface MyStockPrice {
    'stockSymbol'?: string;
  }

  interface IntrinsicElements {
    'my-component': MyComponent;
    'my-stock-finder': MyStockFinder;
    'my-stock-price': MyStockPrice;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'my-component': LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
      'my-stock-finder': LocalJSX.MyStockFinder & JSXBase.HTMLAttributes<HTMLMyStockFinderElement>;
      'my-stock-price': LocalJSX.MyStockPrice & JSXBase.HTMLAttributes<HTMLMyStockPriceElement>;
    }
  }
}


