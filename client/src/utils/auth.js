import { jwtDecode } from 'jwt-decode';

export const checkTokenExpiry = () => {
  const token = localStorage.getItem('token');
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (err) {
    return true;
  }
};
