import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (event,  key) => {
        if(typeof event === "object" && key === "object"){
            setValues({...values, precies: [...values.precies, event]})
        }else if(key ==="array") {
            setValues({...values, category: event})
        }else {
            setValues({ ...values, [event.target.name]: event.target.value});
        }
    }

    const onSubmit =  (event) => {
        event.preventDefault();
        callback()
        setTimeout(function() {
            window.location.reload();
        }, 2000);
    }

    return {
        onChange,
        onSubmit,
        values
    }

}