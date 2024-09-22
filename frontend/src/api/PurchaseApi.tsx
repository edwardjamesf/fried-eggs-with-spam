import Purchase from "../models/Purchase";

export async function handleError(error: Error): Promise<void> {
  console.log(error);
  alert(error.message);
}

export async function getPurchaseData(
  setPurchaseData: (param: Purchase[]) => void
) {
  try {
    const response = await fetch('api/purchases', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw response;
    }

    const data: Purchase[] = await response.json();

    setPurchaseData([...data]);
  } catch (error) {
    handleError(error as Error);
    return [];
  }
}

export async function addPurchases(purchases: {}) {
  try {
    const response = await fetch('api/purchases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchases),
    });

    if (!response.ok) {
      throw response;
    }
  } catch (error) {
    handleError(error as Error);
    return { message: 'Failed to add purchase to DB.' };
  }
}
