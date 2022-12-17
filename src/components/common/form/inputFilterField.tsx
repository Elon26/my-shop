import React from "react";
import { BiX } from "react-icons/bi";

interface InputFilterFieldProps {
    type: string;
    name: string;
    className: string;
    value: number;
    subCategoryMinPrice: number;
    subCategoryMaxPrice: number;
    handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
    handleBlur(event: React.ChangeEvent<HTMLInputElement>): void;
    handleClick(): void;
    message: string;
    classNameForMessage: string;
    classNameForClearIcon: string;
}

const InputFilterField = ({
    type,
    name,
    className,
    value,
    subCategoryMinPrice,
    subCategoryMaxPrice,
    handleChange,
    handleBlur,
    handleClick,
    message,
    classNameForMessage,
    classNameForClearIcon
}: InputFilterFieldProps) => {
    const clearFocus = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            (document.activeElement as HTMLElement).blur();
        }
    };

    return (
        <>
            {message && <span className={classNameForMessage}>{message}</span>}
            <input
                type={type}
                name={name}
                className={className}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyUp={clearFocus}
            />
            {((name === "minPriceInput" && value !== subCategoryMinPrice) ||
                (name === "maxPriceInput" &&
                    value !== subCategoryMaxPrice)) && (
                <BiX onClick={handleClick} className={classNameForClearIcon} />
            )}
        </>
    );
};

export default InputFilterField;
