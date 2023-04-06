import actionTypes from "../constants/constants"

const toggleSidebar = () => {
    return {
        type: actionTypes.TOGGLE_SIDEBAR,
        payload: null
    }
}

const toggleFormGroup = isOpen => {
    return {
        type: actionTypes.TOGGLE_FROM_GROUP,
        payload: { toggleOpenFormGroup: isOpen }
    }
}


export default {
    toggleSidebar,
    toggleFormGroup
}