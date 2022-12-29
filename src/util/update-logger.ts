export default function updateLogger(value: any) {
    if (process.env.NODE_ENV !== "production")
        console.log(value);
}