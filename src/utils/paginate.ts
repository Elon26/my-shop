import { IProduct } from "../models";

const paginate = (items: IProduct[], pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
};

export default paginate;
