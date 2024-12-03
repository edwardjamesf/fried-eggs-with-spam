export default interface GameModel {
  id: string | undefined;
  name: string | undefined;
  publisher: string | undefined;
  developer: string | undefined;
  region: string | undefined;
  releaseDate: string | undefined;
  description: string | undefined;
  imageId: string | undefined;
  consoleId: string | undefined;
  createdAt: string | undefined;
  modifiedAt: string | undefined;
}

export const defaultGameModel: GameModel = {
  id: undefined,
  name: undefined,
  publisher: undefined,
  developer: undefined,
  region: undefined,
  releaseDate: undefined,
  description: undefined,
  imageId: undefined,
  consoleId: undefined,
  createdAt: undefined,
  modifiedAt: undefined,
};