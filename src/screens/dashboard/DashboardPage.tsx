import React from "react";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip} from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import {Bar, Pie} from 'react-chartjs-2'
import generateData from "./data-dummy";
import {useStateContext} from "../../contexts/ContextProvider";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, zoomPlugin);

type DealDatasetType = {
    label: string;
    data: number[];
    backgroundColor: string;
}

type NominalDatasetType = {
    label: string;
    data: number[];
    backgroundColor: string;
    hoverOffset: number;
}

export default function DashboardPage() {
    const {screenWidthSize} = useStateContext();
    const pipelineData = generateData();
    const labels = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const dealDatasets: DealDatasetType[] = []
    const nominalDatasets: NominalDatasetType[] = []
    const productTypes = [...new Set(pipelineData.map(data => data.productType))];
    const backgroundColors: string[] = shuffle(randomColor({count: productTypes.length}));

    for (let productType = 0; productType < productTypes.length; productType++) {
        let dealData = pipelineData
            .filter((data) => data.productType === productTypes[productType])
            .sort((a, b) => {
                if (a.month < b.month) return -1;
                if (a.month > b.month) return 1;
                return 0;
            })
            .map((data) => data.deal);

        dealDatasets.push({
            label: productTypes[productType],
            data: dealData,
            backgroundColor: backgroundColors[productType]
        });

        let nominalData = pipelineData
            .filter((data) => data.productType === productTypes[productType])
            .sort((a, b) => {
                if (a.month < b.month) return -1;
                if (a.month > b.month) return 1;
                return 0;
            })
            .map((data) => data.nominal);

        nominalDatasets.push({
            label: productTypes[productType],
            data: nominalData,
            backgroundColor: backgroundColors[productType],
            hoverOffset: 4,
        });
    }

    const chartData = {
        labels: labels,
        datasets: dealDatasets
    };

    const pieChartData = {
        labels: productTypes,
        datasets: [
            {
                label: 'Jumlah Nominal',
                data: pipelineData.filter((data) => data.month === 1).map((data) => data.nominal),
                backgroundColor: backgroundColors,
            }
        ]
    };

    return (
        <>
            <div className="flex flex-col">
                <p>2023</p>
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
                <p>Januari</p>
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

function shuffle<T>(arr: T[]) {
    return arr.sort(() => Math.random() - 0.5);
}

function randomColor({count = 1} = {}) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
    return colors;
}