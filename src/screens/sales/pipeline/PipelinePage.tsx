import React, {useEffect, useState} from "react";
import {useStateContext} from "../../../contexts/ContextProvider";
import Moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../../apis/pipeline"
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import useLocalStorage from "../../../hooks/useLocalStorage";
import {decrypt} from "../../../util/crypto";
import {PipelineModel} from "./pipeline-model";
import TableDay from "./TableDay";
import updateLogger from "../../../util/update-logger";

const PipelinePage = () => {
    const [jwt] = useLocalStorage('jwt', '');
    const {setShowAddProspect} = useStateContext();
    const [currentPipelineDate, setCurrentPipelineDate] = useState(new Date());
    const [currentPipelineDateString, setCurrentPipelineDateString] = useState("");
    const {webResponse, axiosFetch, error, loading} = useAxiosFunction<PipelineModel[]>();

    const [day, setDay] = useState("Monday");

    useEffect(() => {
        Moment.locale("id");
        handleDate(currentPipelineDate);

        //eslint-disable-next-line
    }, []);

    useEffect(() => {

        if (webResponse) {
            updateLogger(webResponse.data);
        }
    }, [webResponse]);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);


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
                <div className="flex space-x-3">
                    <button
                        className="rounded-md bg-green-500 p-3 text-sm font-bold text-white"
                        onClick={() => {
                            setShowAddProspect((previous) => !previous);
                        }}
                    >
                        Tambah Prospek
                    </button>
                    <select
                        name="product"
                        id="product"
                        className="rounded-md border-gray-300 border-1"
                        onChange={(event) => {
                            setDay(event.currentTarget.value);
                            event.preventDefault();
                        }
                        }
                    >
                        <option value="Monday">Senin</option>
                        <option value="Tuesday">Selasa</option>
                        <option value="Wednesday">Rabu</option>
                        <option value="Thursday">Kamis</option>
                        <option value="Friday">Jumat</option>
                        <option value="Saturday">Sabtu</option>
                        <option value="Sunday">Minggu</option>
                    </select>
                </div>
                <div>
                    <DatePicker
                        selected={currentPipelineDate}
                        onChange={handleDate}
                        value={Moment(currentPipelineDate).format("DD-MM-yyyy")}
                        minDate={handleMinDateToMonday(new Date())}
                        isClearable={false}
                        className="w-full rounded-lg border-2 border-gray-300 p-2"
                    />
                </div>
            </section>
            <section>
                {!webResponse && !error && loading && (
                    <div role="status"
                         className="w-full flex justify-center items-center">
                        <svg aria-hidden="true"
                             className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
                {webResponse && <TableDay day={day} pipeline={webResponse.data as PipelineModel[]}/>}
            </section>
        </main>
    );

    function handleDate(pipelineDate: Date) {
        const day = pipelineDate.getDay();
        const diff = pipelineDate.getDate() - day + (day === 0 ? -6 : 1);
        const mondayDate = new Date(pipelineDate.setDate(diff));

        setCurrentPipelineDate(mondayDate);
        let dateInStringFormat: string = Moment(mondayDate).format("DD MMMM yyyy");
        setCurrentPipelineDateString(dateInStringFormat);
        handleGetPipeline();
    }

    function handleMinDateToMonday(pipelineDate: Date): Date {
        const day = pipelineDate.getDay();
        const diff = pipelineDate.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(pipelineDate.setDate(diff));
    }

    function handleGetPipeline() {
        const date = currentPipelineDate;
        date.setHours(0, 0, 0, 0);
        const startDate = date.getTime();
        const endDate = startDate + 518400000; // milliseconds in 6 days
        axiosFetch({
            axiosInstance: axios(decrypt(jwt)),
            method: "GET",
            url: `/${startDate}/${endDate}`,
        }).then()
    }
};

export default PipelinePage;
