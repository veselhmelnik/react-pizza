export interface SinglePizza {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  types: number[];
  sizes: number[];
  category: number;
  rating: number;
}

export interface FilterAndSorting {
  filterValue: number;
  sortingValue: string;
}
