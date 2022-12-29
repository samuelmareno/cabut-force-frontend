export default interface WebResponse<T> {
    status: string;
    data: T;
    code: number;
}