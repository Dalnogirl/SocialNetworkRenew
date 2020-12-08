import axios from "axios";
import {ProfilePhotos} from "../redux/reducers/profile-reducer";

let axiosInstance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0`,
    headers: {
        'API-KEY': '6a7c9760-9d90-45ac-927e-50783011885a'
    }
})


export let usersAPI = {
    getUsersAPI: (currentPage = 1, usersOnPage = 10) => {
        return axiosInstance.get<GetUsersResponceType>(`/users?page=${currentPage}&count=${usersOnPage}`)
            .then(responce => responce.data)
    },
    setAuthDataAPI: () => {
        return axiosInstance.get<SetAuthDataResponseType>(`/auth/me`)
            .then(response => response.data)
    },
    followUserAPI: (id: number) => {
        return axiosInstance.post<PostDeleteResponseType>(`/follow/${id}`)
            .then(response => response.data)
    },
    unfollowUserAPI: (id: number) => {
        return axiosInstance.delete<PostDeleteResponseType>(`/follow/${id}`)
            .then(response => response.data)
    }
}

type GetUsersResponceType = {
    items: Array<{
        "name": string
        "id": number
        "photos": ProfilePhotos
        "status": string | null
        "followed": false
    }>
    "totalCount": number
    "error": null | string
}
type SetAuthDataResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: {
        id: number
        email: string
        login: string
    }
}
enum ResultCodeEnum {
    Success = 0,
    Error = 1
}
enum ResultCodeEnumWithCaptcha {
    CaptchaIsRequired = 10
}
type GetProfileResponceType = {
    aboutMe: null | string
    contacts: {
        facebook: null | string
        website: null | string
        vk: null | string
        twitter: null | string
        instagram: null | string
        youtube: null | string
        github: string | null
        mainLink: null | string
    },
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: ProfilePhotos
}
type UpdateUserPhotoResponceType = {
    data: {
        photos: ProfilePhotos
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export let profileAPI = {
    getProfile(id: number) {
        return axiosInstance.get<GetProfileResponceType>(`/profile/${id}`)
            .then(response => response.data)
    },
    getUserStatus(id: number) {
        return axiosInstance.get<string>(`/profile/status/${id}`).then(response => response.data)
    },
    updateUserStatus(status: string) {
        return axiosInstance.put<PostDeleteResponseType>(`/profile/status`, {status})
    },
    updateUserPhoto(photo: any) {
        let formData = new FormData()
        formData.append('image', photo)
        return axiosInstance.put<UpdateUserPhotoResponceType>(`/profile/photo`, formData, {headers: {'Content-type': 'multipart/form-data'}})
    }
}
type LoginAuthorizeResponceType = {
    data: {
        email: string
        password: string
        rememberMe: boolean
        captchaUrl: string | null
    }
    messages: Array<string> | null
    resultCode: ResultCodeEnum | ResultCodeEnumWithCaptcha
}
type PostDeleteResponseType = {
    resultCode: ResultCodeEnum
    messages: Array<string>
    data: object
}
export let authAPI = {
    loginAuthorize(email: string, password: string, rememberMe: boolean, captchaUrl: string | null = null) {
        return axiosInstance.post<LoginAuthorizeResponceType>(`/auth/login`, {email, password, rememberMe, captchaUrl})
            .then(response => {
                return response.data
            })
    },
    logout() {
        return axiosInstance.delete<PostDeleteResponseType>(`/auth/login`)
            .then(response => response.data)
    }
}

type GetCaptchaUrlResponceType = {
    url: string
}
export let securityAPI = {
    getCaptchaUrl() {
        return axiosInstance.get<GetCaptchaUrlResponceType>(`/security/get-captcha-url`).then(response => response.data)
    }
}