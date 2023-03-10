import React, {useEffect, useState} from "react";
import Moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../../apis/pipeline"
import useAxiosFunction from "../../../hooks/useAxiosFunction";
import useLocalStorage from "../../../hooks/useLocalStorage";
import {PipelineResponse} from "./pipeline-model";
import TableDay from "./TableDay";
import AddProspect from "./AddProspect";
import EditProspect from "./EditProspect";
import {useStateContext} from "../../../contexts/ContextProvider";

const PipelinePage = () => {
    const [jwt] = useLocalStorage('jwt', '');
    const [day, setDay] = useState("Monday");
    const [showAddProspect, setShowAddProspect] = useState(false);
    const [showEditProspect, setShowEditProspect] = useState(false);
    const [currentPipelineDate, setCurrentPipelineDate] = useState(new Date());
    const [currentPipelineDateString, setCurrentPipelineDateString] = useState("");
    const {webResponse, axiosFetch, error, loading} = useAxiosFunction<PipelineResponse[]>();
    const {activeMenu, screenWidthSize, screenHeightSize} = useStateContext()

    const [editProspect, setEditProspect] = useState({} as PipelineResponse);

    useEffect(() => {
        Moment.locale("id");
        setDay(Moment().format("dddd"));
        handleDate(currentPipelineDate);

        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    useEffect(() => {
        handleGetPipeline();

        // eslint-disable-next-line
    }, [currentPipelineDate]);

    useEffect(() => {
        if (editProspect.id) {
            setShowEditProspect(true);
        }
    }, [editProspect]);

    return (
        <>
            {showAddProspect ? <AddProspect
                onDismissClick={() => setShowAddProspect(false)}
                minDate={handleMinDateToMonday(new Date())}
                refetchPipeline={handleGetPipeline}
                screenHeightSize={screenHeightSize}
            /> : null}
            {showEditProspect ?
                <EditProspect pipelineModel={editProspect}
                              onCancelClick={() => setShowEditProspect(false)}
                              refetchPipeline={
                                  () => {
                                      setShowEditProspect(false);
                                      handleGetPipeline();
                                  }
                              }
                              screenHeightSize={screenHeightSize}
                /> : null}
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
                            name="pipeline-day"
                            id="product"
                            className="rounded-md border-gray-300 border-1"
                            value={day}
                            onChange={(event) => {
                                event.preventDefault();
                                setDay(event.currentTarget.value);
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
                            onChange={(date, event) => {
                                event?.preventDefault();
                                handleDate(date ?? new Date());
                            }
                            }
                            value={Moment(currentPipelineDate).format("DD-MM-yyyy")}
                            minDate={handleMinDateToMonday(new Date())}
                            isClearable={false}
                            className={`w-full rounded-lg border-2 border-gray-300 p-2 
                            ${activeMenu && screenWidthSize < 900 ? "hidden" : ""}`}
                        />
                    </div>
                </section>
                <section>
                    {!webResponse && !error && loading && (
                        <div role="status"
                             className="flex w-full items-center justify-center">
                            <svg aria-hidden="true"
                                 className="h-12 w-12 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
                    {webResponse && <TableDay day={day}
                                              pipeline={webResponse.data}
                                              onEditClick={(editPipeline) => {
                                                  setEditProspect(editPipeline);
                                              }
                                              }
                                              refetchPipeline={handleGetPipeline}
                    />}
                </section>
            </main>
        </>
    );

    function handleDate(pipelineDate: Date) {
        const day = pipelineDate.getDay();
        const diff = pipelineDate.getDate() - day + (day === 0 ? -6 : 1);
        pipelineDate.setDate(diff);

        setCurrentPipelineDate(pipelineDate);
        let dateInStringFormat: string = Moment(pipelineDate).format("DD MMMM yyyy");
        setCurrentPipelineDateString(dateInStringFormat);
    }

    function handleMinDateToMonday(currentDate: Date): Date {
        const day = currentDate.getDay();
        const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1);
        currentDate.setDate(diff)
        return currentDate;
    }

    function handleGetPipeline() {
        currentPipelineDate.setHours(0, 0, 0, 0);
        const startDate = currentPipelineDate.getTime();
        const endDate = startDate + 518400000; // milliseconds in 6 days
        axiosFetch({
            axiosInstance: axios(jwt),
            method: "GET",
            url: `/${startDate}/${endDate}`,
        }).then()
    }
};

export default PipelinePage;
