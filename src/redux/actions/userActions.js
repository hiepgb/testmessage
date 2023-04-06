import actionTypes from "../constants/constants"
import axios from "axios"
import ViewActions from "./ViewActions"
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const token = localStorage.getItem('token')

const registerUser = user => async dispatch => {
    dispatch({
        type: actionTypes.USER_SIGNUP_REQUEST,
    })
    try {
        const response = await axios.post('/api/auth/signup', {
            ...user
        })
        dispatch({
            type: actionTypes.USER_SIGNUP_SUCCESS,
            payload: response.data
        })
        window.location.replace('/sign-in')
    }
    catch (err) {
        dispatch({
            type: actionTypes.USER_SIGNUP_FAIL,
            payload: {
                statusCode: err.response.status,
                message: err.response.data
            }
        })
    }
}

const signInUser = user => async dispatch => {
    dispatch({
        type: actionTypes.USER_SIGNIN_REQUEST,
    })
    try {
        const response = await axios.post('/api/auth/signin', {
            ...user
        })

        localStorage.setItem('token', (response.data.token))
        localStorage.setItem('username', (response.data.username))
        localStorage.setItem('role', (response.data.role))
        console.log(user);
        if (user.rememberMe) localStorage.setItem('rememberMe', JSON.stringify(true))
        dispatch({
            type: actionTypes.USER_SIGNIN_SUCCESS,
            payload: response.data
        })

        window.location.replace('/')
    }
    catch (err) {
        dispatch({
            type: actionTypes.USER_SIGNIN_FAIL,
            payload: {
                statusCode: err.response.status,
                message: err.response.data
            }
        })
    }
}

const getListGroups = groupFilterForm => async dispatch => {
    dispatch({
        type: actionTypes.GET_LIST_GROUP_REQUEST

    })
    try {
        if (groupFilterForm) {
            let startDateConvert = null;
            if (groupFilterForm.startDate != null) {
                startDateConvert = groupFilterForm.startDate.getDate() + '/' + (groupFilterForm.startDate.getMonth() + 1) + '/' + groupFilterForm.startDate.getFullYear()
            }
            let endDateConvert = null;
            if (groupFilterForm.endDate != null) {
                endDateConvert = groupFilterForm.endDate.getDate() + '/' + (groupFilterForm.endDate.getMonth() + 1) + '/' + groupFilterForm.endDate.getFullYear()
            }

            let url = 'http://localhost:8888/api/groups/paging?' +
                'pageNumber=' + groupFilterForm.pageNumber + '&size=' + groupFilterForm.pageSize + '&sort=' + groupFilterForm.sort + '&type=' +
                groupFilterForm.type + '&startDate=' + startDateConvert + '&endDate=' + endDateConvert

            const response = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            dispatch({
                type: actionTypes.GET_LIST_GROUP_SUCCESS,
                payload: {
                    listGroups: response.data.content,
                    totalPagesListGroups: response.data.totalPages
                }
            })
        } else {
            let url = 'http://localhost:8888/api/groups'

            const response = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            dispatch({
                type: actionTypes.GET_LIST_GROUP_SUCCESS,
                payload: {
                    listGroups: response.data,
                    totalPagesListGroups: response.data.length
                }
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_LIST_GROUP_FAIL,
            payload: {
                statusCode: error.response.status,
                message: 'Get List Groups Fail'
            }
        })
    }
}

const creatingGroup = groupItem => async dispatch => {
    console.log(groupItem);
    dispatch({
        type: actionTypes.CREATE_GROUP_REQUEST
    })
    try {
        const response = await axios({
            url: '/api/groups',
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                name: groupItem.name,
                type: groupItem.type,
                createdAt: groupItem.createdAt,
                totalMember: groupItem.totalMember
            })
        })
        dispatch({
            type: actionTypes.CREATE_GROUP_SUCCESS,
            payload: response.data
        })

        dispatch(ViewActions.toggleFormGroup(false))
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_GROUP_FAIL,
            payload: {
                statusCode: error.response.status,
                message: "Create Group Fail!!!"
            }
        })
    }
}

const updateGroup = groupItem => async dispatch => {
    dispatch({
        type: actionTypes.UPDATE_GROUP_REQUEST
    })
    try {
        const response = await axios({
            url: '/api/groups?id=' + groupItem.id,
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                name: groupItem.name,
                type: groupItem.type,
                createdAt: groupItem.createdAt,
                totalMember: groupItem.totalMember
            })
        })
        dispatch({
            type: actionTypes.UPDATE_GROUP_SUCCESS,
            payload: response.data
        })
        dispatch(ViewActions.toggleFormGroup(false))
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_GROUP_FAIL,
            payload: {
                statusCode: error.response.status,
                message: 'Update Group Fail!!!'
            }
        })
    }
}

