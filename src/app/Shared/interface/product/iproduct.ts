export interface Iproduct {
  id: number;
  name: string;
  price: number;
  sku: string;
  stock: number;
  active: true;
}

export interface ImportProductResponse {
  'Skipped Products': number;
  'Imported Products': number;
}
