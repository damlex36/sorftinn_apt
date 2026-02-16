// lib/auth.ts
import api from "./api";
import axios from "axios";

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  tokens: {
    access: string;
    refresh: string;
  };
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const res = await api.post<LoginResponse>("/api/login/", {
      email,
      password,
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      throw err.response.data; // backend error
    }
    throw err;
  }
}


/**
 * SorftInn Hotel App
 * © 2026 Damola
 * Licensed under MIT
 */