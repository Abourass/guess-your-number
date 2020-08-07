export default function* range(start: number, end: number):Generator<number> {
  for (let i: number = start; i <= end; i++) {
    yield i;
  }
};
