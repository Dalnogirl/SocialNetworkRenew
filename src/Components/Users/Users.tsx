import React from "react";
import style from "./Users.module.scss";
import UserCard from "./UserCard/UserCard";
import userImage from "../../assets/images/64495.png";
import Paginator from "../common/Paginator/Paginator";
import {FilterType, UserType} from "../../redux/reducers/users-reducer";
import {useFormik} from "formik";

type PropsType = {
    users: Array<UserType>
    currentPage: number
    totalUsersCount: number
    usersOnPage: number
    asyncInProgress: Array<number>

    getUsers: (currentPage: number, usersOnPage: number, filter: FilterType) => void
    followUser: (userId: number) => void
    unfollowUser: (userId: number) => void
    onButtonClick: (currentPage: number) => void
}

let Users: React.FC<PropsType> = ({
                                      users, currentPage, onButtonClick, getUsers,
                                      totalUsersCount, usersOnPage, asyncInProgress,
                                      followUser, unfollowUser
                                  }) => {
    return (
        <div className={style.users}>
            <Paginator currentPage={currentPage}
                       onButtonClick={onButtonClick}
                       totalUsersCount={totalUsersCount}
                       itemsOnPage={usersOnPage}
                       portionSize={usersOnPage}
            />
            <div className={style.searchForm}>
                <SearchForm getUsers={getUsers}/></div>
            {users.map((u) => <UserCard
                //className={style.userCard}
                followed={u.followed}
                userImage={u.photos.small ? u.photos.small : userImage}
                userName={u.name}
                id={u.id}
                asyncInProgress={asyncInProgress}
                followUser={followUser}
                unfollowUser={unfollowUser}/>)}
        </div>)

}

type SearchFormProps = {
    getUsers: (currentPage: number, usersOnPage: number, filter: FilterType) => void
}
const SearchForm: React.FC<SearchFormProps> = ({getUsers}) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            search: '',
            friend: null
        },
        onSubmit: values => {
            getUsers(1, 9, {term: values.search, friend: values.friend})
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <select onChange={formik.handleChange} name={`friend`}>
                <option value="null" label="Show All">Show All</option>
                <option value="true" label="Show Friends">Show Friends</option>
            </select>
            <input
                id="search"
                name="search"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.search}
            />
            <button type="submit">Search</button>
        </form>
    )
}
// @ts-ignore
export default Users