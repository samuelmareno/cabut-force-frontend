export type PipelineResponse = {
    id: string;
    nip: string;
    name: string;
    phoneNumber: string;
    address: string | null;
    status: string;
    productType: ProductType;
    prospectDate: number;
    referralUser: string;
}

export type CreatePipelineRequest = {
    nip: string;
    name: string;
    phoneNumber: string;
    address: string | null;
    status: string;
    productType: number;
    prospectDate: number;
}

export type UpdatePipelineRequest = {
    id: string;
    nip: string;
    name: string;
    phoneNumber: string;
    address: string | null;
    status: string;
    productType: number;
    prospectDate: number;
}

export type TablePipelineModel = {
    id: string;
    nip: string;
    name: string;
    phoneNumber: string;
    address: string | null;
    status: string;
    productType: ProductType;
    prospectDate: number;
    day: string;
    referralUser: string;
}

type ProductType = {
    id: number;
    name: string;
}