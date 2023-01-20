import React from "react";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip} from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import {Bar, Pie} from 'react-chartjs-2'
import generateData from "./data-dummy";

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
            <div className="overflow-x-auto">
                <div className="">
                    <Bar
                        datasetIdKey={'deal_count'}
                        options={
                            {
                                responsive: true,
                            }
                        }
                        data={chartData}
                    />
                </div>
                <p>Januari</p>
                <Pie
                    datasetIdKey={'nominal_count'}
                    width={640}
                    height={640}
                    data={pieChartData}
                    options={
                        {
                            responsive: false,
                        }
                    }
                />
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