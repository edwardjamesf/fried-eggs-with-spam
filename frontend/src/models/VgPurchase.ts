export default interface VgPurchase {
  id: string | null;
  name: string;
  purchaseDate: string | null;
  costBase: number;
  costTax: number;
  costShipping: number;
  costOther: number;
  costTotal: number | null;
  notes: string | null;
  imageId: string | null;
  consoleId: string | null;
  gameId: string | null;
}