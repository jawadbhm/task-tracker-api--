// FIX: Import 'React' to use its types like React.Dispatch.
import React, { useState, useEffect } from 'react';

function getStorageValue<T,>(key: string, defaultValue: T): T {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem(key);
        if (saved !== null) {
            try {
                return JSON.parse(saved) as T;
            } catch (e) {
                console.error("Failed to parse JSON from localStorage", e);
                return defaultValue;
            }
        }
    }
    return defaultValue;
}

export const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
        return getStorageValue(key, initialValue);
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Failed to set item in localStorage", e);
        }
    }, [key, value]);

    return [value, setValue];
};
