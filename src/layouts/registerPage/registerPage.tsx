import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TextField from "../../components/common/form/textField";
import { useAppDispatch } from "../../hooks/reduxHook";
import { IStringObject } from "../../models";
import { singUp } from "../../store/users";
import "../../styles/loginRegisterPage.scss";
import validator from "../../utils/validator";
import { wrapAsyncFunction } from "../../utils/wrapAsyncFunction";
import PhoneField from "../../components/common/form/phoneField";

const defaultData = {
    email: "",
    password: "",
    name: "",
    phone: ""
};

const RegisterPage = () => {
    const history = useHistory();
    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState<IStringObject>(defaultData);
    const [filledForm, setFilledForm] = useState(false);
    const dispatch = useAppDispatch();

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Необходимо ввести имя."
            }
        },
        phone: {
            isRequired: {
                message: "Необходимо ввести номер телефона."
            },
            isPhone: {
                message: "Введите номер телефона полностью."
            }
        },
        email: {
            isRequired: {
                message: "Необходимо ввести email."
            },
            isEmail: {
                message: "Email введен некорректно."
            }
        },
        password: {
            isRequired: {
                message: "Необходимо ввести пароль."
            },
            isValidPassword: {
                message:
                    "Пароль должен содержать не меньше 8 символов, в том числе заглавную и строчную буквы, спецсимвол и число."
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return !Object.keys(errors).length;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleChangePhone = (value: string) => {
        setData((prevState) => ({
            ...prevState,
            phone: value
        }));
    };

    const sendLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilledForm(true);
        const isValid = validate();
        if (isValid) {
            try {
                await dispatch(singUp(data));
                setData(defaultData);
                setFilledForm(false);
                history.push("/my-shop/");
            } catch (e) {
                const error = e as IStringObject;
                setErrors(error);
            }
        }
    };

    useEffect(() => {
        if (filledForm === true) {
            validate();
        }
    }, [data]);

    return (
        <div className="login">
            <h1 className="login__title">Регистрация</h1>
            <form
                className="login__form"
                onSubmit={wrapAsyncFunction(sendLoginForm)}
            >
                <div className="login__input-item">
                    <TextField
                        type="text"
                        label="Имя"
                        name="name"
                        value={data.name}
                        handleChange={handleChange}
                        error={errors.name}
                    />
                </div>
                <div className="login__input-item">
                    <PhoneField
                        label="Телефон"
                        name="phone"
                        value={data.phone}
                        handleChangePhone={handleChangePhone}
                        error={errors.phone}
                    />
                </div>
                <div className="login__input-item">
                    <TextField
                        type="text"
                        label="E-mail"
                        name="email"
                        value={data.email}
                        handleChange={handleChange}
                        error={errors.email}
                    />
                </div>
                <div className="login__input-item">
                    <TextField
                        type="password"
                        label="Пароль"
                        name="password"
                        value={data.password}
                        handleChange={handleChange}
                        error={errors.password}
                    />
                </div>
                <div className="login__button-area">
                    <button className="login__button button" type="submit">
                        Отправить
                    </button>
                </div>
                <div className="login__redirect">
                    <span>Уже есть учётная запись? </span>
                    <Link to={"/my-shop/login/"}>Войти!</Link>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
