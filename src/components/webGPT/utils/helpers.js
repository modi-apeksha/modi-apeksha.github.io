import strformat from "strformat";

export const validate = (value, validation, name) => {
    let error = "";
    const validators = {
        "email" : (email) => {
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            error = "{name} is not a valid email."
            return re.test(String(email).toLowerCase());
        },
        "number" : (number) => {
            var re = /^\d+$/;
            error = "{name} is not a valid number."
            return re.test(Number(number));
        },
        "alpha" : (value) => {
            var re = /^[A-Z]+$/i;
            error = "{name} must be alphabatical only."
            return re.test(value);
        },
        "alpha_space": (value) => {
            var re = /^[a-zA-Z ]*$/;
            error = "{name} must be alphabatical only."
            return re.test(value);
        },
        "alphanumeric": value => {
            var re = /^[a-z0-9]+$/i;
            error = "{name} must be alphanumeric."
            return re.test(value);
        },
        "min_val" : (val, min_char) => {
            min_char = min_char.trim();
            error = `{name} must be minimum of ${min_char} characters long.`
            return val && val.length >= min_char;
        },
        "max_val" : (val, max_char) => {
            max_char = max_char.trim()
            error = `{name} must be maximum of ${max_char} characters long.`
            return val && val.length <= max_char
        },
        "regex" : (val, regex) => {
            error = "REGEX";
            try{
                return regex.test(val);
            }catch(err){
                return true;
            }
        },
        "required" : (val) => {
            error = "{name} is required." 
            return val && String(val).trim() !== "";
        },
        "url": (string) => {
            // eslint-disable-next-line
            var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            error = "{name} is not a valid url."
            return (res !== null)
        },
        "float": (string) => {
            var res = value.match(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/);
            error = "{name} must be a valid floating number."
            return (res !== null);
        }
    };

    if(!validation){
        return true;
    }


    let v = {};

    if(typeof validation === 'object' && !Array.isArray(validation)){
        v = validation;
    }else{
        if(validation.includes("||")){
            validation = validation.split("||");
        }else if(typeof validation == 'string'){
            validation = [validation];
        }

        for(let val of validation){
            val = val.split(":");
            v[val[0]] = val[1] || true;
        }
    }

    let flag = true;

    loop1:
    for(let key in v){
        switch(key){
            case "min_val":
            case "max_val":
            case "regex":
                const vd = v[key];
                flag = validators[key](value, vd);
                break loop1;
            default:
                if(validators[key] && !validators[key](value)){
                    flag = false;
                    break loop1;
                }
        }
    }

    if(flag){
        return true;
    }

    return strformat(error, {name: name});
};


export const clearStorage = () => {
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem("persist:root");
}

export function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    console.log(element, elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } 