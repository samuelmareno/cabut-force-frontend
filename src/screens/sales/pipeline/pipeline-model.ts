export type PipelineResponse = {
    id: string;
    nip: string;
    nik: string;
    name: string;
    phoneNumber: string;
    address: string | null;
    status: string;
    productType: ProductType;
    prospectDate: number;
    referralUser: string;
    nominal: number;
}

export type CreatePipelineRequest = {
    nip: string;
    name: string;
    nik: string;
    phoneNumber: string;
    address: string | null;
    status: string;
    productType: number;
    prospectDate: number;
    nominal: number;
}

export type UpdatePipelineRequest = {
    id: string;
    nip: string;
    nik: string;
    name: string;
    phoneNumber: string;
    address: string | null;
    status: string;
    productType: number;
    prospectDate: number;
    nominal: number;
}

export type TablePipelineModel = {
    id: string;
    nip: string;
    nik: string;
    name: string;
    phoneNumber: string;
    address: string | null;
    status: string;
    productType: ProductType;
    prospectDate: number;
    day: string;
    referralUser: string;
    nominal: number;
}

type ProductType = {
    id: number;
    name: string;
}