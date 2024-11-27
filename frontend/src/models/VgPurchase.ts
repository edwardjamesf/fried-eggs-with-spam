export default interface VgPurchase {
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