
export function groupBy(objectArray, property, onlyOne = false) {
  if (!property) return objectArray;
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }

    if (onlyOne) {
      acc[key] = obj;
    } else {
      acc[key].push(obj);
    }

    return acc;
  }, {});
}

export function parseJson(str: any) {
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}
