import {PipelineModel, TablePipelineModel} from "./pipeline-model";
import Moment from "moment";


type TableProps = {
    day: string;
    pipeline: PipelineModel[];
};


const TableDay = (props: TableProps) => {

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

    return (
        <div className="m-2 pb-2 flex flex-col rounded-md bg-white overflow-x-auto">
            <h3 className="m-3 text-2xl font-semibold">{props.day}</h3>
            <table className="table-auto rounded-md border-t-1">
                <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-100">
                    <th className="p-3 text-left text-sm font-semibold tracking-wide">
                        NIP
                    </th>
                    <th className="p-3 text-left text-sm font-semibold tracking-wide">
                        Nama
                    </th>
                    <th className="p-3 text-left text-sm font-semibold tracking-wide">
                        Status
                    </th>
                    <th className="p-3 text-left text-sm font-semibold tracking-wide">
                        No. Telp
                    </th>
                    <th className="p-3 text-left text-sm font-semibold tracking-wide">
                        Produk
                    </th>
                    <th className="p-3 text-center text-sm font-semibold tracking-wide">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {tablePipelineModel.filter(value => value.day === props.day).map(value => (
                    <tr key={value.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="pl-2">{value.nip}</td>
                        <td>{value.name}</td>
                        <td className={`text-lg font-semibold
                        ${value.status === "DEAL" && "text-green-500"} 
                        ${value.status === "FOLLOW_UP" && "text-yellow-500"} 
                        ${value.status === "LOST" && "text-red-500"}`}>{value.status}</td>
                        <td>{value.phoneNumber}</td>
                        <td>{value.productType.name}</td>
                        <td className="text-center space-x-3">
                            <button
                                type="button"
                                onClick={() => alert(`Edit ${value.id}`)}
                                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md my-2"
                            >Ubah
                            </button>
                            <button
                                type="button"
                                onClick={() => alert(`Delete ${value.id}`)}
                                className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md my-2"
                            >Hapus
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