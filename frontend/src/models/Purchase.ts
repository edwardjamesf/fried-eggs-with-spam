export default interface Purchase {
  id: string | null;
  fkConsoleId: string | null;
  fkGameId: string | null;
  fkPlaceOfPurchase: string;
  fkImageId: string | null;
  description: string | null;
  costBase: number;
  costTax: number;
  costShipping: number;
  constOther: number;
  costTotal: number | null;
  date: string | null;
  notes: string | null;
}