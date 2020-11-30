import React from "react";
import {Field, Form} from "react-final-form";
import style from './Login.module.scss'
import {required} from "../../utilits/validators";
import {Redirect} from "react-router-dom";

export let Login = (props) => {
    if (props.isAuth) return <Redirect to={`/profile`}/>
    else return (<Form
        onSubmit={(formData) => {
            props.loginAuthorize(formData)
        }}>
        {({handleSubmit}) => (<form action="" onSubmit={handleSubmit}
                                    className={style.form}>
            <Field name={`email`}
                   placeholder={`Email`}

                   validate={required}>
                {({input, meta, placeholder}) => {
                    return <div>
                        <input className={meta.error && meta.touched && style.errorInput} {...input}
                               placeholder={placeholder}/>
                        <span className={style.error}>
                            {meta.error && meta.touched && meta.error}
                        </span>
                    </div>
                }}
            </Field>


            <Field name={`password`} placeholder={`Password`} type={`password`} validate={required}>
                {(fieldState) => {
                    return <div className={fieldState.meta.active ? `active` : ``}>
                        <input  {...fieldState.input}
                                className={fieldState.meta.error && fieldState.meta.touched && style.errorInput}
                                placeholder={fieldState.placeholder}/>
                        <span className={style.error}>
                            {fieldState.meta.error && fieldState.meta.touched &&
                            <span className={style.error}>{fieldState.meta.error}</span>}
                        </span>
                    </div>
                }}</Field>

            <div>
                <Field name={`rememberMe`} component={`input`} type={`checkbox`}/>
                Remember Me
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>)}
    </Form>)
}





