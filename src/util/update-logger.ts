export default function updateLogger(...data: any[]) {
    if (process.env.NODE_ENV !== "production")
        console.log(...data);
}