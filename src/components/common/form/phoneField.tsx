import React, { useState } from "react";

interface PhoneFieldProps {
    name: string;
    value: string;
    label: string;
    error: string;
    handleChangePhone(value: string): void;
}

const PhoneField = ({
    name,
    value,
    label,
    error,
    handleChangePhone
}: PhoneFieldProps) => {
    const [oldValue, setOldValue] = useState(value);

    const handleFocus = () => {
        if (value.length <= 4) {
            handleChangePhone("+7 (");
        }
    };

    const handleBlur = () => {
        if (value.length <= 4) {
            handleChangePhone("");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (newValue.length > oldValue.length) {
            const numbers = getNumbers(newValue);
            const convertedNumbers = convertNumbers(numbers);
            handleChangePhone(convertedNumbers);
            setOldValue(convertedNumbers);
        } else {
            if (oldValue.length - newValue.length === 1 && oldValue.slice(-1) === "-") {
                handleChangePhone(newValue.slice(0, -1));
                setOldValue(newValue.slice(0, -1));
            } else {
                if (oldValue.length - newValue.length === 1 && oldValue.slice(-1) === " ") {
                    handleChangePhone(newValue.slice(0, -2));
                    setOldValue(newValue.slice(0, -2));
                } else {
                    const numbers = getNumbers(newValue);
                    const convertedNumbers = convertNumbers(numbers);
                    handleChangePhone(convertedNumbers);
                    setOldValue(convertedNumbers);
                }
            }
        }
    };

    const getNumbers = (value: string) => {
        const unclearedNumbers = value.slice(4).split("");

        const cleardArr: string[] = [];
        unclearedNumbers.forEach(item => {
            if (isFinite(+item) && item !== " ") {
                cleardArr.push(item.toString());
            }
        });

        return cleardArr.join("");
    };

    const convertNumbers = (value: string) => {
        let result = "+7 (";
        for (let i = 0; i < value.length; i++) {
            const char = value[i];
            result += char;
            if (i === 2) {
                result += ") ";
            }
            if (i === 5 || i === 7) {
                result += "-";
            }
            if (i === 9) break;
        }
        return result;
    };

    return (
        <>
            <label className="inputLabel" htmlFor={name}>
                {label}
            </label>
            <input
                className={
                    "input" +
                    (error ? " input_error" : "")
                }
                type="text"
                name={name}
                value={value}
                onChange={handleChange}
                autoComplete="off"
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {error && <div className="inputError">{error}</div>}
        </>
    );
};

export default PhoneField;
