import {call, put, takeLatest, takeEvery} from 'redux-saga/effects'
import {ADD_COIN, DELETE_COIN, TOGGLE_COIN, loadedProfile, addCoinSuccess, profileFailure} from '../actions/profile'
import {FETCH_PROFILE} from "./actions/profile";

function* getProfile() {
  try {
    const res = yield call(fetch, 'v1/todos')
    const profile = yield res.json()
    yield put(loadedProfile(profile))
  } catch (e) {
    yield put(profileFailure(e.message))
  }
}

function* saveCoin(action) {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(action.todo),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }

    const res = yield call(fetch, 'v1/todos', options)
    const coin = yield res.json()
    yield put(addCoinSuccess(coin))
  } catch (e) {
    yield put(profileFailure(e.message))
  }
}

function* deleteCoin(action) {
  try {
    yield call(fetch, 'v1/todos/${action.id}', {
      method: 'DELETE'
    })
  } catch (e) {
    yield put(profileFailure(e.message))
  }
}

function* updateCoin(action) {
  try {
    yield call(fetch, 'v1/todos/${action.id}', {
      method: 'POST'
    })
  } catch (e) {
    yield put(profileFailure(e.message))
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_PROFILE, getProfile)
  yield takeLatest(ADD_COIN, saveCoin)
  yield takeLatest(DELETE_COIN, deleteCoin)
  yield takeEvery(TOGGLE_COIN, updateCoin)
}

export default rootSaga
