export function init(str: string): boolean {
  return !!str;
}

let x = init("test");
console.log(x);