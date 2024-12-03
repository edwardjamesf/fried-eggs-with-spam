export default interface ConsoleModel {
  id: string | undefined;
  name: string | undefined;
  manufacturer: string | undefined;
  region: string | undefined;
  releaseDate: string | undefined;
  description: string | undefined;
  imageId: string | undefined;
  createdAt: string | undefined;
  modifiedAt: string | undefined;
}

export const defaultConsoleModel: ConsoleModel = {
  id: undefined,
  name: undefined,
  manufacturer: undefined,
  region: undefined,
  releaseDate: undefined,
  description: undefined,
  imageId: undefined,
  createdAt: undefined,
  modifiedAt: undefined,
};