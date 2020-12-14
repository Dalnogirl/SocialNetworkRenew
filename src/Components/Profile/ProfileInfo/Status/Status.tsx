import style from "../ProfileInfo.module.scss";
import React, {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
    status: string | null
    updateUserStatus: (statusText: any) => void
}

let Status: React.FC<PropsType> = ({status, updateUserStatus}) => {
    let [editModeFlag, setEditMode] = useState(false)
    let [statusText, setStatusText] = useState(status)

    useEffect(() => {
        setStatusText(status)
    }, [status])


    return <div className={style.status}>
        {editModeFlag
            ?
            <div>
                <input autoFocus={true}
                       onBlur={_ => {
                           setEditMode(false)
                           updateUserStatus(statusText)
                       }}
                       className={style.status}
                       value={statusText}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
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

// @ts-ignore
export default Status;