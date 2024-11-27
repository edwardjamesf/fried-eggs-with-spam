import VgConsole, {defaultVgConsole} from '../models/VgConsole.ts';
import {handleError} from './ApiUtilities.ts';

export async function createVgConsole(vgConsole: VgConsole) : Promise<VgConsole> {
  try {
    const response = await fetch('api/consoles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vgConsole)
    });

    if (!response.ok) {
      console.error(response);
      return defaultVgConsole;
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return defaultVgConsole;
  }
}

export async function getVgConsolesAll() : Promise<VgConsole[]> {
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

export async function updateVgConsole(vgConsole: VgConsole) : Promise<VgConsole> {
  try {
    const response = await fetch(`api/consoles/${vgConsole.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vgConsole)
    });

    if (!response.ok) {
      console.error(response);
      return vgConsole;
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return vgConsole;
  }
}

export async function deleteVgConsole(vgConsole: VgConsole) : Promise<VgConsole> {
  try {
    const response = await fetch(`api/consoles/${vgConsole.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error(response);
      return vgConsole;
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return vgConsole;
  }
}