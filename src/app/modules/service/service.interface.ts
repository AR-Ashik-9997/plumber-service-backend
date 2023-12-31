export type IServiceSearchFilter = {
  search?: string | undefined;
  price?: string | undefined;
  maxPrice?: string | undefined;
  minPrice?: string | undefined;
};

type IFeatures = {
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
  feature5: string;
};
export type IServices = {
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  availability: 'Available' | 'NotAvailable';
  features: IFeatures[];
};
