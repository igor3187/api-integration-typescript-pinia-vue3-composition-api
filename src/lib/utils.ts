import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { push } from 'notivue'
import type { TError } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleSuccess = (title: string, message: string) => {
  push.success({
    title: title,
    message: message,
  });
}

export const handleError = (err: any) => {
  const error = err.response.data as TError

  push.error({
    title: error.statusCode.toString(),
    message: error.message,
  });
}

export async function getLocalStorageData<T>(key: string, verifyData?: boolean): Promise<T | null> {
    const data = window.localStorage.getItem(key);

    if (verifyData) {
        const authToken = localStorage.getItem('currentAuthToken');
        if (authToken) {
            const tokensContent = JSON.parse(authToken);
            const isExpired = await isTokenExpired(tokensContent.accessToken);
            if (isExpired) return null;
        } else {
            return null;
        }
    }

    return data ? JSON.parse(data) as T : null;
}

export const isUserLoggedIn = async () => {
    if (
        localStorage.getItem('currentUserContent') &&
        localStorage.getItem('currentAuthToken')
    ) {
      const tokensContent = JSON.parse(localStorage.getItem('currentAuthToken') || "{}");
      return !await isTokenExpired(tokensContent.accessToken);
    }

    return false;
}

export const isTokenExpired = async (token: string): Promise<boolean> => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= payload.exp * 1000;
};
