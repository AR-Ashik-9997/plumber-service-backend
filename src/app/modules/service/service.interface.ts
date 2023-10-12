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
  serviceDetails: IDetailsService[];
};
