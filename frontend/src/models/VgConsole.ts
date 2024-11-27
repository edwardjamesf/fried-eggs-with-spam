export default interface VgConsole {
  id: string | undefined;
  name: string | undefined;
  manufacturer: string | undefined;
  releaseDate: string | undefined;
  description: string | undefined;
  imageId: string | undefined;
  createdAt: string | undefined;
  modifiedAt: string | undefined;
}

export const defaultVgConsole : VgConsole = {
  id: undefined,
  name: undefined,
  manufacturer: undefined,
  releaseDate: undefined,
  description: undefined,
  imageId: undefined,
  createdAt: undefined,
  modifiedAt: undefined,
}