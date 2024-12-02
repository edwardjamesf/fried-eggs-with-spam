export default interface PurchaseModel {
  id: string | undefined;
  name: string | undefined;
  purchaseDate: string | undefined;
  purchaseFrom: string | undefined;
  costBase: number | undefined;
  costTax: number | undefined;
  costShipping: number | undefined;
  costOther: number | undefined;
  costTotal: number | undefined;
  notes: string | undefined;
  imageId: string | undefined;
  consoleId: string | undefined;
  gameId: string | undefined;
  createdAt: string | undefined;
  modifiedAt: string | undefined;
}

export const defaultPurchaseModel: PurchaseModel = {
  id: undefined,
  name: undefined,
  purchaseDate: undefined,
  purchaseFrom: undefined,
  costBase: undefined,
  costTax: undefined,
  costShipping: undefined,
  costOther: undefined,
  costTotal: undefined,
  notes: undefined,
  imageId: undefined,
  consoleId: undefined,
  gameId: undefined,
  createdAt: undefined,
  modifiedAt: undefined,
};