import { API_BASE_URL } from './apiConfig';

const API_URL = `${API_BASE_URL}/api/assets`;

export async function getAllAssets() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch assets');
  }

  return response.json();
}

export async function addAsset(asset) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(asset),
  });

  if (!response.ok) {
    throw new Error('Failed to add asset');
  }

  return response.json();
}

export async function deleteAsset(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete asset');
  }
}
