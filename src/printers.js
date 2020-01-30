const getNTabsIndent = (num) => {
  let result = '';
  for (let i = 0; i < num; i += 1) {
    result = `${result}\t`;
  }
  return result;
};

const printer = (diff, indent) => {
  const diffKeys = Object.keys(diff).sort((a, b) => {
    const key1 = a.slice(1);
    const key2 = b.slice(1);
    if (key1 > key2) {
      return 1;
    }
    if (key1 < key2) {
      return -1;
    }
    return 0;
  });
  const tabs = getNTabsIndent(indent);
  return `{${tabs}${diffKeys.reduce((acc, key) => {
    const value = diff[key];
    if (typeof (value) === 'object') {
      return `${acc}\n${tabs}${key}: ${printer(value, indent + 1)}`;
    }
    return `${acc}\n${tabs}${key}: ${diff[key]}`;
  }, '')}\n${tabs}}`;
};

export default printer;
