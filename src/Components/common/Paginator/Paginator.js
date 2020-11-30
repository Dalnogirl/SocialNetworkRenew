import style from "../../Users/Users.module.scss";
import React from "react";

let Paginator = ({currentPage, onButtonClick, totalUsersCount, usersOnPage}) => {
    let buttons = []
    let buttonsCount = Math.ceil(totalUsersCount / usersOnPage)
    for (let i = 1; i <= buttonsCount; i++) {
        buttons.push(i)
    }
    return <div className={style.buttonsContainer}>

        {buttons.map(i => <button className={currentPage === i && style.active}
                                  onClick={() => {
                                      onButtonClick(i)
                                  }}>{i}</button>)}
    </div>
}

export default Paginator