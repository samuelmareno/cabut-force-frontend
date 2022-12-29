import React, {useEffect, useState} from "react";
import {PipelineModel} from "./pipeline-model";
import Moment from "moment";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import {decrypt} from "../../../util/crypto";
import axios from "../../../apis/pipeline";
import useLocalStorage from "../../../hooks/useLocalStorage";
import updateLogger from "../../../util/update-logger";

type EditProspectProps = {
    pipelineModel: PipelineModel;
    onCancelClick: () => void;
}

const EditProspect = (props: EditProspectProps) => {
    const [editablePipelineModel, setEditablePipelineModel] = useState({...props.pipelineModel});
    const [jwt] = useLocalStorage('jwt', '');
    const handleProspekItem = (key: string, value: any) => {
        setEditablePipelineModel({...editablePipelineModel, [key]: value});
    }
    const {webResponse, axiosFetch, error, loading} = useAxiosFunction<PipelineModel>();

    const handleSubmit = () => {
        axiosFetch({
            axiosInstance: axios(decrypt(jwt)),
            method: "PUT",
            url: `/`,
            data: {
                id: editablePipelineModel.id,
                nip: editablePipelineModel.nip,
                name: editablePipelineModel.name,
                phoneNumber: editablePipelineModel.phoneNumber,
                address: editablePipelineModel.address,
                status: editablePipelineModel.status,
                productType: editablePipelineModel.productType.id,
                prospectDate: editablePipelineModel.prospectDate
            }
        }).then();
    }

    useEffect(() => {
        if (webResponse) {
            updateLogger("success update pipeline", webResponse);
            window.location.reload();
        }
    }, [webResponse]);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);


    return (
        <>
            <div className="flex items-center justify-center fixed right-0 left-0 top-0 bottom-0 z-[11]">
                <main className="flex flex-col w-screen md:w-[500px] bg-white shadow-md p-4 m-4 rounded-lg z-10">
                    <section className="flex w-full items-center justify-between">
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
                    <section>
                        <form>
                            <label>
                                Nama *:
                                <input
                                    type="text"
                                    value={editablePipelineModel.name}
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
                                    value={editablePipelineModel.status}
                                    className="w-full rounded-md border-gray-300 border-1"
                                    onChange={(e) =>
                                        handleProspekItem("status", e.currentTarget.value)
                                    }
                                    defaultValue="baru"
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
                                    value={Moment(editablePipelineModel.prospectDate).format("YYYY-MM-DD")}
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
                                    value={editablePipelineModel.address ?? ""}
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
                                    value={editablePipelineModel.phoneNumber}
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
                                    value={editablePipelineModel.nip}
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm
                                 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) =>
                                        handleProspekItem("email", e.currentTarget.value)
                                    }
                                />
                            </label>
                            <label>
                                Produk *:
                                <select
                                    name="product"
                                    id="product"
                                    value={editablePipelineModel.productType.id}
                                    className="w-full rounded-md border-gray-300 border-1"
                                    onChange={(e) =>
                                        handleProspekItem("product", e.currentTarget.value)
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
                <div
                    className="absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-70"
                    onClick={props.onCancelClick}
                ></div>
            </div>
        </>
    );
};

export default EditProspect;