import React, { useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import Moment from "moment";
import DatePicker from "react-datepicker";

interface ProspekItem {
  name: string;
  status: string;
  product: string;
  prospectDate: number;
  address: string;
  phoneNumber: string;
  email: string | null;
  noKtp: string | null;
  description: string;
}

const AddProspect = () => {
  const { setShowAddProspect } = useStateContext();

  const prospekItem: ProspekItem = {
    name: "",
    product: "",
    status: "baru",
    prospectDate: 0,
    address: "",
    phoneNumber: "",
    email: "",
    noKtp: "-",
    description: "-",
  };

  const [currentProspekItem, setCurrentProspekItem] = useState(prospekItem);

  const handleProspekItem = (item: string, value: any) => {
    setCurrentProspekItem({ ...currentProspekItem, [item]: value });
  };

  return (
    <div className="flex items-center justify-center fixed right-0 left-0 top-0 bottom-0 z-[100]">
      <main className="flex flex-col w-screen md:w-[500px] bg-white shadow-md p-4 m-4 rounded-lg z-10">
        <section className="flex justify-between items-center w-full">
          <h3 className="text-blue-800 font-semibold text-xl md:text-3xl mb-3">
            Tambah Prospek
          </h3>
          <button
            className="material-symbols-rounded text-black font-bold"
            onClick={() => setShowAddProspect((previous) => !previous)}
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
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
            <label>
              Status:
              <select
                name="status"
                id="status"
                className="border-1 border-gray-300 w-full rounded-md"
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
                onChange={(e) =>
                  handleProspekItem(
                    "prospectDate",
                    e.currentTarget.valueAsNumber
                  )
                }
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
            <label>
              Alamat *:
              <input
                type="text"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  handleProspekItem("address", e.currentTarget.value)
                }
              />
            </label>
            <label>
              No. Telp *:
              <input
                type="text"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  handleProspekItem("phoneNumber", e.currentTarget.value)
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  handleProspekItem("email", e.currentTarget.value)
                }
              />
            </label>
            <label>
              No. KTP:
              <input
                type="text"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  handleProspekItem("noKtp", e.currentTarget.value)
                }
              />
            </label>
            <label>
              Produk *:
              <select
                name="product"
                id="product"
                className="border-1 border-gray-300 w-full rounded-md"
                onChange={(e) =>
                  handleProspekItem("product", e.currentTarget.value)
                }
              >
                <option value="PLO_HORIZONTAL">PLO Horizontal</option>
                <option value="PLO_VERTICAL">PLO Vertical</option>
                <option value="PLO_PENSIUNAN">PLO Pensiunan</option>
                <option value="PLO_SWASTA">PLO Swasta</option>
                <option value="KPR">KPR</option>
                <option value="KKB">KKB</option>
                <option value="KMG">KMG</option>
              </select>
            </label>
            {/* <label>
              Keterangan:
              <input
                type="text"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange={(e) =>
                  handleProspekItem("noKtp", e.currentTarget.value)
                }
              />
            </label> */}
            <div className="space-x-4 flex items-center justify-center w-full">
              <button
                className="bg-blue-600 px-4 py-2 rounded-lg text-white font-bold mt-4 cursor-pointer"
                onClick={(e) => {
                  console.log(currentProspekItem);
                  e.preventDefault();
                }}
              >
                Submit
              </button>
              <button
                className="bg-red-600 px-4 py-2 rounded-lg text-white font-bold mt-4 cursor-pointer"
                onClick={(e) => {
                  setShowAddProspect((previous) => !previous);
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
        className="bg-black bg-opacity-70 absolute right-0 left-0 top-0 bottom-0"
        onClick={() => setShowAddProspect((previous) => !previous)}
      ></div>
    </div>
  );
};

export default AddProspect;
