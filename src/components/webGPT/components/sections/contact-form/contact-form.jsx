import { useMemo } from "react";
import Form from "../../common/form/form";

const ContactForm = ({
    inputs = [
        {
            "label": "Full Name",
            "type": "text",
            "validation": "required",
            "name": "full_name",
            "placeholder": "e.g. John Sharma",
            "width": "100%"
        },
        {
            "label": "Email",
            "type": "text",
            "validation": "email",
            "name": "email",
            "placeholder": "e.g. john@example.com",
            "width": "100%"
        },
        {
            "label": "Describe your query",
            "type": "textarea",
            "placeholder": "e.g. Can you please help me?",
            "name": "description",
            "width": "100%"
        }
    ],
    id = "",
    isEmailRequired = true,
    isMessageRequired = true,
    submitButtonStyle = "primary",
    title = "Contact Us",
}) => {
    let _inputs = useMemo(() => {
        return inputs.filter((el) => {
            if (!isEmailRequired && el.name === "email")
                return false
            if (!isMessageRequired && el.name === "description")
                return false
            return true
        })
    }, [inputs, isEmailRequired, isMessageRequired])
    return (
        <Form
            id={id}
            inputs={_inputs}
            submitButtonStyle={submitButtonStyle}
            title={title}
            emailTemplateId={"template_vhvk6p6"}
            method={"email"}
            submitButtonBgColor={"black"}
        />
    )
}

export default ContactForm;