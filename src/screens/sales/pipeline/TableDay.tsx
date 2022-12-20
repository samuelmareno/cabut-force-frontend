interface PipelineProps {
    nama: string;
    status: string;
    noTelp: string;
    keterangan: string | null;
    hari: string;
}

type TableProps = {
    day: string;
    pipeline: PipelineProps[];
};


const TableDay = (props: TableProps) => {
    return (
        <div className="m-2 flex flex-col rounded-md bg-white p-2 shadow-md">
            <h3 className="my-2 text-2xl font-semibold">{props.day}</h3>
            <table className="table-auto rounded-md border-t-1">
                <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-100">
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
                        Keterangan
                    </th>
                </tr>
                </thead>
                <tbody>
                {props.pipeline.map((value) => (
                    <tr key={value.nama}>
                        <td className="p-2">{value.nama}</td>
                        <td>{value.status}</td>
                        <td>{value.noTelp}</td>
                        <td className="text-center">{value.keterangan ?? "-"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableDay;