export default interface Purchase {
  id: string;
  fk_console_id: string | null;
  fk_game_id: string | null;
  fk_place_of_purchase: string;
  fk_image_id: string | null;
  name: string | null;
  cost_base: number;
  cost_tax: number;
  cost_shipping: number;
  cost_other: number;
  cost_total: number | null;
  date: string | null;
  notes: string | null;
}