const suspend = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default suspend;