export type ActiveFilters = {
  colors?: string[];
  sizes?: string[];
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type CategoriesSearchParams = {
  sizes: string | undefined;
  colors: string | undefined;
  min_price: string | undefined;
  max_price: string | undefined;
  sort: string | undefined;
  page: string | undefined;
};
