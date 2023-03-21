/* eslint-disable import/no-unused-modules */
import { createPopulateHook } from '.'

// https://github.com/vikpe/mongoose-middleware-test
describe('populate hook', () => {
  it('should call this.populate and next', () => {
    const query = { populate: jest.fn() }

    const field = 'test'
    const next = jest.fn()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-floating-promises
    createPopulateHook(field).call(query as any, next, [])

    expect(query.populate.mock.calls.length).toBe(1)
    expect(query.populate.mock.calls[0][0]).toBe(field)
    expect(next.mock.calls.length).toBe(1)
  })
})
