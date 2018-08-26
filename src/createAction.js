import invariant from 'invariant'
import isFunction from './utils/isFunction'

export default function createAction(type, action) {
  invariant(isFunction(action), 'Expected action to be a function')

  action.type = type
  return action
}
