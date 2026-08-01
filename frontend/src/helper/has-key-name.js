export default function hasKeyName(errorArr, key, value) {
  return errorArr.some((err) => err[key] === value);
}
