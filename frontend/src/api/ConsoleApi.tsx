import Console from '../models/Console';

export async function handleError(error: Error) : Promise<void> {
  console.log(error)
  alert(error.message);
}

export async function getConsoleData(
  setConsoleData: (param: Console[]) => void
) {
  try {
    const response = await fetch('http://192.168.86.241:8000/consoles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw response;
    }

    const data: Console[] = await response.json();
    
    setConsoleData([...data]);

  } catch (error) {
    handleError(error as Error)
    return [];
  }
}

export async function addConsoles(
  consoles: {}
) {
  try {
    const response = await fetch('http://192.168.86.241:8000/consoles', {
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
    handleError(error as Error)
    return {'message': 'Failed to add console to DB.'}
  }
}