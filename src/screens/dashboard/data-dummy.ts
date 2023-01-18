type PipelineData = {
    month: number,
    productType: string,
    deal: number,
    nominal: number
}

export default function getDummyData(): PipelineData[] {
    const data: PipelineData[] = [];
    const productTypes = ["PLO Horizontal", "PLO Vertical", "PLO Pensiunan", "PLO Swasta", "KPR", "KKB", "KMG"];

    for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
        for (let productTypeIndex = 0; productTypeIndex < productTypes.length; productTypeIndex++) {
            data.push({
                month: monthNumber,
                productType: productTypes[productTypeIndex],
                deal: Math.floor(Math.random() * 20) + 1,
                nominal: Math.floor(Math.random() * 1000000000) + 1000000
            });
        }
    }
    return data;
}
