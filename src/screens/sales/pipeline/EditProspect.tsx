import React, {useEffect, useState} from "react";
import {PipelineResponse, UpdatePipelineRequest} from "./pipeline-model";
import Moment from "moment";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import {decrypt} from "../../../util/crypto";
import axios from "../../../apis/pipeline";
import useLocalStorage from "../../../hooks/useLocalStorage";
import updateLogger from "../../../util/update-logger";

type EditProspectProps = {
    pipelineModel: PipelineResponse;
    refetchPipeline: () => void;
    onCancelClick: () => void;
    screenHeightSize: number;
}

const EditProspect = (props: EditProspectProps) => {
    const [updatePipelineRequest, setUpdatePipelineRequest] = useState<UpdatePipelineRequest>({
        id: props.pipelineModel.id,
        nip: props.pipelineModel.nip,
        nik: props.pipelineModel.nik,
        name: props.pipelineModel.name,
        phoneNumber: props.pipelineModel.phoneNumber,
        address: props.pipelineModel.address ?? "",
        status: props.pipelineModel.status,
        productType: props.pipelineModel.productType.id,
        prospectDate: props.pipelineModel.prospectDate,
        nominal: props.pipelineModel.nominal,
    });
    const [jwt] = useLocalStorage('jwt', '');

    const handleProspekItem = (key: keyof UpdatePipelineRequest, value: any) => {
        updateLogger(key, value);
        if (key === "nominal" && isNaN(value)) {
            return;
        }
        if (key === "phoneNumber" && isNaN(value)) {
            return;
        }
        setUpdatePipelineRequest(prevState => ({...prevState, [key]: value}));
    }
    const {webResponse, axiosFetch, error, loading} = useAxiosFunction<PipelineResponse>();

    const handleSubmit = () => {
        axiosFetch({
            axiosInstance: axios(decrypt(jwt)),
            method: "PUT",
            url: `/`,
            data: updatePipelineRequest

        }).then();
    }

    useEffect(() => {
        if (webResponse) {
            updateLogger("success update pipeline", webResponse);
            props.refetchPipeline();
        }

        // eslint-disable-next-line
    }, [webResponse]);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    return (
        <>
            <div className="fixed flex items-center justify-center right-0 left-0 top-0 bottom-0 z-[11]">
                <div
                    className="h-screen w-screen bg-black bg-opacity-70 p-4"
                    onClick={() => props.onCancelClick()}
                >
                </div>
                <main
                    className={`absolute flex flex-col justify-center md:w-[500px] bg-white
                     shadow-md p-4 rounded-lg ${props.screenHeightSize < 760 ? "h-screen" : "h-fit"}`}>
                    <section className="flex items-center justify-between">
                        <h3 className="mb-3 text-xl font-semibold text-blue-800 md:text-3xl">
                            Edit Prospek
                        </h3>
                        <button
                            className="font-bold text-black material-symbols-rounded"
                            onClick={props.onCancelClick}
                        >
                            close
                        </button>
                    </section>
                    <section className="overflow-y-auto">
                        <form>
                            <label>
                                Nama *:
                                <input
                                    type="text"
                                    value={updatePipelineRequest.name}
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
                                NIK *:
                                <input
                                    type="text"
                                    name="nik"
                                    required={true}
                                    value={updatePipelineRequest.nik}
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
                                    defaultValue={updatePipelineRequest.status}
                                    value={updatePipelineRequest.status.toLowerCase()}
                                    className="w-full rounded-md border-gray-300 border-1"
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
                                <input
                                    type="date"
                                    value={Moment(updatePipelineRequest.prospectDate).format("YYYY-MM-DD")}
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
                                    value={updatePipelineRequest.address ?? ""}
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
                                    value={updatePipelineRequest.phoneNumber}
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
                                    type="email"
                                    value={updatePipelineRequest.nip}
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
                                    value={updatePipelineRequest.productType}
                                    className="w-full rounded-md border-gray-300 border-1"
                                    onChange={(e) =>
                                        handleProspekItem("productType", Number(e.currentTarget.value))
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
                                    value={updatePipelineRequest.nominal}
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
                                    disabled={loading}
                                    className="mt-4 cursor-pointer rounded-lg bg-red-600 px-4 py-2 font-bold text-white"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        props.onCancelClick();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        </>
    );
};

export default EditProspect;