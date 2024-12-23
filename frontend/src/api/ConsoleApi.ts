import ConsoleModel, {defaultConsoleModel} from '../models/ConsoleModel.ts';
import {handleError} from './ApiUtilities.ts';

export async function createNewConsole(newConsole: ConsoleModel): Promise<ConsoleModel> {
  try {
    const response = await fetch('api/consoles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newConsole)
    });

    if (!response.ok) {
      console.error(response);
      return defaultConsoleModel;
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return defaultConsoleModel;
  }
}

export async function getConsolesFromDbAll(): Promise<ConsoleModel[]> {
  try {
    const response = await fetch('api/consoles/all', {
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

export async function updateConsoleInDb(updateConsole: ConsoleModel): Promise<ConsoleModel> {
  try {
    const response = await fetch(`api/consoles/${updateConsole.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateConsole)
    });

    if (!response.ok) {
      console.error(response);
      return updateConsole;
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return updateConsole;
  }
}

export async function deleteConsoleFromDb(deleteConsole: ConsoleModel): Promise<ConsoleModel> {
  try {
    const response = await fetch(`api/consoles/${deleteConsole.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error(response);
      return deleteConsole;
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return deleteConsole;
  }
}