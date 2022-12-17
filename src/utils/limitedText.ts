const limitedText = (text: string, limit: number) =>
    text.length < limit ? text : text.slice(0, limit) + "...";

export default limitedText;
