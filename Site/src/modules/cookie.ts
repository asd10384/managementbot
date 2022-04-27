import { Cookies } from "react-cookie";
import { CookieGetOptions, CookieSetOptions } from "universal-cookie";

const cookie = new Cookies();

export function setCookie(name: string, value: string, option?: CookieSetOptions): void {
  return cookie.set(name, value, option);
}

export function getCookie(name: string, option?: CookieGetOptions): any {
  return cookie.get(name, option);
}

export function removeCookie(name: string, option?: CookieSetOptions): any {
  return cookie.remove(name, option);
}