const deleteGroup = groupId => async dispatch => {
    dispatch({
        type: actionTypes.DELETE_GROUP_REQUEST
    })
    try {
        const response = await axios({
            url: '/api/groups',
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            params: {
                id: groupId
            }
        })
        dispatch({
            type: actionTypes.DELETE_GROUP_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_GROUP_FAIL,
            payload: {
                statusCode: error.response.status,
                message: 'Delete Group Fail!!!'
            }
        })
    }
}

const getUserInfo = (username) => async dispatch => {

    dispatch({
        type: actionTypes.GET_USER_INFO_REQUEST
    })
    try {
        const response = await axios.get('/api/accounts/' + username, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        dispatch({
            type: actionTypes.GET_USER_INFO_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        let messageError = ''
        if (error.response.status == 401) {
            messageError = 'Unauthorized! Please login first to receive tokens'
        } else if (error.response.status == 500) {
            messageError = `Get user's info fail.Internal server error!`
        } else if (error.response.status == 403) {
            messageError = `You don not have permission to access / on the server. Forbidden!`
        }
        dispatch({
            type: actionTypes.GET_USER_INFO_FAIL,
            payload: {
                statusCode: error.response.status,
                message: messageError
            }
        })
    }
}

const updateUserInfo = (user, avatarUploadFile) => async dispatch => {
    dispatch({
        type: actionTypes.UPDATE_USER_INFO_REQUEST
    })
    try {
        if (avatarUploadFile) {
            var formData = new FormData();
            formData.append('image', avatarUploadFile, avatarUploadFile.name);
            let responseUpload = await axios({
                method: 'POST',
                url: 'http://localhost:8888/api/files/image',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: formData
            })
            const response = await axios({
                method: 'PUT',
                url: '/api/accounts/' + user.id,
                headers: {
                    'Authorization': 'Bearer ' + token,
                },
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: localStorage.getItem('role').replace('[', '').replace(']', ''),
                    status: 'ACTIVE',
                    avatarUrl: responseUpload ? responseUpload.data : ''
                }
            })
            localStorage.setItem('avatarUrl', responseUpload.data)

            dispatch({
                type: actionTypes.UPDATE_USER_INFO_SUCCESS,
                payload: responseUpload.data
            })
        } else {
            const response = await axios({
                method: 'PUT',
                url: '/api/accounts/' + user.id,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: localStorage.getItem('role').replace('[', '').replace(']', ''),
                    status: 'ACTIVE',
                    avatarUrl: localStorage.getItem('avatarUrl') ? localStorage.getItem('avatarUrl') : ''
                }
            })
            dispatch({
                type: actionTypes.UPDATE_USER_INFO_SUCCESS,
                payload: response.data
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_USER_INFO_FAIL,
            payload: 'Update User Info Fail!!!'
        })
        if (error.response) {
            //Request made and server responsed
            // console.log(error.response.data)
            // console.log(error.response.status)
        } else if (error.request) {
            //The request was made but no response was received
            // console.log(error.request)
        } else {
            // console.log('Error', error.message)
        }
    }
}

const changePassword = (username, newPassword) => async dispatch => {
    dispatch({
        type: actionTypes.CHANGE_PASSWORD_REQUEST
    })
    try {
        const response = await axios({
            method: 'POST',
            url: '/api/accounts/password-changing',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            params: {
                username: username,
                newPassword: newPassword
            }
        })
        dispatch({
            type: actionTypes.CHANGE_PASSWORD_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: actionTypes.CHANGE_PASSWORD_FAIL,
            payload: {
                statusCode: error.response.status,
                message: error.response.data
            }
        })
    }
}

const forGotPassword = (email) => async dispatch => {
    console.log(email);
    dispatch({
        type: actionTypes.FORGOT_PASSWORD_REQUEST
    })
    try {
        const response = await axios({
            method: 'POST',
            url: '/api/accounts/forgot-password',
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                email: email.email,
            }
        })
        dispatch({
            type: actionTypes.FORGOT_PASSWORD_SUCCESS,
            payload: response.data
        })
        toast.success("Send email success")
        console.log(email.email);
    } catch (error) {
        dispatch({
            type: actionTypes.FORGOT_PASSWORD_FAIL,
            payload: {
                statusCode: error.response.status,
                message: error.response.data
            }
        })
    }
}

const resetPassword = (newPassword, token) => async dispatch => {
    dispatch({
        type: actionTypes.RESET_PASSWORD_REQUEST
    })
    try {
        const response = await axios({
            method: 'POST',
            url: '/api/accounts/reset-password',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                newPassword: newPassword.newPassword,
                token: newPassword.token,
            }
        })
        dispatch({
            type: actionTypes.RESET_PASSWORD_SUCCESS,
            payload: response.data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.RESET_PASSWORD_FAIL,
            // payload: {
            //     statusCode: error.response.status,
            //     message: error.response.data
            // }
            payload: 'Update User Info Fail!!!'
        })
    }
}
const userActions = {
    registerUser,
    signInUser,
    getListGroups,
    creatingGroup,
    updateGroup,
    deleteGroup,
    getUserInfo,
    updateUserInfo,
    changePassword,
    forGotPassword,
    resetPassword
}

export default userActions