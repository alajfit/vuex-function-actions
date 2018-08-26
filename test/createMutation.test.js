import createMutation from '../src/createMutation'

const TYPE = 'MUTATION_TYPE'

let mutation, mutationWrapper

beforeEach(() => {
  mutation = jest.fn()
  mutationWrapper = createMutation(TYPE, mutation)
})

test('mutation should be a function', () => {
  expect(mutationWrapper).toEqual(expect.any(Function))  
})

test('mutation should have a type property', () => {
  expect(mutationWrapper).toHaveProperty('type', TYPE)
})

test('mutation toString should return type', () => {
  expect(mutationWrapper.toString()).toBe(TYPE)
})

test('should fail if type is not provided', () => {
  expect(() => createMutation(null, jest.fn())).toThrow('Type was not provided')
})

test('should fail if mutation is not a function', () => {
  expect(() => createMutation(TYPE)).toThrow('The mutation should be a function')
})

test('the mutation wrapper should return an object with type property when invoked without arguments', () => {
  expect(mutationWrapper()).toEqual({type: TYPE})
})

test('the mutation wrapper should return an object containing the payload properties when invoked with a single payload argument', () => {
  const payload = {'some': 'prop'}
  expect(mutationWrapper(payload)).toMatchObject(payload)
  expect(mutationWrapper(payload)).toMatchObject({type: TYPE})
})

test('when provided, the payload to the mutation must be an object', () => {
  const invalidPayloads = [0, true, jest.fn()]

  invalidPayloads.forEach(payload => {
    expect(() => mutationWrapper(payload)).toThrow('When invoking the mutation the payload, if provided, should be an object')
  })
})

test('when invoked with two arguments should proxy to the mutation', () => {
  const state = {some: 'state'}
  const payload = {some: 'payload'}

  mutationWrapper(state, payload)

  expect(mutation).toHaveBeenCalledWith(state, payload)
})