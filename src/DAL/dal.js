import * as axios from "axios";

let axiosInstance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0`,
    headers: {
        'API-KEY': '6a7c9760-9d90-45ac-927e-50783011885a'
    }
})


export let getUsersAPI = (currentPage = 1, usersOnPage = 10) => {
    return axiosInstance.get(`/users?page=${currentPage}&count=${usersOnPage}`)
        .then(responce => responce.data)
}

export let getProfileByIdAPI = (id) => {
    return axiosInstance.get(`/profile/${id}`)
        .then(response => response.data)
}

export let setAuthDataAPI = () => {
    return axiosInstance.get(`/auth/me`)
        .then(response => response.data)
}

export let followUserAPI = (id) => {
    return axiosInstance.post(`/follow/${id}`)
        .then(response => response.data)
}

export let unfollowUserAPI = (id) => {
    return axiosInstance.delete(`/follow/${id}`)
        .then(response => response.data)
}


export let profileAPI = {
    getProfile(id) {
        return axiosInstance.get(`/profile/${id}`)
            .then(response => response.data)
    },
    getUserStatus(id) {
        return axiosInstance.get(`/profile/status/${id}`).then(response => response.data)
    },
    updateUserStatus(status) {
        return axiosInstance.put(`/profile/status`, {status})
    },
    updateUserPhoto(photo) {
        let formData = new FormData()
        formData.append('image', photo)
        return axiosInstance.put(`/profile/photo`, formData, {headers: {'Content-type': 'multipart/form-data'}})
    }
}

export let authAPI = {
    loginAuthorize(email, password, rememberMe, captchaUrl) {
        return axiosInstance.post(`/auth/login`, {email, password, rememberMe, captchaUrl})
            .then(response => {
                return response.data
            })
    },
    logout() {
        return axiosInstance.delete(`/auth/login`)
            .then(response => response.data)
    }
}

export let securityAPI = {
    getCaptchaUrl() {
        return axiosInstance.get(`/security/get-captcha-url`).then(response => response.data)
    }
}