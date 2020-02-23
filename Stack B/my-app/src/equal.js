  // credit: https://stackoverflow.com/questions/27030/comparing-arrays-of-objects-in-javascript, answer by ttulka
  export function checkObjectsEqual  (o1, o2) {
    const objectsEqual =
      typeof o1 === 'object' && Object.keys(o1).length > 0
        ? Object.keys(o1).length === Object.keys(o2).length
        && Object.keys(o1).every(p => checkObjectsEqual(o1[p], o2[p]))
        : o1 === o2;

    return objectsEqual;
  }

  export function checkArraysEqual (a1, a2)  {
    return a1.length === a2.length ? a1.every((o, idx) => checkObjectsEqual(o, a2[idx])) : false;
  }
