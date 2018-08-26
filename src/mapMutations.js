import invariant from 'invariant'
import flatten from './utils/flatten'
import isActionOrMutation from './utils/isActionOrMutation'

export default function mapMutations (...mutations) {
  return flatten(mutations).reduce((acc, mutation) => { 
    invariant(isActionOrMutation(mutation), 'Mutation should be a function with a type property of type string')
    return {...acc, [mutation.type]: mutation}
   }, {}) 
}
