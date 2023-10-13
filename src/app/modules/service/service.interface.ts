type IDetailsService = {
  banner: string;
  title: string;
  description: string;
  images: [string];
  servicePoint: [string];
};

export type IServices = {
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
  serviceDetails: IDetailsService[];
};

export type IServiceSearchFilter = {
  search?: string | undefined;
  price?: string | undefined;
  maxPrice?: string | undefined;
  minPrice?: string | undefined;
};
