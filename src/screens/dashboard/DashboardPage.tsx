import React, {useEffect, useState} from "react";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip} from "chart.js";
import {Bar, Pie} from 'react-chartjs-2'
import {useStateContext} from "../../contexts/ContextProvider";
import DatePicker from "react-datepicker";
import updateLogger from "../../util/update-logger";
import axios from "../../apis/pipeline";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import useLocalStorage from "../../hooks/useLocalStorage";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

type DealDatasetType = {
    label: string;
    data: number[];
    backgroundColor: string;
}

type DealDatasetPieType = {
    label: string;
    data: number[];
    backgroundColor: string[];
}

type PipelineData = {
    month: number,
    productType: string,
    deal: number,
    nominal: number
}

type pieChartDataType = {
    labels: string[];
    datasets: DealDatasetPieType[];
}

export default function DashboardPage() {
    const {screenWidthSize} = useStateContext();
    const [jwt] = useLocalStorage('jwt', '');
    const labels = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const dealDatasets: DealDatasetType[] = []
    const backgroundColors: string[] = ['#10ae5e', '#fe3701', '#cb29bb', '#d1ca2a', '#ec7828', '#24a5de'];
    const [currentYear, setCurrentYear] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentPipelineData, setCurrentPipelineData] = useState([] as PipelineData[]);
    const [currentProductTypes, setCurrentProductTypes] = useState([] as string[]);
    const {webResponse, axiosFetch} = useAxiosFunction<PipelineData[]>();

    if (currentProductTypes.length > 0) {
        for (let productType = 0; productType < currentProductTypes.length; productType++) {
            let dealData = currentPipelineData
                .filter((data) => data.productType === currentProductTypes[productType])
                .sort((a, b) => {
                    if (a.month < b.month) return -1;
                    if (a.month > b.month) return 1;
                    return 0;
                })
                .map((data) => data.deal);

            dealDatasets.push({
                label: currentProductTypes[productType],
                data: dealData,
                backgroundColor: backgroundColors[productType]
            });
            currentPipelineData
                .filter((data) => data.productType === currentProductTypes[productType])
                .sort((a, b) => {
                    if (a.month < b.month) return -1;
                    if (a.month > b.month) return 1;
                    return 0;
                })
                .map((data) => data.nominal);
        }
    }

    const chartData = {
        labels: labels,
        datasets: dealDatasets
    };

    const pieChartData: pieChartDataType = {
        labels: currentProductTypes,
        datasets: [
            {
                label: 'Jumlah Nominal',
                data: currentPipelineData.filter((data) => data.month === currentMonth.getMonth() + 1).map((data) => data.nominal),
                backgroundColor: backgroundColors,
            }
        ]
    };

    function handleDateChange(date: Date | null) {
        if (date) {
            setCurrentYear(date);
        }
    }

    function handleMonthChange(month: Date | null) {
        if (month) {
            month.setHours(0, 0, 0, 0);
            setCurrentMonth(month);
        }
    }

    function fetchPipelineData(startDate: number, endDate: number) {
        axiosFetch({
            axiosInstance: axios(jwt),
            method: 'GET',
            url: `graphics/${startDate}/${endDate}`
        }).then();
    }

    useEffect(() => {
        currentYear.setMonth(0);
        currentYear.setHours(0, 0, 0, 0);
        const endYear = new Date();
        endYear.setFullYear(currentYear.getFullYear() + 1, 0);
        endYear.setHours(0, 0, 0, 0);
        const startYearInMillis = currentYear.getTime();
        const endYearInMillis = endYear.getTime() - 1;

        fetchPipelineData(startYearInMillis, endYearInMillis);

        // eslint-disable-next-line
    }, [currentYear]);

    useEffect(() => {
        if (webResponse) {
            updateLogger('DashboardPage', webResponse.data);
            setCurrentPipelineData(webResponse.data);
            setCurrentProductTypes([...new Set(webResponse.data.map(data => data.productType))]);
        }

    }, [webResponse]);


    return (
        <>
            <div className="flex flex-col space-y-4">
                <div className="flex items-center self-center">
                    <DatePicker
                        showYearPicker={true}
                        maxDate={new Date()}
                        minDate={new Date(2023, 0, 0)}
                        selected={currentYear}
                        dateFormat="yyyy"
                        onChange={handleDateChange}
                        isClearable={false}
                        className="rounded-md border-2 border-gray-300 text-center text-xl cursor-pointer"/>
                </div>
                <div className="overflow-x-auto">
                    <Bar
                        datasetIdKey={'deal_count'}
                        width={2500}
                        height={`${screenWidthSize <= 900 ? 400 : 720}`}
                        options={
                            {
                                responsive: false,
                                animation: {
                                    duration: 0
                                }
                            }
                        }
                        data={chartData}
                    />
                </div>
                <div className="flex items-center self-center">
                    <DatePicker
                        showMonthYearPicker={true}
                        maxDate={new Date()}
                        minDate={new Date(2023, 0, 1)}
                        selected={new Date(currentMonth)}
                        dateFormat="MMMM"
                        onChange={handleMonthChange}
                        isClearable={false}
                        className="rounded-md border-2 border-gray-300 text-center text-xl cursor-pointer"/>
                </div>
                <div className="self-center overflow-x-auto">
                    {screenWidthSize > 900 ? <Pie
                        datasetIdKey={'nominal_count'}
                        data={pieChartData}
                        width={640}
                        height={640}
                        options={
                            {
                                responsive: false,
                                animation: {
                                    duration: 0
                                }
                            }
                        }
                    /> : <Pie
                        datasetIdKey={'nominal_count2'}
                        data={pieChartData}
                        options={
                            {
                                responsive: true,
                                animation: {
                                    duration: 0
                                }
                            }
                        }
                    />}

                </div>
            </div>
        </>
    );
};
