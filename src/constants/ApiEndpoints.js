const API_BASE_URL = "http://localhost:8080/api/v1";

export const API_ENDPOINTS = {
    AUTHENTICATE: `${API_BASE_URL}/auth/authenticate`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    CLIENTS: `${API_BASE_URL}/clients`,
    CONTRACTS: `${API_BASE_URL}/contracts`,
    CARDS: `${API_BASE_URL}/cards`,
};
