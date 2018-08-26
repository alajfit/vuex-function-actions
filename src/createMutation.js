import invariant from 'invariant'
import isFunction from './utils/isFunction'
import isObject from './utils/isObject'

export default function createMutation(type, mutation) {
  invariant(type, 'Type was not provided')
  invariant(isFunction(mutation), 'The mutation should be a function')

  const wrapper = (state, payload) => {
    if (!state || !payload) {
      payload = state

      invariant(payload == null || isObject(payload), 'When invoking the mutation the payload, if provided, should be an object')

      return {
        type,
        ...payload
      }
    }

    return mutation(state, payload)
  }

  wrapper.toString = () => type
  wrapper.type = type

  return wrapper
}