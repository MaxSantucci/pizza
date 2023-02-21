export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price_26',
  PRICE_ASC = '-price_26',
}

export interface Sort {
  name: string;
  sortProperty: SortPropertyEnum; 
} 

export interface FilterSliceState {
  searchValue : string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}