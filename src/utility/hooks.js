import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);
    const [precie, setPrecie] = useState("");
    const [currency, setCurrency] = useState("");

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value});
        if(event.target.name === 'precies') {
            setValues({ ...values, precies: [...values.precies, {precie: event.target.value.precie, currency: event.target.value.currency}]});
        }else if(event.target.name === 'category') {
            setValues({ ...values, category: [...values.category, event.target.value]});
        } else if(event.target.name === 'precie') {
            setPrecie(event.target.value);
        } else if(event.target.name === 'currency') {
            setCurrency(event.target.value);
        } else {
            setValues({ ...values, [event.target.name]: event.target.value});
        }
    }


    const addPrecie = () => {
        setValues({ ...values, precies: [...values.precies, {precie, currency}]});
        setPrecie("");
        setCurrency("");
    }

    const onSubmit = (event) => {
        event.preventDefault();
        callback()
        setTimeout(function() {
            window.location.reload();
        }, 2000);
    }

    return {
        addPrecie,
        onChange,
        onSubmit,
        values
    }

}