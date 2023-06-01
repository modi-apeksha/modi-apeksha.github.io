import { useCallback, useState, useEffect } from "react";
import CustomInput from "../custom-input/custom-input";
import { sendEmail } from "../../../utils/mailer";
import Spinner from "../spinner/spinner";
import { useNotification } from "../../../hooks/NotificationContext";
import { validate } from "../../../utils/helpers";
import "./form.scss";
import Button from "../Button/Button";


const Form = ({
    inputs,
    method = "post",
    emailTemplateId = "",
    submitButtonLabel = "Submit",
    submitButtonBgColor = "",
    submitButtonTextColor = "",
    submitButtonBorder = ""
}) => {

    const [state, setState] = useState({});
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const { setNotification } = useNotification();

    useEffect(() => {
        if (error)
            setNotification({ type: "error", detail: error });
    }, [error]);

    const handleChange = useCallback(({ name, value }) => {
        let s = { ...state, [name]: value };
        setState(s);
    }, [state]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        let values = {};
        for (let el of inputs) {
            let validation = el.validation;
            let value = state[el.name];
            if (validation) {
                let isValid = validate(value, validation, el.label)
                if (isValid !== true) {
                    console.log("isValid", isValid);
                    setError(isValid);
                    return;
                }
            }
            values[el.name] = value;
        }

        handleActions(values);
    }, [state, inputs]);

    const handleActions = useCallback((values) => {
        switch (method) {
            case "post":
                break;
            case "email":
                handleSendEmail(values);
                break;
            default:
                console.log("values", values);
        }
    }, [method]);

    const handleSendEmail = useCallback(async (values) => {
        try {
            setLoading(true);
            if (!emailTemplateId) {
                throw new Error("Template Id is required to send form data as email");
            }
            await sendEmail(emailTemplateId, values);
            setNotification({ type: "success", detail: "Successfully sent email" });
        } catch (err) {
            console.log(err);
            setError(JSON.stringify(err));
            
        } finally {
            setLoading(false);
            setState({});
        }
    }, []);

    return (
        <form className='form'>
            {inputs?.map((el, i) =>
                <label key={i} style={{ width: el.width || "" }}>
                    <span>
                        {el.label}
                    </span>
                    <CustomInput
                        {...el}
                        value={state[el.name] || ""}
                        onChange={handleChange}
                    />
                </label>
            )}
            <div className="btn-container">
                <Button 
                    bgColor={submitButtonBgColor} 
                    textColor={submitButtonTextColor}
                    borderRadius={submitButtonBorder || 5}
                    onClick={handleSubmit}
                >
                    {loading ? <Spinner size={1} /> : submitButtonLabel}
                </Button>
            </div>
        </form>
    )
}

export default Form;