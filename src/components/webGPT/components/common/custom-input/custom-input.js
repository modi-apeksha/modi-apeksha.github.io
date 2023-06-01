import React, { Component, createRef } from 'react'
import moment from "moment";
import RcSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import CreatableSelect from 'react-select/creatable';

import { 
    validate, 
} from "../../../utils/helpers";
import Axios from "axios";
import axios from "../../../utils/axios";
import Switch from "react-switch";
import format from "strformat";
import { isEqual } from "lodash";

const animatedComponents = makeAnimated();
const CancelToken = Axios.CancelToken;

class   CustomInput extends Component {

    _startDateRef = createRef()
    _endDateRef = createRef();
    _container = createRef();
    waitTime = null

    state = {
        defaultOptions: [],
        isLoading: true
    }

    componentDidMount(){
        let { type, loadOptions, customLoadOptions } = this.props;
        if((type == 'select' || type == 'multiselect') && ((loadOptions && typeof loadOptions == 'object' && loadOptions.endpoint) || (loadOptions == true && customLoadOptions))){
            this.loadOptions(false, this.setOptions)
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        let { type, loadOptions, data } = this.props;
        let nextLoadOptions = prevProps.loadOptions;
        if((type == 'select' || type == 'multiselect') && (loadOptions && typeof loadOptions == 'object' && loadOptions.shouldReloadOptions && loadOptions.endpoint && nextLoadOptions.endpoint && (nextLoadOptions.endpoint != loadOptions.endpoint || !isEqual(data, prevProps.data)))){
            this.loadOptions(false, this.setOptions)
        }
    };
    

    setOptions = (options) => {
        this.setState({
            defaultOptions: options,
            isLoading: false
        })
    }

    loadOptionsOnInputChange = (inputValue) => {
        inputValue && this.loadOptions(inputValue, this.setOptions)
    }

    loadOptions = async (inputValue, cb) => {
        try{
            this.setState({
                isLoading: true
            })

            let { customLoadOptions } = this.props;
            if(customLoadOptions){
                let options = await customLoadOptions(inputValue);
                this.optionsLoaded = true;
                cb(this.getOptions(options));
                return;
            }

            const self = this;
            let time = inputValue ? 1000 : 0;
            if(self.waitTime){
                clearTimeout(self.waitTime)
            }

            if(self.cancel){
                self.cancel();
            }

            const { loadOptions, baseUrl, data } = self.props;
            if(!loadOptions || !loadOptions.endpoint || (!baseUrl && !loadOptions.baseUrl)) return false;
            let url = loadOptions.baseUrl || baseUrl;
            url += loadOptions.endpoint;
            if(url.includes("{") && url.includes("}") && data){
                url = format(url, data);
            }

            if(loadOptions.activeSearch && inputValue && inputValue.trim()){
                if(url.indexOf("?") == -1)
                    url += "?";
                else
                    url += "&";
                
                url += `keyword=${inputValue}`;
            }

            let options = {
                url: url,
                method: 'GET',
                headers: {
                    'accept': "application/json"
                },
                cancelToken: new CancelToken((cancel) => {
                    self.cancel = cancel
                })
            }

            
            self.waitTime = setTimeout(() => {
                axios(options)
                .then(resp => {
                    self.optionsLoaded = true;
                    cb(self.getOptions(resp.data.data));
                })
            }, time);
        }catch(err){
            console.log("Error occured while loading dynamic options", err);
        }
    }

    getOptions = (options) => {
        try{
            if(this.props.customOptions){
                return this.props.customOptions
            }
            if(!options)
                options = this.props.options;
            let opts = [];
            if(options && options.length > 0){
                for(let el of options){
                    if(typeof el == 'string') opts.push({label: el, value: el})
                    else if(typeof el == 'object' && el.label &&  el.value !== undefined && el.value !== null) opts.push(el) 
                }
                return opts;
            }
            return opts;
        }catch(err){
            console.log("error while creating options at getOptions at custom input.", err);
        }
    }

    getStartDate(){
        if(this.state && this.state.startDate) return this.state.startDate;
        if(this._startDateRef && this._startDateRef.current) return this._startDateRef.current.value;
        return "";
    }

    onChange = event => {
        let { type, onChange, ...props } = this.props;
        let value;
        let isValid = true;
        // as we are not adding error-input class here so removing it does not makes sense either
        // removeClass(this._container.current, "error-input");
        if(event && event.target && event.target.value){
            value = event.target.value;
            if(type.toLowerCase() == 'daterange' && this.getStartDate()){
                value = {startDate: this.getStartDate(), endDate: value}
            }
            let validation = event.target.getAttribute("validation");
            if(validation && (validation.includes("number") || validation.includes("alpha") || validation.includes("alphanumeric")))
                isValid = validate(value, validation);
        }else if(event && typeof event == 'object' && !Array.isArray(event)){
            value = event.value;
        }else if(Array.isArray(event)){
            value = event.map(el => el.value);
        }
        if(onChange && isValid == true){
            onChange({value, name: this.getInputName(), event});
        }
        //depereciated error-input class in favour of validating only numeric, alpha and alphanumeric values and stopping onChange to trigger if the key contains other then required type of value.
        // else if(!value)
        //     addClass(this._container.current, "error-input")
    }

    handleDateRangeStart = e => {
        this.setState({startDate: e.target.value})
        this._endDateRef && this._endDateRef.current.focus();
    }

    getInputName = () => {
        const { name, label } = this.props;
        let inputName = "";
        if(name) inputName = name;
        else if(label && typeof label == 'string') inputName = label.split(" ").join("_");
        return inputName;
    }

    getMultiSelectaValue = (options) => {
        let { value, defaultValue, loadOptions } = this.props;
        value = value || defaultValue;
        let val = [];
        if(!options) return val;
        
        if(loadOptions && loadOptions.endpoint && value){
            if(!Array.isArray(value)){
                value = [value];
            }
            return this.getOptions(value);
        }

        for(let option of options){
            if(Array.isArray(value)){
                for(let v of value){
                    if(option.value == v){
                        val.push(option);
                    }
                }
            }else{
                if(option.value == value){
                    val.push(option);
                }
            }
        }

        return val;
    }

    getInput = () => {
        try{
            let { 
                    type,
                    value,
                    defaultValue,
                    checked,
                    defaultChecked,
                    placeholder,
                    label,
                    minDate,
                    maxDate,
                    dateFormat,
                    readOnly,
                    validation,
                    loadOptions,
                    loadAsync,
                    customLoadOptions,
                    cols,
                    rows,
                    id,
                    autoComplete,
                    additionalInputProps,
                    createable
                } = this.props;
            type = type.toLowerCase();
            let inputName = this.getInputName()
            let p = {
                type: type,
                className: `custom-input ${type}-input form-control`,
                name: inputName,
            };
            
            if(additionalInputProps){
                p = {...p, ...additionalInputProps} 
            }

            if(autoComplete){
                p["autoComplete"] = autoComplete;
            }


            if(id)
                p["id"] = id
            if(this.props.hasOwnProperty("readOnly") && readOnly !== false)
                p.readOnly = true;

            if( type == 'text' || 
                type == 'password' || 
                type == 'checkbox' || 
                type == 'date' || 
                type == 'number' || 
                type == 'email' || 
                type == 'textarea'
            ){
                if(placeholder) p.placeholder = placeholder;
                else if(label) p.placeholder = label;
                
                if(value || value == "") 
                    p.value = value;
                else if(defaultValue) p.defaultValue = defaultValue;
    
                if(type == 'checked'){
                    if(checked) p.checked = true;
                    else if(defaultChecked) p.defaultChecked = true;
                }

                if(type == 'date'){
                    if(minDate) p.min = minDate;
                    if(maxDate) p.max = maxDate;
                    if(p.value) p.value = moment(p.value, dateFormat).format("MM/DD/YYYY");
                    if(p.defaultValue) p.defaultValue = moment(p.defaultValue, dateFormat).format("MM/DD/YYYY");
                }

                if(validation && typeof validation == 'string'){
                    validation = validation.split("||");
                }

                if(type == 'number' || type == 'email'){
                    if(!validation) validation = [];
                    validation.push(type);
                    p["type"] = 'text';
                }
                
                if(validation && validation.length > 0) {
                    p["validation"] = validation.join("||");
                }

                if(type == 'textarea'){
                    if(cols)
                        p["cols"] = cols;
                    if(rows)
                        p["rows"] = rows;
                    
                    if(this.props.hasOwnProperty("resize") && this.props.resize == false)
                        p["style"] = {resize: "none"}

                    return <textarea {...p} onChange={this.onChange} />
                }

                return <input {...p} onChange={this.onChange}/>
            }

            if(type.toLowerCase() == 'switch'){
                return  <Switch 
                            onChange={(e) => this.onChange({value: e})} 
                            className={"switch-input custom-input"} 
                            checked={this.props.value} 
                            {...this.props.switchProps}
                        />
            }

            if(type.toLowerCase() == 'daterange'){
                let startP = { 
                    onChange: this.handleDateRangeStart
                };
                
                let endP = {
                    onChange: this.onChange
                }
                p.type = 'date'
                if(defaultValue && defaultValue.startDate) startP.defaultValue = moment(defaultValue.startDate, dateFormat).format("YYYY-MM-DD");
                if(defaultValue && defaultValue.endDate) endP.defaultValue = moment(defaultValue.endDate, dateFormat).format("YYYY-MM-DD");
                if(minDate) p.min = minDate;
                if(maxDate) p.max = maxDate;

                return  <div className="date-range-container">
                            <div className="start-date-container form-group">
                                <input {...startP} {...p} ref={this._startDateRef}/>
                            </div>
                            <div className="end-date-container">
                                <input {...endP} {...p} ref={this._endDateRef}/>
                            </div>
                        </div>
            }

            
            let options = this.getOptions();
            if(options && options.length > 0 || (loadOptions && typeof loadOptions == 'object' && loadOptions.endpoint) || (loadOptions && loadAsync)){
                if(type == "radio"){
                    return  <div className={`radio-group ${p.readOnly ? "read-only" : ""}`}>
                                {options && options.map((el,i) => 
                                    <span key={el.label + i}>
                                        <input type="radio" value={el.value} name={inputName} onChange={this.onChange}/> {el.label}
                                    </span>
                                )}
                            </div>
                }

                if(type == 'select' || type == 'multiselect'){
                    let sp = {};
                    let Select = RcSelect;
                    if(createable){
                        Select = CreatableSelect
                    }
                    if(loadOptions){
                        // Select = AsyncSelect;
                        sp = {
                            onInputChange: this.loadOptionsOnInputChange,
                            options: this.state.defaultOptions,
                            isLoading: this.state.isLoading
                        }
                    }

                    if(this.props.components){
                        sp["components"] = this.props.components;
                    }

                    if(additionalInputProps){
                        sp = {...sp, ...additionalInputProps}
                    }

                    if(value !== undefined || defaultValue != undefined) sp.value = this.getMultiSelectaValue(options);
                    else sp.value = "";
                    if(type == "multiselect"){
                        sp.isMulti = true;
                        sp.closeMenuOnSelect= false;
                    } 
                    return  <Select
                                id={id || ""}
                                onChange={this.onChange}
                                components={animatedComponents}
                                options={options}
                                name={inputName}
                                isDisabled={p.readOnly}
                                classNamePrefix="react-select"
                                {...sp}
                            />
                }
            }

            return null;


        }catch(err){
            console.log("An error occured at getInput in Custom input", err);
        }
    }

    render = () => {
        const { className  } = this.props;
        return (
            <div className={className} ref={this._container}>
                {this.getInput()}
            </div>
        )
    }
}

export default CustomInput


/*

    input type:

        text
        checkbox,
        password
        date,
        number
        alpha
        alphanumeric
        
        radio

        select,
        multiselect
        dateRange


        events:
            onChange, onBlur, onFocus 

        options: [],
        loadOptions: {
            endpoint: "someUrl" //mandatory,
            baseUrl,
            header:{}
        }

*/