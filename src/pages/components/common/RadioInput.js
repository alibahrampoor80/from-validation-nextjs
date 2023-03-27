import React from "react";
const RadioInput = ({label, name, formik, radioOption}) => {

    return <>
        <div className="form-control">
            {
                radioOption.map((item) => (
                    <React.Fragment key={item.value}>
                        <input type="radio" id={item.value} name={name} value={item.value}
                               onChange={formik.handleChange}
                               checked={formik.values[name] === item.value}/>
                        <label htmlFor={item.value}>{item.label}</label>
                    </React.Fragment>
                ))
            }
            {
                formik.errors[name] && formik.touched[name] && <div className={'error'}>{formik.errors[name]}</div>
            }
        </div>
    </>
}
export default RadioInput