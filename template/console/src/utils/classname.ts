export const prefixClsGenerator = (prefix: string) => (
  ...suffixes: (string | undefined | null | false)[]
) =>
  suffixes
    .filter(v => v)
    .map(v => `${prefix}-${v}`)
    .join(' ')
