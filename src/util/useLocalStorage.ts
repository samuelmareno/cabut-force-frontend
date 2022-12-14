import { useState, useEffect } from "react";

function getSavedValue(key: string, initialValue: any) {
    const savedValue = JSON.parse(window.localStorage.getItem(key)!!);
    if (savedValue) return savedValue;

    if (initialValue instanceof Function) return initialValue();
    return initialValue;
}

export default function useLocalStorage(key: string, initialValue: string) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    });

    useEffect(() => {
        console.info("useLocalStorage", value);
        window.localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue];
}
