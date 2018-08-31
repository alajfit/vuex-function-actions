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

test('should return a function', () => {
  const action = createAction(TYPE, actionFn)

  expect(action).toEqual(expect.any(Function))
})

test('should not return the same function as input because it is patched', () => {
  const action = createAction(TYPE, actionFn)

  expect(action).not.toBe(actionFn)
})

test('should fail if action is an invalid value', () => {
  const invalidValues = [null, undefined, 0, 'string', true]

  invalidValues.forEach(invalidAction => {
    expect(() => createAction(TYPE, invalidAction)).toThrow(
      'Expected action to be a function'
    )
  })
})

test(`patch action context so it's possible to dispatch other action functions`, () => {
  const actionArg = 'whatever'
  const dispatch = jest.fn()

  const action = createAction(TYPE, context =>
    context.dispatch(createAction(TYPE, actionFn), actionArg)
  )

  action({dispatch})

  expect(dispatch).toHaveBeenCalledWith(TYPE, actionArg)
})

test(`it should be still possible to dispatch plain string actions`, () => {
  const actionArg = 'whatever'
  const dispatch = jest.fn()

  const action = createAction(TYPE, context =>
    context.dispatch(TYPE, actionArg)
  )

  action({dispatch})

  expect(dispatch).toHaveBeenCalledWith(TYPE, actionArg)
})
