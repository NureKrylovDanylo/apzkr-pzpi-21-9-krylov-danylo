import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { checkToken, UserClaims } from "../Auth/http/authApi";
import { tokenLocalStorageKey } from "../consts";
import mapJwtClaims from "../utils/mapJwtClaims";


export interface User {
    name:string,
    role:string[],
}

export const useUserAuthorization = () : { user: User | undefined, checkIsAuthorized: () => Promise<void>, isAuthorized: boolean } => {
    const [user, setUser] = useState<User>()
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    useEffect(() => {
        checkIsAuthorized();
    }, [])

    const checkIsAuthorized = async () => {
        try {
            await checkToken().then(() => {
                const token = localStorage.getItem(tokenLocalStorageKey);
                if (token) {
                    const jwtDecoded = jwtDecode(token) as UserClaims;
                    setUser(mapJwtClaims(jwtDecoded));
                    setIsAuthorized(true);
                }
            })
        } catch (error) {
            console.error(error)
        }
    }

    return { user, checkIsAuthorized, isAuthorized};
}