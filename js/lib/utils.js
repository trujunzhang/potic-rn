const {isImmutable, Map, List, Stack} = require('immutable')

export function convertToObject (source: Any) {
  if (isImmutable(source)) {
    return source.toJS()
  }
  return source
}
