import Console from '../models/Console';

export async function handleError(error: Error): Promise<void> {
  console.log(error);
  alert(error.message);
}

export async function getConsoleData() {
  try {
    const response = await fetch('api/consoles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw response;
    }

    const data: Console[] = await response.json();
    return data;
  } catch (error) {
    handleError(error as Error);
    return [];
  }
}

export async function addConsoles(consoles: {}) {
  try {
    const response = await fetch('api/consoles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consoles),
    });

    if (!response.ok) {
      throw response;
    }
  } catch (error) {
    handleError(error as Error);
    return { message: 'Failed to add console to DB.' };
  }
}
