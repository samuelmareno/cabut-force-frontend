interface WebResponse<T> {
    status: string;
    data: T;
    code: number;
}
export default WebResponse;