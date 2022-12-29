import {PipelineModel, TablePipelineModel} from "./pipeline-model";
import Moment from "moment";
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import axios from "../../../apis/pipeline";
import useLocalStorage from "../../../hooks/useLocalStorage";
import {decrypt} from "../../../util/crypto";
import {useEffect} from "react";


type TableProps = {
    day: string;
    pipeline: PipelineModel[];
    onEditClick: (pipelineModel: PipelineModel) => void;
};


const TableDay = (props: TableProps) => {

    const classNameTableHead = "p-5 text-left text-sm font-semibold tracking-wide"

    const tablePipelineModel: TablePipelineModel[] = props.pipeline.map((pipelineModel) => {
        const day = Moment(pipelineModel.prospectDate).format("dddd");
        return {
            id: pipelineModel.id,
            nip: pipelineModel.nip,
            name: pipelineModel.name,
            phoneNumber: pipelineModel.phoneNumber,
            address: pipelineModel.address,
            status: pipelineModel.status,
            productType: pipelineModel.productType,
            prospectDate: pipelineModel.prospectDate,
            day: day,
            referralUser: pipelineModel.referralUser,
        }
    });

    const {webResponse, axiosFetch, loading, error} = useAxiosFunction<string>();
    const [jwt] = useLocalStorage('jwt', '');

    const handleDelete = (pipelineId: string) => {
        axiosFetch({
            axiosInstance: axios(decrypt(jwt)),
            method: "DELETE",
            url: `/${pipelineId}`,
        }).then();
    };

    useEffect(() => {
        if (webResponse) {
            window.location.reload();
        }
    }, [webResponse]);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    return (
        <div className="m-2 pb-2 flex flex-col rounded-md bg-white overflow-x-auto">
            <h3 className="m-3 text-2xl font-semibold">{props.day}</h3>
            <table className="table-auto rounded-md border-t-1">
                <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-100">
                    <th className={classNameTableHead}>
                        NIP
                    </th>
                    <th className={classNameTableHead}>
                        Nama
                    </th>
                    <th className={classNameTableHead}>
                        Status
                    </th>
                    <th className={classNameTableHead}>
                        No. Telp
                    </th>
                    <th className={classNameTableHead}>
                        Alamat
                    </th>
                    <th className={classNameTableHead}>
                        Produk
                    </th>
                    <th className={classNameTableHead}>
                        Tanggal Prospek
                    </th>
                    <th className="p-5 text-center text-sm font-semibold tracking-wide">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {tablePipelineModel.filter(value => value.day === props.day).map(value => (
                    <tr key={value.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="p-2">{value.nip}</td>
                        <td className="p-2">{value.name}</td>
                        <td className={`p-2 text-lg font-semibold
                        ${value.status === "DEAL" && "text-green-500"} 
                        ${value.status === "FOLLOW_UP" && "text-yellow-400"} 
                        ${value.status === "LOST" && "text-red-500"}`}>{value.status}</td>
                        <td className="p-2">{value.phoneNumber}</td>
                        <td className={`p-2 ${value.address ? "" : "text-red-600 italic"}`}>{value.address ?? "Belum diisi"}</td>
                        <td className="p-2">{value.productType.name}</td>
                        <td className="p-2">{Moment(value.prospectDate).format("DD MMMM yyyy")}</td>
                        <td className="text-center space-x-3">
                            <button
                                disabled={loading}
                                type="button"
                                onClick={() => props.onEditClick(value)}
                                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md my-2"
                            >Ubah
                            </button>
                            <button
                                disabled={loading}
                                type="button"
                                onClick={() => handleDelete(value.id)}
                                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md my-2"
                            >{loading ? "Loading..." : "Hapus"}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableDay;