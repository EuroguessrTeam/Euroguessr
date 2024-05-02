export const debounce = (func: Function, delay: number): Function => {
  let timerId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
