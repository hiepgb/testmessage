const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
const TOGGLE_FROM_GROUP = 'TOGGLE_FROM_GROUP'

const USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST';
const USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS';
const USER_SIGNUP_FAIL = 'USER_SIGNUP_FAIL';

const USER_SIGNIN_REQUEST = 'USER_SIGNIN_REQUEST';
const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
const USER_SIGNIN_FAIL = 'USER_SIGNIN_FAIL';

const GET_LIST_GROUP_REQUEST = 'GET_LIST_GROUP_REQUEST'
const GET_LIST_GROUP_SUCCESS = 'GET_LIST_GROUP_SUCCESS'
const GET_LIST_GROUP_FAIL = 'GET_LIST_GROUP_FAIL'

const CREATE_GROUP_REQUEST = 'UPDATE_GROUP_REUEST'
const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS'
const CREATE_GROUP_FAIL = 'CREATE_GROUP_FAIL'

const UPDATE_GROUP_REQUEST = 'UPDATE_GROUP_REUEST'
const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS'
const UPDATE_GROUP_FAIL = 'UPDATE_GROUP_FAIL'

const DELETE_GROUP_REQUEST = 'UPDATE_GROUP_REUEST'
const DELETE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS'
const DELETE_GROUP_FAIL = 'UPDATE_GROUP_FAIL'

const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REUEST'
const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS'
const GET_USER_INFO_FAIL = 'GET_USER_INFO_FAIL'

const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST'
const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS'
const UPDATE_USER_INFO_FAIL = 'UPDATE_USER_INFO_FAIL'

const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL'

const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL'

const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL'

const actionTypes = {
    TOGGLE_SIDEBAR,
    TOGGLE_FROM_GROUP,

    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,

    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,

    GET_LIST_GROUP_REQUEST,
    GET_LIST_GROUP_SUCCESS,
    GET_LIST_GROUP_FAIL,

    CREATE_GROUP_REQUEST,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_FAIL,

    UPDATE_GROUP_REQUEST,
    UPDATE_GROUP_SUCCESS,
    UPDATE_GROUP_FAIL,

    DELETE_GROUP_REQUEST,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_FAIL,

    GET_USER_INFO_REQUEST,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,

    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAIL,

    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
}

export default actionTypes