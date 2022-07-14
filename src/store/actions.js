import { ADD_USER, GET_USERS, REMOVE_USER, UPDATE_USER } from "./actionTypes"


export const addUser = (user) => {
    return {
        type: ADD_USER,
        payload: user,
    }
}

export const removeUser = (id) => {
    return {
        type: REMOVE_USER,
        payload: id,
    }
}

export const updateUser = (id) => {
    return {
        type: UPDATE_USER,
        payload: id,
    }
}

export const getUsers = () => {
    return {
        type: GET_USERS,
    }
}