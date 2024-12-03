import GameModel, {defaultGameModel} from '../models/GameModel.ts';
import {handleError} from './ApiUtilities.ts';

export async function createNewGame(newGame: GameModel): Promise<GameModel> {
  try {
    const response = await fetch('api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGame)
    });

    if (!response.ok) {
      console.error(response);
      return defaultGameModel;
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return defaultGameModel;
  }
}

export async function getGamesFromDbAll(): Promise<GameModel[]> {
  try {
    const response = await fetch('api/games/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error(response);
      return [];
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return [];
  }
}

export async function updateGameInDb(updateGame: GameModel): Promise<GameModel> {
  try {
    const response = await fetch(`api/games/${updateGame.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateGame)
    });

    if (!response.ok) {
      console.error(response);
      return updateGame;
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return updateGame;
  }
}

export async function deleteGameFromDb(deleteGame: GameModel): Promise<GameModel> {
  try {
    const response = await fetch(`api/games/${deleteGame.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error(response);
      return deleteGame;
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return deleteGame;
  }
}