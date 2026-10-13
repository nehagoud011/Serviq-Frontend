// API Configuration
// In production, VITE_API_BASE_URL is set to your Render backend URL (e.g. https://serviq-backend.onrender.com).
// In local development, it defaults to http://localhost:8080.
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/+$/, '');
