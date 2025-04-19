export interface Product {
  cardId: string;
  name: string;
  type: string;
  race?: string;
  cardSet?: string;
  [key: string]: any;
}
