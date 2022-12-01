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
      <div className="flex-colflex bg-white p-2 m-2 rounded-md shadow-md">
        <h3 className="font-semibold text-2xl my-2">{props.day}</h3>
        <table className="table-auto rounded-md border-t-1">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-gray-200">
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Nama
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                No. Telp
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
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