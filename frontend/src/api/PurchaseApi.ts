import PurchaseModel, {defaultPurchaseModel} from '../models/PurchaseModel.ts';
import {handleError} from './ApiUtilities.ts';

export async function createNewPurchase(newPurchase: PurchaseModel): Promise<PurchaseModel> {
  try {
    const response = await fetch(`api/purchases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPurchase),
    });

    if (!response.ok) {
      console.error(response);
      return defaultPurchaseModel;
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return defaultPurchaseModel;
  }
}

export async function getPurchasesFromDbAll(): Promise<PurchaseModel[]> {
  try {
    const response = await fetch(`api/purchases/all`, {
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

export async function updatePurchaseInDb(updatePurchase: PurchaseModel): Promise<PurchaseModel> {
  try {
    const response = await fetch(`api/purchases/${updatePurchase.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePurchase),
    });

    if (!response.ok) {
      console.error(response);
      return updatePurchase;
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return updatePurchase;
  }
}

export async function deletePurchaseFromDb(deletePurchase: PurchaseModel): Promise<PurchaseModel> {
  try {
    const response = await fetch(`api/purchases/${deletePurchase.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      console.error(response);
      return deletePurchase;
    }

    return await response.json();
  } catch (error) {
    await handleError(error as Error);
    return deletePurchase;
  }
}