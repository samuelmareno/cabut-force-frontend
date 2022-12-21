import React, {useEffect, useState} from "react";
import {UserState, useStateContext} from "../../../contexts/ContextProvider";
import {pipelineSenin} from "./datadummy";
import TableDay from "./TableDay";
import Moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fetchUser from "../../../util/fetchUser";

const Pipeline = () => {
    const {activeMenu, screenSize, setShowAddProspect, setCurrentState} = useStateContext();
    const [currentPipelineDate, setCurrentPipelineDate] = useState(new Date());
    const [currentPipelineDateString, setCurrentPipelineDateString] = useState("");

    function handleDate(pipelineDate: Date) {
        const day = pipelineDate.getDay();
        const diff = pipelineDate.getDate() - day + (day === 0 ? -6 : 1);
        const mondayDate = new Date(pipelineDate.setDate(diff));

        setCurrentPipelineDate(mondayDate);
        let dateInStringFormat: string = Moment(mondayDate).format("DD MMMM yyyy");
        setCurrentPipelineDateString(dateInStringFormat);
    }

    function handleMinDateToMonday(pipelineDate: Date): Date {
        const day = pipelineDate.getDay();
        const diff = pipelineDate.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(pipelineDate.setDate(diff));
    }

    useEffect(() => {
        Moment.locale("id");
        handleDate(currentPipelineDate);
    }, []);

    useEffect(() => {
        fetchUser()
            .then((response: UserState) => {
                    setCurrentState((prevState) => ({...prevState, ...response}));
            })
    }, []);

    return (
        <main>
            <section className="bg-white p-4">
                <p className="uppercase text-blue-800">Pipeline</p>
                <p>Pipeline Minggu Depan</p>
            </section>
            <section
                id="Tanggal Pipeline"
                className="mt-4 rounded-md bg-blue-200 p-4 text-blue-600"
            >
                <p>{`Pipeline ${currentPipelineDateString}`}</p>
            </section>
            <section className="mt-4 flex items-center justify-between p-2 space-x-4 sm:space-x-0">
                <button
                    className="rounded-md bg-green-500 p-3 text-sm font-bold text-white"
                    onClick={() => {
                        setShowAddProspect((previous) => !previous);
                    }}
                >
                    Tambah Prospek
                </button>
                <p>
                    <DatePicker
                        selected={currentPipelineDate}
                        onChange={handleDate}
                        value={Moment(currentPipelineDate).format("DD-MM-yyyy")}
                        minDate={handleMinDateToMonday(new Date())}
                        isClearable={false}
                        className="w-full rounded-lg border-2 border-gray-300 p-2"
                    />
                </p>
            </section>
            <section
                className={`${
                    activeMenu && screenSize <= 900 ? "static ml-0" : "absolute"
                } flex left-0 right-0 ${
                    activeMenu ? "ml-72" : "ml-0"
                } flex-col md:flex-row mt-4 p-2 overflow-auto items-center duration-300`}
            >
                <TableDay day="Senin" pipeline={pipelineSenin}/>
                <TableDay day="Selasa" pipeline={pipelineSenin}/>
                <TableDay day="Rabu" pipeline={pipelineSenin}/>
                <TableDay day="Kamis" pipeline={pipelineSenin}/>
                <TableDay day="Jumat" pipeline={pipelineSenin}/>
                <TableDay day="Sabtu" pipeline={pipelineSenin}/>
                <TableDay day="Minggu" pipeline={pipelineSenin}/>
            </section>
        </main>
    );
};

export default Pipeline;
