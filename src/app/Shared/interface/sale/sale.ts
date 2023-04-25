export interface Isale {
  id: number;
  total: number;
  created_at: string;
  client: {
    id: number;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
  };
  items: [
    {
      id: number;
      created_at: string;
      sale_id: number;
      price: number;
      quantity: number;
      product_id: number;
    }
  ];
}

export interface Iquicksale {
  created_at: string;
  id: number;
  name: string;
  products: {
    active: boolean;
    created_at: string;
    id: number;
    name: string;
    price: number;
    sku: string;
    stock: number;
    updated_at: string;
  }[];
  updated_at: string;
}
