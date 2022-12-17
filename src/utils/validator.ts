import { IStringObject, IValidateSettings } from "../models";

const validator = (dataEx: IStringObject, config: IValidateSettings) => {
    const errors: IStringObject = {};

    function validate(
        validateMethod: string,
        data: string,
        config: IStringObject
    ) {
        let statusValidate;

        if (validateMethod === "isRequired") {
            if (typeof data === "boolean") {
                statusValidate = !data;
            } else {
                statusValidate = data.trim() === "";
            }
        }
        if (validateMethod === "isEmail") {
            const emailRegExp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
            statusValidate = !emailRegExp.test(data);
        }
        if (validateMethod === "isValidPassword") {
            const passwordRegExp =
                /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[а-яa-z])(?=.*[А-ЯA-Z])[0-9а-яa-zА-ЯA-Z!@#$%^&*]{8,}/g;
            statusValidate = !passwordRegExp.test(data);
        }
        if (validateMethod === "isNameForUrl") {
            const nameForUrlRegExp = /^[\w-.]+$/;
            statusValidate = !nameForUrlRegExp.test(data);
        }
        if (statusValidate) return config.message;
    }

    for (const fieldName in dataEx) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                dataEx[fieldName],
                config[fieldName][validateMethod]
            );

            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }

    return errors;
};

export default validator;
