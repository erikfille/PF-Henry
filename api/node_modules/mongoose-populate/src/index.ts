// https://github.com/benmosher/eslint-plugin-import/issues/1618
// eslint-disable-next-line import/no-unresolved
import { Query, HookSyncCallback, HookNextFunction } from 'mongoose'

// https://stackoverflow.com/a/30052105/10336544
export function createPopulateHook<T extends Query<unknown>>(
  field: string
): HookSyncCallback<T> {
  return function populateHook(this: T, next: HookNextFunction): void {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.populate(field)
    next()
  }
}
