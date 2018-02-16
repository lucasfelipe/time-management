import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux/reducer';
import {reducer as toastr} from 'react-redux-toastr'
import { reducer as modal } from 'redux-modal'

import task from './task'
import user from './user'
import auth from './auth'
import sidebar from './sidebar'
import Constants from '../constants/index';


const appReducer = combineReducers({
   toastr,
  routerReducer,
  user,
  auth,
  task,
  sidebar,
  modal
  /* your app’s top-level reducers */
})

const rootReducer = (state, action) => {
  if (action.type === Constants.LOGOUT_SUCCESS) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
