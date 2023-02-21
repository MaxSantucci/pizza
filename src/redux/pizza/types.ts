export interface PizzaItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
}

export enum Statuses {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Statuses;
}

export interface SearchPizzaParams {
  sortBy: string; 
  order: string;  
  category: string;  
  search: string; 
  currentPage: string; 
}