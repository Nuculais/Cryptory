// action types
export const ADD_COIN = 'ADD_COIN'
export const ADD_COIN_SUCCESS = 'ADD_COIN_SUCCESS'
export const PROFILE_FAILURE = 'PROFILE_FAILURE'
export const TOGGLE_COIN = 'TOGGLE_COIN'
export const DELETE_COIN = 'DELETE_COIN'
export const LOADED_PROFILE = 'LOADED_PROFILE'
export const FETCH_PROFILE = 'FETCH_PROFILE'

// action creators
export function addCoin(coin) {
  return {type: ADD_COIN, coin}
}

export function addCoinSuccess(coin) {
  return {type: ADD_COIN_SUCCESS, coin}
}

export function profileFailure(error) {
  return {type: PROFILE_FAILURE, error}
}

export function toggleCoin(id) {
  return {type: TOGGLE_COIN, id}
}

export function deleteCoin(id) {
  return {type: DELETE_COIN, id}
}

export function loadedProfile(id) {
  return {type: LOADED_PROFILE, id}
}

export function fetchProfile() {
  return {type: FETCH_PROFILE}
}
