export default interface Game {
  id: number;
  name: string;
  publisher: string | null;
  developer: string | null;
  release_date: string | null;
  description: string | null;
  image_path: string | null;
}