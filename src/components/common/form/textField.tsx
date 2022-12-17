import React, { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

interface TextFieldProps {
    type: string;
    name: string;
    placeholder?: string;
    value: string | number;
    handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
    handleFocus?(): void;
    label?: string;
    error?: string;
}

const TextField = ({
    type,
    name,
    placeholder,
    value,
    handleChange,
    handleFocus,
    label,
    error
}: TextFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const disableWheel = () => {
        (document.activeElement as HTMLInputElement).blur();
    };

    return (
        <>
            {label && (
                <label className="inputLabel" htmlFor={name}>
                    {label}
                </label>
            )}
            <input
                className={
                    "input" +
                    (error ? " input_error" : "") +
                    (type === "password" ? " input_password" : "")
                }
                type={showPassword ? "text" : type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                autoComplete="off"
                onWheel={disableWheel}
            />
            {type === "password" && (
                <div
                    className="showPasswordButton"
                    onClick={() => setShowPassword((prevState) => !prevState)}
                >
                    {showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </div>
            )}
            {error && <div className="inputError">{error}</div>}
        </>
    );
};

export default TextField;
