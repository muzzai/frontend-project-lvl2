export default (diff) => {
  const diffKeys = Object.keys(diff);
  return diffKeys.reduce((acc, key) => `${acc}\n${key}: ${diff[key]}`, '');
};
