import style from './Paginator.module.scss'
import React from "react";

let Paginator = ({
                     currentPage, onButtonClick, totalUsersCount, itemsOnPage,
                     portionSize
                 }) => {

    let buttons = []
    let buttonsCount = Math.ceil(totalUsersCount / itemsOnPage)
    for (let i = 1; i <= buttonsCount; i++) {
        buttons.push(i)
    }
    let leftButtonIndex = currentPage === 1 ? currentPage - 1 : currentPage - 2

    let lastPage = Math.ceil(totalUsersCount / portionSize)




    return (
        <div className={style.buttonsContainer}>

                {currentPage > 1 && <div className={style.button}  onClick={() => {
                    onButtonClick(1)
                }}>{`<`}</div>}
                {buttons.slice(leftButtonIndex, leftButtonIndex + portionSize)
                    .map(i => <div
                        className={currentPage === i && style.active }
                        className={style.button}

                        onClick={() => {
                            onButtonClick(i)
                        }}>{i}</div>)}

                {currentPage < Math.ceil(totalUsersCount / portionSize) && <div className={style.button} onClick={() => {
                    onButtonClick(Math.ceil(totalUsersCount / portionSize))
                }}>{`>`}</div>}

        </div>)
}

export default Paginator