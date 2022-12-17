import React from "react";
import _ from "lodash";

interface PaginationProps {
    totalQuantity: number;
    pageSize: number;
    currentPage: number;
    handleClick: (index: number) => void;
}

const Pagination = ({
    totalQuantity,
    pageSize,
    currentPage,
    handleClick
}: PaginationProps) => {
    const pageCount = Math.ceil(totalQuantity / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    const setClassName = (index: number) => {
        const className =
            "reused__paginationItem" +
            (index + 1 === currentPage ? " active" : "");
        return className;
    };

    return (
        <nav>
            <ul className="reused__paginationBody">
                {pages.map((page, index) => (
                    <li
                        key={"page_" + String(page)}
                        className={setClassName(index)}
                        onClick={() => handleClick(index)}
                    >
                        {page}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
