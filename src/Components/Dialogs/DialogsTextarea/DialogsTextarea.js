import React from "react";
import {Field, Form} from "react-final-form";
import {required} from "../../../utilits/validators";

export let DialogsTextarea = (props) => {
    return (
        <Form onSubmit={(formData) => {
            props.addMessage(formData.messageText)
        }}>
            {(props) => (<form onSubmit={props.handleSubmit}>
                <Field
                    name={`messageText`}
                    component={`textarea`}
                validate={required}>

                    {({input, meta}) => (<div>
                            <textarea {...input} cols="30" rows="10">
                            </textarea>
                            <div>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                        </div>

                    )}
                </Field>
                <button>Send</button>
            </form>)}
        </Form>
    )
}






