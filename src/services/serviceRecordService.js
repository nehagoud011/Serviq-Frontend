import { API_BASE_URL } from './apiConfig';

const API_URL = `${API_BASE_URL}/api/service-records`;

export async function getAllServiceRecords() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch service records');
  }

  return response.json();
}

export async function addServiceRecord(record) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error('Failed to add service record');
  }

  return response.json();
}

export async function deleteServiceRecord(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete service record');
  }
}
