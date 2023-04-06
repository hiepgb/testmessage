import actionTypes from "../constants/constants"

const initState = {
    isLoading: false,
    user: {
        id: '',
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    },
    errorMessageSignin: null,
    errorMessageGroup: null,
    listGroups: [],
    groupDeleted: false,
    totalPagesListGroups: 0,
    createdGroupSuccessfully: false,
    updateCompleted: false,
    groupDeleted: false,
    errorMessage: null,
    errorMessageChangePassword: null,
    messageChangePasswordSuccess: null,
    errorMessageRegister: null,
    messageForgotPasswordSuccess: null,
    errorMessageForgotPassword: null,
    messageResetPasswordSuccess: null,
    errorMessageResetPassword: null
}
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.USER_SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.USER_SIGNUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageRegister: action.payload.message
            }
        case actionTypes.USER_SIGNIN_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.USER_SIGNIN_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.USER_SIGNIN_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageSignin: action.payload.message,
            }
        case actionTypes.GET_LIST_GROUP_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.GET_LIST_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                listGroups: action.payload.listGroups,
                totalPagesListGroups: action.payload.totalPagesListGroups
            }
        case actionTypes.GET_LIST_GROUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageGroup: action.payload,
            }
        case actionTypes.CREATE_GROUP_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.CREATE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                createdGroupSuccessfully: true,
                closeFormGroup: true
            }
        case actionTypes.CREATE_GROUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageGroup: action.payload,
            }
        case actionTypes.UPDATE_GROUP_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.UPDATE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                updateCompleted: true,
            }
        case actionTypes.UPDATE_GROUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageGroup: action.payload,
            }
        case actionTypes.DELETE_GROUP_REQUEST:
            return {
                ...state,
                isLoading: true,
                groupDeleted: false
            }
        case actionTypes.DELETE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                groupDeleted: true,
            }
        case actionTypes.DELETE_GROUP_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageGroup: action.payload,
            }
        case actionTypes.GET_USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }
        case actionTypes.GET_USER_INFO_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        case actionTypes.UPDATE_USER_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case actionTypes.UPDATE_USER_INFO_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        case actionTypes.CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
                messageChangePasswordSuccess: null,
                errorMessageChangePassword: null
            }
        case actionTypes.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                messageChangePasswordSuccess: 'Your password changed. Please re-active account by click the link which our system has just send to your email.'
            }
        case actionTypes.CHANGE_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageChangePassword: action.payload,
            }
        case actionTypes.FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
                messageForgotPasswordSuccess: null,
                errorMessageForgotPassword: null
            }
        case actionTypes.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                messageForgotPasswordSuccess: 'Your submit username success. Please follow email by click the link which our system has just send to your email.'
            }
        case actionTypes.FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageForgotPassword: 'Your submit email false',
            }
        case actionTypes.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
                messageResetPasswordSuccess: null,
                errorMessageResetPassword: null
            }
        case actionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                messageResetPasswordSuccess: 'Congratulations Your submit reset email success!!!'
            }
        case actionTypes.RESET_PASSWORD_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMessageResetPassword: action.payload,
            }
        default:
            return state;
    }
}

export default userReducer;