import createAction from "../src/createAction"
import mapActions from "../src/mapActions"

const TYPE = 'ACTION_TYPE'
const ANOTHER_TYPE = 'ANOTHER_ACTION_TYPE'

let action, anotherAction

beforeEach(() => {
  action = createAction(TYPE, () => {})
  anotherAction = createAction(ANOTHER_TYPE, () => {})
})

test('should fail if provided action is an invalid value', () => {
  const invalidValues = [null, undefined, {}, {type: TYPE}]

  invalidValues.forEach(invalidAction => {
    expect(() => mapActions(invalidAction)).toThrow('Action should be a function with a type property of type string')
  })
})

test('should map a proper single action', () => {
  expect(mapActions(action)).toMatchObject({
    [TYPE]: expect.any(Function)
  })
})

test('should map a proper single action in array format', () => {
  expect(mapActions([action])).toMatchObject({
    [TYPE]: expect.any(Function)
  })
})

test('should map proper actions as positional arguments', () => {
  expect(mapActions(action, anotherAction)).toMatchObject({
    [TYPE]: expect.any(Function),
    [ANOTHER_TYPE]: expect.any(Function)
  })
})

test('should map proper actions as array', () => {
  expect(mapActions([action, anotherAction])).toMatchObject({
    [TYPE]: expect.any(Function),
    [ANOTHER_TYPE]: expect.any(Function)
  })
})