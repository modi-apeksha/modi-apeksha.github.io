import emailjs from '@emailjs/browser';

export const sendEmail = async (templateId, params) => {
    let result = await emailjs.send(
        process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
        templateId, params, process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY)
    return result;
};