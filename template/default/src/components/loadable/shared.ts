export function resolveChunk(chunk?: ESModule) {
  return chunk && chunk.__esModule ? chunk.default : chunk
}

export function isBrokenChunk(chunk?: ESModule) {
  return chunk && chunk.__esModule && chunk.default === undefined
}
