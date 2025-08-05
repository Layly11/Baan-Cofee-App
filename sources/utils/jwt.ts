import {jwtDecode} from "jwt-decode";

interface JWTPayload {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (err) {
    return true; 
  }
};