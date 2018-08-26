import isFunction from './isFunction'

export default function isActionOrMutation(value) {
  return isFunction(value) && value.hasOwnProperty('type') && typeof value.type === 'string'
}