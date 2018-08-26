import createAction from '../src/createAction'

const TYPE = 'ACTION_TYPE'

let actionFn

beforeEach(() => {
  actionFn = () => {}
})

test('should attach `type` property to the action', () => {
  const action = createAction(TYPE, actionFn)

  expect(action.type).toBe(TYPE)
})

test('should return the same function provided as input', () => {
  const action = createAction(TYPE, actionFn)

  expect(action).toBe(actionFn)
})

test('should fail if action is an invalid value', () => {
  const invalidValues = [null, undefined, 0, 'string', true]

  invalidValues.forEach(invalidAction => {
    expect(() => createAction(TYPE, invalidAction)).toThrow(
      'Expected action to be a function'
    )
  })
})
