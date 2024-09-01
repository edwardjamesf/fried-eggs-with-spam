import Game from '../models/Game';

export async function handleError(error: Error) : Promise<void> {
  console.log(error)
  alert(error.message);
}

export default async function getGameData(
  setGameData: (param: Game[]) => void
) {
  try {
    const response = await fetch('api/games', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw response;
    }

    const data: Game[] = await response.json();

    setGameData([...data]);

  } catch (error) {
    handleError(error as Error)
    return [];
  }
}