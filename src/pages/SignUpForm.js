import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import Input from "./components/common/Input";
import RadioInput from "./components/common/RadioInput";
import SelectInput from "./components/common/SelectInput";
import {useRouter} from "next/router";
import CheckBoxInput from "./components/common/CheckBoxInput";

const signUpForm = () => {
    const router = useRouter()
    const [formValues, setFormValues] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3001/users/1').then(res => {
            setFormValues(res.data)
        }).catch(err => {
            console.log(err)
        })

    }, [])

    const initialValues = {
        name: "",
        email: "",
        password: "",
        phone: "",
        passwordConfirm: "",
        gender: "",
        nationality: "",
        intersts: [],
        terms: false
    }
    const radioOption = [
        {label: "man", value: "0"},
        {label: "woman", value: "1"},
    ]

    const checkBoxOption = [
        {label: "Next js", value: "Next js"},
        {label: "Nodejs", value: "Nodejs"},
    ]

    const selectOption = [
        {label: "select nationality", value: ""},
        {label: "iran", value: "IR"},
        {label: "germany", value: "GER"},
        {label: "USA", value: "USA"},
    ]
    const onSubmit = (values) => {
        console.log(values)
        axios.post('http://localhost:3001/users', values).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('نام اجباری میباشد').min(3, 'طول نام نباید کمتر از 3 کارکتر باشد'),
        email: Yup.string().email('ایمیل را به درستی وارد کنید').required('ایمیل اجباری میباشد'),
        password: Yup.string().required('رمز اجباری میباشد').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "باید شامل 8 نویسه، یک حروف بزرگ، یک حروف کوچک، یک عدد و یک نویسه خاص باشد"
        ),
        phone: Yup.string().required('شماره اجباری میباشد').matches(/^[0-9]{11}$/, "تلفن همراه نامعتبر هست").nullable(),
        passwordConfirm: Yup.string().required('تکرار پسورد اجباری میباشد').oneOf([Yup.ref('password'), null], 'تکرار کلمه ی عبور برابری ندارد!'),
        gender: Yup.string().required('انتخاب جنسیت مهم است'),
        nationality: Yup.string().required('انتخاب ملیت اجباری است'),
        intersts: Yup.array().min(1).required('انتخاب علاقه مندی ها اجباری است'),
        terms: Yup.boolean().required('لطفا قوانین سایت را قبول کنید').oneOf([true], 'قوانین سایت را تایید کنید!'),
    })

    const formik = useFormik({
        initialValues: formValues || initialValues,
        // initialValues: initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true
    })
    // console.log(formik.values)
    return <>
        <form onSubmit={formik.handleSubmit}>

            <Input formik={formik} name={'name'} label={'name'}/>
            <Input formik={formik} name={'email'} label={'email'}/>
            <Input formik={formik} name={'phone'} label={'phone'}/>
            <Input formik={formik} name={'password'} label={'password'} type={'password'}/>
            <Input formik={formik} name={'passwordConfirm'} label={'password Confirm'} type={'password'}/>

            <RadioInput name={'gender'} formik={formik} radioOption={radioOption}/>

            <SelectInput selectOption={selectOption} formik={formik} name={'nationality'}/>

            <CheckBoxInput name={'intersts'} formik={formik} checkBoxOption={checkBoxOption}/>

            <div className="form-control">

                <input type="checkbox"
                       id={'terms'}
                       name={'terms'}
                       value={true}
                       onChange={formik.handleChange}
                       checked={formik.values.terms}/>
                <label htmlFor={'terms'}>قوانین سایت را تایید کنید</label>

                {
                    formik.errors.terms && formik.touched.terms && <div className={'error'}>{formik.errors.terms}</div>
                }
            </div>

            {/*<button onClick={() => setFormValues(formValues)}>load data</button>*/}
            <button type={'submit'} disabled={!formik.isValid}>submit</button>
        </form>
    </>
}
export default signUpForm