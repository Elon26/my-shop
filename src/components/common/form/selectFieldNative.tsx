import React from "react";
import { IStringObject } from "../../../models";

interface SelectFieldProps {
    label?: string;
    name: string;
    value: string;
    options: IStringObject[];
    handleChange(event: React.ChangeEvent<HTMLSelectElement>): void;
}

const SelectFieldNative = ({
    name,
    value,
    options,
    handleChange,
    label
}: SelectFieldProps) => {
    return (
        <>
            {label && (
                <label className="inputLabel" htmlFor={name}>
                    {label}
                </label>
            )}
            <div>
                <select
                    className="select"
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                >
                    {options &&
                        options.map((option) => (
                            <option
                                key={`selectOption-${option.text}-${option.value}`}
                                value={option.value}
                            >
                                {option.text}
                            </option>
                        ))}
                </select>
            </div>
        </>
    );
};

export default SelectFieldNative;
