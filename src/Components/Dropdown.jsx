import React from 'react'

function Dropdown({ data, initialValue, setValue, type, selectedCountry, prevDropValue, bindNextDropdown }) {
    const selectionChanged = (e) => {
        setValue(e.target.value)
        if (type === "Country") {
            bindNextDropdown(e.target.value);
        }
        else if (type === "State") {            
            setValue(e.target.value)
            bindNextDropdown(selectedCountry, e.target.value);
        }
    }
    return (
        <select onChange={selectionChanged} value={initialValue} 
        disabled={(prevDropValue === "-1") && (type !== "Country") ? true : false}
        style={{height:"30px"}}>
            <option value="-1" >Select {type}</option>
            {data.length > 0 &&
                data.map((item, index) => (
                    <option value={item} key={index}>{item}</option>
                ))}
        </select>
    )
}

export default Dropdown