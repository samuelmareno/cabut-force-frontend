import React, {useEffect, useState} from "react";

import updateLogger from "../../../util/update-logger";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import {PipelineModel} from "./pipeline-model";
import axios from "../../../apis/pipeline";
import {decrypt} from "../../../util/crypto";
import useLocalStorage from "../../../hooks/useLocalStorage";

type Props = {
    onDismissClick: () => void;
}

const AddProspect = (props: Props) => {
    const [currentProspekItem, setCurrentProspekItem] = useState({
        status: "follow_up",
        productType: 1,
        prospectDate: 0
    });
    const {webResponse, axiosFetch, error, loading} = useAxiosFunction<PipelineModel>();
    const [jwtToken] = useLocalStorage('jwt', '');
    const handleProspekItem = (key: string, value: any) => {
        setCurrentProspekItem({...currentProspekItem, [key]: value});
    };

    const handleSubmit = () => {
        updateLogger(currentProspekItem);
        axiosFetch({
            axiosInstance: axios(decrypt(jwtToken)),
            method: "POST",
            url: "/",
            data: currentProspekItem,
        }).then();
    }

    useEffect(() => {
        if (webResponse) {
            updateLogger(`success create pipeline, ${webResponse}`);
            window.location.reload();
        }
    })

    useEffect(() => {
        if (error) {
            updateLogger(error);
        }
    }, [error])

    return (
        <>
            <div className="flex items-center justify-center fixed right-0 left-0 top-0 bottom-0 z-[11]">
                <main className="flex flex-col w-screen md:w-[500px] bg-white shadow-md p-4 m-4 rounded-lg z-10">
                    <section className="flex w-full items-center justify-between">
                        <h3 className="mb-3 text-xl font-semibold text-blue-800 md:text-3xl">
                            Tambah Prospek
                        </h3>
                        <button
                            className="font-bold text-black material-symbols-rounded"
                            onClick={props.onDismissClick}
                        >
                            close
                        </button>
                    </section>
                    <section>
                        <form>
                            <label>
                                Nama *:
                                <input
                                    type="text"
                                    name="name"
                                    required={true}
                                    onChange={(e) =>
                                        handleProspekItem("name", e.currentTarget.value)
                                    }
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
                                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </label>
                            <label>
                                Status:
                                <select
                                    name="status"
                                    id="status"
                                    className="w-full rounded-md border-gray-300 border-1"
                                    onChange={(e) =>
                                        handleProspekItem("status", e.currentTarget.value)
                                    }
                                    defaultValue="follow_up"
                                >
                                    <option value="follow_up">Follow Up</option>
                                    <option value="deal">Deal</option>
                                    <option value="lost">Lost</option>
                                </select>
                            </label>
                            <label>
                                Rencana Follow-up:
                                <input
                                    type="date"
                                    onChange={(e) =>
                                        handleProspekItem(
                                            "prospectDate",
                                            e.currentTarget.valueAsNumber
                                        )
                                    }
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
                                 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </label>
                            <label>
                                Alamat *:
                                <input
                                    type="text"
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
                                 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) =>
                                        handleProspekItem("address", e.currentTarget.value)
                                    }
                                />
                            </label>
                            <label>
                                No. Telp *:
                                <input
                                    type="text"
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
                                 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) =>
                                        handleProspekItem("phoneNumber", e.currentTarget.value)
                                    }
                                />
                            </label>
                            <label>
                                NIP *:
                                <input
                                    type="text"
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
                                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) =>
                                        handleProspekItem("nip", e.currentTarget.value)
                                    }
                                />
                            </label>
                            <label>
                                Produk *:
                                <select
                                    name="product"
                                    id="product"
                                    className="w-full rounded-md border-gray-300 border-1"
                                    onChange={(e) => handleProspekItem("productType", Number(e.currentTarget.value))
                                    }
                                >
                                    <option value={1}>PLO Horizontal</option>
                                    <option value={2}>PLO Vertical</option>
                                    <option value={3}>PLO Pensiunan</option>
                                    <option value={4}>PLO Swasta</option>
                                    <option value={5}>KPR</option>
                                    <option value={6}>KKB</option>
                                    <option value={7}>KMG</option>
                                </select>
                            </label>
                            <div className="flex w-full items-center justify-center space-x-4">
                                <button
                                    disabled={loading}
                                    className="mt-4 cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-bold text-white"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSubmit();
                                    }}
                                >
                                    {loading ? "Loading..." : "Submit"}
                                </button>
                                <button
                                    className="mt-4 cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-bold text-white"
                                    onClick={(e) => {
                                        props.onDismissClick();
                                        e.preventDefault();
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>
                        </form>
                    </section>
                </main>
                <div
                    className="absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-70"
                    onClick={props.onDismissClick}
                />
            </div>
        </>
    );
};

export default AddProspect;

/* <label>
              Keterangan:
              <input
                type="text"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  handleProspekItem("noKtp", e.currentTarget.value)
                }
              />
            </label> */