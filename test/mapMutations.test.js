import createMutation from "../src/createMutation"
import mapMutations from "../src/mapMutations"

const TYPE = 'ACTION_TYPE'
const ANOTHER_TYPE = 'ANOTHER_ACTION_TYPE'

let mutation, anotherMutation

beforeEach(() => {
  mutation = createMutation(TYPE, () => {})
  anotherMutation = createMutation(ANOTHER_TYPE, () => {})
})

test('should fail if provided mutation is an invalid value', () => {
  const invalidValues = [null, undefined, {}, {type: TYPE}]

  invalidValues.forEach(invalidAction => {
    expect(() => mapMutations(invalidAction)).toThrow('Mutation should be a function with a type property of type string')
  })
})

test('should map a proper single mutation', () => {
  expect(mapMutations(mutation)).toMatchObject({
    [TYPE]: mutation
  })
})

test('should map a proper single mutation in array format', () => {
  expect(mapMutations([mutation])).toMatchObject({
    [TYPE]: mutation
  })
})

test('should map proper mutations as positional arguments', () => {
  expect(mapMutations(mutation, anotherMutation)).toMatchObject({
    [TYPE]: mutation,
    [ANOTHER_TYPE]: anotherMutation
  })
})

test('should map proper mutations as array', () => {
  expect(mapMutations([mutation, anotherMutation])).toMatchObject({
    [TYPE]: mutation,
    [ANOTHER_TYPE]: anotherMutation
  })
})