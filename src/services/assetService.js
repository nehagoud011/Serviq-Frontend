
const API_URL = 'http://localhost:8080/api/assets';

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
