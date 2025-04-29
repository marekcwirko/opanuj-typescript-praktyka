function swapNumbers(a: number, b: number): [number, number] {
  return [b, a];
}

function swapStrings(a: string, b: string): [string, string] {
  return [b, a];
}

export function swapBox<T>(a: T, b: T): [T, T] {
  return [b, a];
}

const [n1, n2] = swapNumbers(10, 20);
const [s1, s2] = swapStrings('hello', 'world');
const [x, y] = swapBox(false, true);
const [x1, y1] = swapBox(10, 20);
const [x2, y2] = swapBox('hello', 'world');
