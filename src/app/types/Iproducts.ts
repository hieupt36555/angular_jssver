export interface IProducts {
    id: number;
    title: string;
    desc: string;
    price: number;
    image: string;
    category: string;
    isShow: boolean;
  }
  export type addProductForm = {
    title: string;
    desc: string;
    price: number;
    image: string;
    isShow: boolean;
  }
  export type CategoryType = {
    categoryName: string,
  }
  export type CategoryTypeShow = {
    id: string;
    categoryName: string,
  }