import {Field, Form} from "react-final-form";
import React from "react";
import style from "../ProfileInfo.module.scss";


let ProfileContactForm = ({toggleEditMode, contacts}) => {
    return (
        <Form  onSubmit={formData => {
            console.log(formData)
        }}>
            {({handleSubmit}) => (<form className={style.contacts} onSubmit={handleSubmit}>
                {Object.keys(contacts).map(key => (<Field key={key}
                                                          name={key}
                                                          initialValue={contacts[key]}
                    >{({input, meta}) => (
                        <div className={style.field}>
                            <label >{key}</label>
                            <input  type="text" {...input}/>
                            {meta.touched && meta.error && <span>{meta.error}</span>}
                        </div>
                    )}</Field>
                ))}
                <button type={`submit`}>Submit</button>
                <button onClick={() => {
                    toggleEditMode(false)
                }}>Return
                </button>
            </form>)}
        </Form>

    )
}

let p = ({contacts}) => {
    return (
        <div className={style.contacts}>
            <p><b>Contacts</b></p>
            <div>
                {Object.keys(contacts).map(key => (<Field key={key}
                                                          name={key}
                    >{({input, meta}) => (
                        <div>
                            <label>Text</label>
                            <input type="text" {...input}/>
                            {meta.touched && meta.error && <span>{meta.error}</span>}
                        </div>
                    )}</Field>
                ))}
            </div>

        </div>

    )
}

export default ProfileContactForm