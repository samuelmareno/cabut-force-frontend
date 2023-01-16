import CryptoJS from "crypto-js";

const key = process.env.REACT_APP_CRYPTO_KEY as string;

export function encrypt(plaintext: string | any): string {
    if (typeof plaintext === 'object') {
        return CryptoJS.AES.encrypt(JSON.stringify(plaintext), key).toString();
    }
    if (typeof plaintext === 'string') {
        return CryptoJS.AES.encrypt(plaintext, key).toString();
    }
    return '';
}

export function decrypt(ciphertext: string | any) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    if (typeof ciphertext === 'object') {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    }
    if (typeof ciphertext === 'string') {
        return bytes.toString(CryptoJS.enc.Utf8);
    }
    return bytes.toString(CryptoJS.enc.Utf8);
}
