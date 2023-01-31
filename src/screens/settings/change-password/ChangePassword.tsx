import React, {useEffect, useState} from 'react'
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import axios from "../../../apis/users";
import useLocalStorage from "../../../hooks/useLocalStorage";

type UIState = {
    oldPassword: string;
    newPassword: string;
    retypePassword: string;
    oldPasswordError: string;
    newPasswordError: string;
    retypePasswordError: string;
}

const ChangePassword = () => {

    const [uiState, setUiState] = useState({
        oldPassword: '',
        newPassword: '',
        retypePassword: '',
        oldPasswordError: '',
        newPasswordError: '',
        retypePasswordError: ''
    } as UIState);

    const {webResponse, loading, error, axiosFetch} = useAxiosFunction<string>();
    const [jwtToken] = useLocalStorage('jwt', '');

    const changeUiState = (key: keyof UIState, value: string) => {
        setUiState((prevState) => ({
            ...prevState,
            [key]: value
        }));
    }

    const handleSubmitChangePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        let oldPasswordError = false;
        let newPasswordError = false;
        let retypePasswordError = false;
        setUiState((prevState) => ({
            ...prevState,
            oldPasswordError: '',
            newPasswordError: '',
            retypePasswordError: ''
        }));

        if (uiState.oldPassword === '') {
            oldPasswordError = true;
            changeUiState('oldPasswordError', 'Password lama tidak boleh kosong');
        }
        if (uiState.newPassword === '') {
            newPasswordError = true;
            changeUiState('newPasswordError', 'Password baru tidak boleh kosong');
        }
        if (uiState.newPassword.length < 6) {
            newPasswordError = true;
            changeUiState('newPasswordError', 'Password minimal 6 karakter');
        }
        if (uiState.retypePassword === '') {
            retypePasswordError = true;
            changeUiState('retypePasswordError', 'Ulangi password baru tidak boleh kosong');
        }
        if (uiState.newPassword !== uiState.retypePassword) {
            retypePasswordError = true;
            changeUiState('retypePasswordError', 'Password tidak sama');
        }

        const errorList: boolean[] = [oldPasswordError, newPasswordError, retypePasswordError];
        const hasError = errorList.some((error) => error);
        if (!hasError) {
            axiosFetch(
                {
                    axiosInstance: axios(jwtToken),
                    method: 'PUT',
                    url: '/change-password',
                    data: {
                        oldPassword: uiState.oldPassword,
                        newPassword: uiState.newPassword
                    }
                }
            ).then();
        }
    }

    useEffect(() => {
        if (webResponse) {
            alert(webResponse.data);
        }
    }, [webResponse]);

useEffect(() => {
    if (error) {
            console.log(error.response.message);
            changeUiState('oldPasswordError', error.response.data.data.toString());
        }
    }, [error]);


    return (
        <>
            <main className="sm:w-[480px] sm:mx-auto">
                <section id="oldPassword" className="space-y-2">
                    <label>Password Lama</label>
                    <input value={uiState.oldPassword}
                           onChange={(event) => changeUiState("oldPassword", event.target.value)}
                           type="password"
                           placeholder="Masukkan password lama"
                           className="block w-full rounded-md border-gray-300 shadow-sm"/>
                    <p className={"text-sm text-red-600 font-medium"}>{uiState.oldPasswordError}</p>
                </section>
                <section id="newPassword" className="space-y-2">
                    <label>Password Baru</label>
                    <input value={uiState.newPassword}
                           onChange={(event) => changeUiState("newPassword", event.target.value)}
                           type="password"
                           placeholder="Masukkan password baru"
                           className="block w-full rounded-md border-gray-300 shadow-sm"/>
                    <p className={"text-sm text-red-600 font-medium"}>{uiState.newPasswordError}</p>
                </section>
                <section id="retypePassword" className="space-y-2">
                    <label>Konfirmasi Password Baru</label>
                    <input value={uiState.retypePassword}
                           onChange={(event) => changeUiState("retypePassword", event.target.value)}
                           type="password"
                           placeholder="Ulangi password baru"
                           className="block w-full rounded-md border-gray-300 shadow-sm"/>
                    <p className={"text-sm text-red-600 font-medium"}>{uiState.retypePasswordError}</p>
                </section>
                <section id="retypePassword" className="space-y-2">
                    <button type="button"
                            disabled={loading}
                            className="w-full mx-auto mt-4 p-3 text-white text-lg font-medium rounded-lg
                            bg-primary-600"
                            onClick={(event) => handleSubmitChangePassword(event)}>{loading ? 'Loading...' : 'Ganti Password'}
                    </button>
                </section>
            </main>
        </>
    )
}

export default ChangePassword