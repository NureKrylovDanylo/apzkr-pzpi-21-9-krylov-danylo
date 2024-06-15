import { jwtDecode } from 'jwt-decode';
import { tokenLocalStorageKey } from '../../consts';
import { $authhost, $host } from '../../http';
import { ILoginFormData } from '../pages/Login/Login';
import { RegisterFormData } from '../pages/Registration/Registration';

export type ClaimName = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name" | "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
export type UserClaims = {
    [key in ClaimName]:string;
}

export const registration = async (registrationData:RegisterFormData) => {
    const { data } = await $host.post('api/Authorization/register', registrationData)
    localStorage.setItem(tokenLocalStorageKey, data)
}

export const login = async (loginData:ILoginFormData) => {
    const { data } = await $host.post('api/Authorization/signIn', loginData)
    localStorage.setItem(tokenLocalStorageKey, data)
}

export const checkToken = async () => {
    await $authhost.post('api/Authorization/checkToken')
}