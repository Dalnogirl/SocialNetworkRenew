import React from 'react';
import {Field, Form} from "react-final-form";
import {maxLength} from "../../../../utilits/validators";
import styles from './PostTextarea.module.scss'

export let PostTextarea = (props) => {
    return (<Form
            onSubmit={formData => {
                props.addPost(formData.postText)
            }}>
            {({handleSubmit}) => (<form action="" onSubmit={handleSubmit}>
                <Field name={`postText`}
                       placeholder={`Say something`}
                       component={`textarea`}

                       validate={maxLength(10)}>
                    {({input, meta, placeholder}) => (
                        <div className={styles.textareaAndLabel}>
                            <label>Enter your post here!</label>
                            <textarea placeholder={`post should be really short`} className={styles.textarea} {...input} />
                            <div>
                                {meta.error && meta.touched && meta.error}
                            </div>
                        </div>
                    )}
                </Field>
                <button>Submit</button>
            </form>)}
        </Form>
    )
}