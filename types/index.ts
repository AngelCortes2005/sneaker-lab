interface LiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {
  baseColor?: [number, number, number];
  speed?: number;
  amplitude?: number;
  frequencyX?: number;
  frequencyY?: number;
  interactive?: boolean;
}

interface Sneaker {
  id: string;
  brand: string;
  modelName: string;
  name: string;
  price: number;
  image: string;
  thumbnail: string;
  description: string;
  category: string;
  colorway: string;
  gender: string;
  releaseDate: string;
  retailPrice: number;
  lowestResellPrice: {
    stockX: number;
    goat: number;
    flightClub: number;
    stadiumGoods: number;
  };
  resellLinks: {
    stockX: string;
    goat: string;
    flightClub: string;
    stadiumGoods: string;
  };
  story: string;
  sku: string;
  styleID: string;
  make: string;
}

declare module 'sneaks-api' {
  interface ResellPrice {
    stockX: number;
    goat: number;
    flightClub: number;
    stadiumGoods: number;
  }

  interface ResellLinks {
    stockX: string;
    goat: string;
    flightClub: string;
    stadiumGoods: string;
  }

  interface SneakerProduct {
    styleID: string;
    brand: string;
    shoeName: string;
    colorway: string;
    retailPrice: number;
    releaseDate: string;
    description: string;
    imageLinks: string[];
    thumbnail: string;
    lowestResellPrice: ResellPrice;
    resellLinks: ResellLinks;
    make: string;
    gender: string;
    title: string;
    sku: string;
    story: string;
    [key: string]: any;
  }

  interface GetProductsCallback {
    (err: Error | null, products: SneakerProduct[]): void;
  }

  interface GetProductPricesCallback {
    (err: Error | null, product: SneakerProduct): void;
  }

  class SneaksAPI {
    constructor();
    getMostPopular(count: number, callback: GetProductsCallback): void;
    getProducts(keyword: string, count: number, callback: GetProductsCallback): void;
    getProductPrices(styleID: string, callback: GetProductPricesCallback): void;
  }

  export = SneaksAPI;
}