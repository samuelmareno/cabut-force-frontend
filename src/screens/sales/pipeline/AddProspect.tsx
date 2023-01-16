import React, {useEffect, useState} from "react";

import updateLogger from "../../../util/update-logger";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import {CreatePipelineRequest, PipelineResponse} from "./pipeline-model";
import axios from "../../../apis/pipeline";
import {decrypt} from "../../../util/crypto";
import useLocalStorage from "../../../hooks/useLocalStorage";
import DatePicker from "react-datepicker";
import Moment from "moment/moment";
import WebResponse from "../../../util/web-response";

type Props = {
    onDismissClick: () => void;
    refetchPipeline: () => void;
    minDate: Date;
}

const AddProspect = (props: Props) => {
    const [currentProspekItem, setCurrentProspekItem] = useState<CreatePipelineRequest>({
        address: "",
        name: "",
        nip: "",
        nik: "",
        phoneNumber: "",
        status: "follow_up",
        productType: 1,
        prospectDate: new Date().getTime(),
        nominal: 0,
    });
    const {webResponse, axiosFetch, error, loading} = useAxiosFunction<PipelineResponse>();
    const [jwtToken] = useLocalStorage('jwt', '');
    const handleProspekItem = (key: string, value: any) => {

        if (key === "nominal" && isNaN(value)) {
            return;
        }
        if (key === "phoneNumber" && isNaN(value)) {
            return;
        }
        setCurrentProspekItem({...currentProspekItem, [key]: value});
    };

    const handleSubmit = () => {
        if (currentProspekItem.name === "") {
            alert("Nama harus diisi");
            return;
        }
        if (currentProspekItem.phoneNumber === "") {
            alert("Nomor telepon harus diisi");
            return;
        }
        if (currentProspekItem.nip === "") {
            alert("NIP harus diisi");
            return;
        }
        if (currentProspekItem.prospectDate === 0) {
            alert("Tanggal Follow Up harus diisi");
            return;
        }
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
            props.refetchPipeline();
            props.onDismissClick();
        }
    })

    useEffect(() => {
        if (error) {
            const errorResponse: WebResponse<String> = error.response.data;
            alert(errorResponse.data);
        }
    }, [error])

    return (
        <>
            <div className="fixed h-screen w-screen z-[11]">
                <div
                    className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center overflow-y-auto
                    bg-black bg-opacity-70 p-4"
                >
                    <main className="flex flex-col w-screen md:w-[500px] bg-white shadow-md p-4 m-auto rounded-lg z-[1]">
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
                                        value={currentProspekItem.name}
                                        onChange={(e) =>
                                            handleProspekItem("name", e.currentTarget.value)
                                        }
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
                                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </label>
                                <label>
                                    NIK *:
                                    <input
                                        type="text"
                                        name="nik"
                                        required={true}
                                        value={currentProspekItem.nik}
                                        onChange={(e) =>
                                            handleProspekItem("nik", e.currentTarget.value)
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
                                        value={currentProspekItem.status}
                                        onChange={(e) =>
                                            handleProspekItem("status", e.currentTarget.value)
                                        }
                                    >
                                        <option value="follow_up">Follow Up</option>
                                        <option value="deal">Deal</option>
                                        <option value="lost">Lost</option>
                                    </select>
                                </label>
                                <label>
                                    Rencana Follow-up:
                                    <DatePicker
                                        minDate={props.minDate}
                                        onChange={(date, event) => {
                                            event?.preventDefault();
                                            handleProspekItem(
                                                "prospectDate",
                                                date?.getTime() || new Date().getTime()
                                            )
                                        }
                                        }
                                        value={Moment(currentProspekItem.prospectDate).format("DD/MM/yyyy")}
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
                                 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </label>
                                <label>
                                    Alamat :
                                    <input
                                        type="text"
                                        value={currentProspekItem.address ?? undefined}
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
                                        value={currentProspekItem.phoneNumber}
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
                                        value={currentProspekItem.nip}
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
                                    focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        onChange={(e) =>
                                            handleProspekItem("nip", e.currentTarget.value)
                                        }
                                    />
                                </label>
                                <label>
                                    Produk:
                                    <select
                                        name="product"
                                        id="product"
                                        value={currentProspekItem.productType}
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
                                <label>
                                    Nominal *:
                                    <input
                                        type="text"
                                        name="nominal"
                                        required={true}
                                        value={currentProspekItem.nominal}
                                        onChange={(e) =>
                                            handleProspekItem("nominal", e.currentTarget.value)
                                        }
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
                                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
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
                </div>
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