export default interface VgGame {
  id: string;
  name: string;
  developer: string | null;
  publisher: string | null;
  releaseDate: string | null;
  description: string | null;
  imageId: string | null;
  consoleId: string | null;
}