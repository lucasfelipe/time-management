import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux/reducer';
import {reducer as toastr} from 'react-redux-toastr'
import { reducer as modal } from 'redux-modal'

import task from './task'
import user from './user'
import auth from './auth'
import sidebar from './sidebar'


const rootReducer = combineReducers({
  toastr,
  routerReducer,
  user,
  auth,
  task,
  sidebar,
  modal
})

export default rootReducer
