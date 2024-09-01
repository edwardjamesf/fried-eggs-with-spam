export default interface Console {
  id: number;
  name: string;
  manufacturer: string | null;
  release_date: string | null;
  description: string | null;
  image_path: string | null;
}