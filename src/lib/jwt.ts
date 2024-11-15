import { jwtDecode } from "jwt-decode";

export function isValidToken(token: string) {
  try {
    const decodedToken = jwtDecode(token);
    const currentDate = new Date();

    if (decodedToken == undefined) {
      return false;
    }

    if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
}
