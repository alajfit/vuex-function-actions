import isFunction from './isFunction'

export default function isActionOrMutation(value) {
  return (
    isFunction(value) &&
    Object.prototype.hasOwnProperty.call(value, 'type') &&
    typeof value.type === 'string'
  )
}
