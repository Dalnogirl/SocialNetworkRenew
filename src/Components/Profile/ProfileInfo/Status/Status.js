import style from "../ProfileInfo.module.scss";
import React, {useEffect, useState} from "react";


let Status = (props) => {
    let [editModeFlag, setEditMode] = useState(false)
    let [statusText, setStatusText] = useState(props.status)

    useEffect(() => {
        setStatusText(props.status)
    }, [props.status])


    return <div className={style.status}>
        {editModeFlag
            ?
            <div>
                <input autoFocus={true}
                       onBlur={_ => {
                           setEditMode(false)
                           props.updateUserStatus(statusText)
                       }}
                       className={style.status}
                       value={statusText}
                       onChange={(e) => {
                           setStatusText(e.currentTarget.value)
                       }}>
                </input>
            </div>

            : <div className={style.status} onClick={() => {
                setEditMode(true)
            }}
            >
                <span>{statusText}</span>
            </div>}


    </div>

}

export default Status
