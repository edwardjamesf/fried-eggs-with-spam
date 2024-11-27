export default interface VgGame {
  id: string;
  name: string;
  developer: string | undefined;
  publisher: string | undefined;
  releaseDate: string | undefined;
  description: string | undefined;
  imageId: string | undefined;
  consoleId: string | undefined;
}