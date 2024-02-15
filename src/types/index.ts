export type CategoriesFilters = {
  colors?: string[];
  sizes?: string[];
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
};

export type CategoriesSearchParams = {
  sizes: string | undefined;
  colors: string | undefined;
  min_price: string | undefined;
  max_price: string | undefined;
  sort: string | undefined;
  page: string | undefined;
};

export type BrandsFilters = CategoriesFilters & {
  brand?: string;
};

export type BrandsSearchParams = CategoriesSearchParams & {
  category: string | undefined;
};
