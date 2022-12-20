import CryptoJS from "crypto-js";

const key = 'c4butf0rc3';

export const encrypt = (plaintext: string | any): string => {
    if (typeof plaintext === 'object') {
        return CryptoJS.AES.encrypt(JSON.stringify(plaintext), key).toString();
    }
    if (typeof plaintext === 'string') {
        return CryptoJS.AES.encrypt(plaintext, key).toString();
    }
    return '';
};

export const decrypt = (ciphertext: string | any) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    if (typeof ciphertext === 'object') {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    }
    if (typeof ciphertext === 'string') {
        return bytes.toString(CryptoJS.enc.Utf8);
    }
    return bytes.toString(CryptoJS.enc.Utf8);
};
