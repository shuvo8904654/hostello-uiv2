import type { Hostel, User, Booking, Review, Message } from "@shared/schema";

const API_BASE = "/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || "Request failed");
  }
  return response.json();
}

// Auth API
export const authApi = {
  async register(data: { username: string; email: string; password: string; phone?: string; role?: string }) {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return handleResponse<Omit<User, "password">>(response);
  },

  async login(username: string, password: string) {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    return handleResponse<Omit<User, "password">>(response);
  },

  async logout() {
    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    return handleResponse<{ message: string }>(response);
  },

  async getCurrentUser() {
    const response = await fetch(`${API_BASE}/auth/user`, {
      credentials: "include",
    });
    return handleResponse<Omit<User, "password">>(response);
  },
};

// Hostel API
export const hostelApi = {
  async getHostels(filters?: { city?: string; location?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filters?.city) params.append("city", filters.city);
    if (filters?.location) params.append("location", filters.location);
    if (filters?.search) params.append("search", filters.search);

    const response = await fetch(`${API_BASE}/hostels?${params.toString()}`);
    return handleResponse<Hostel[]>(response);
  },

  async getHostel(id: string) {
    const response = await fetch(`${API_BASE}/hostels/${id}`);
    return handleResponse<Hostel & { rooms: any[]; packages: any[]; reviewsList: any[] }>(response);
  },

  async createHostel(data: any) {
    const response = await fetch(`${API_BASE}/hostels`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return handleResponse<Hostel>(response);
  },

  async updateHostel(id: string, data: any) {
    const response = await fetch(`${API_BASE}/hostels/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return handleResponse<Hostel>(response);
  },

  async deleteHostel(id: string) {
    const response = await fetch(`${API_BASE}/hostels/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    return handleResponse<{ message: string }>(response);
  },
};

// Review API
export const reviewApi = {
  async createReview(hostelId: string, data: { rating: number; comment: string }) {
    const response = await fetch(`${API_BASE}/hostels/${hostelId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return handleResponse<Review>(response);
  },
};

// Booking API
export const bookingApi = {
  async getBookings() {
    const response = await fetch(`${API_BASE}/bookings`, {
      credentials: "include",
    });
    return handleResponse<Booking[]>(response);
  },

  async createBooking(data: any) {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return handleResponse<Booking>(response);
  },

  async updateBooking(id: string, data: any) {
    const response = await fetch(`${API_BASE}/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return handleResponse<Booking>(response);
  },
};

// Message API
export const messageApi = {
  async getMessages() {
    const response = await fetch(`${API_BASE}/messages`, {
      credentials: "include",
    });
    return handleResponse<Message[]>(response);
  },
};
