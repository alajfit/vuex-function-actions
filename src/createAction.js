import invariant from 'invariant'
import isFunction from './utils/isFunction'

const patchContext = action => (context, ...args) => {
  const {dispatch} = context

  context.dispatch = function(action, ...args) {
    if (typeof action === 'function' && typeof action.type === 'string') {
      return dispatch.call(context, action.type, ...args)
    }

    return dispatch.call(context, action, ...args)
  }

  return action(context, ...args)
}

export default function createAction(type, action) {
  invariant(isFunction(action), 'Expected action to be a function')

  action = patchContext(action)
  action.type = type

  return action
}
