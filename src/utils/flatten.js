export default function flatten(array) {
  return Array.prototype.concat.apply([], array)
}
