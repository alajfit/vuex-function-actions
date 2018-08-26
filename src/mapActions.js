import invariant from 'invariant'
import {mapActions as vuexMapActions} from 'vuex'
import flatten from './utils/flatten'
import isActionOrMutation from './utils/isActionOrMutation'

export default function mapActions(...actions) {
  return vuexMapActions(
    flatten(actions).reduce((acc, action) => {
      invariant(isActionOrMutation(action), 'Action should be a function with a type property of type string')

      return {...acc, [action.type]: action.type}
    }, {})
  )
}