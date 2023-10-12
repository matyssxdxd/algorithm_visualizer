interface AnimationType {
  first: number;
  second: number;
  swapped: boolean;
}

const bubbleSort = (arr: number[]): AnimationType[] => {
  let swapped, temp;
  const array = [...arr];
  const animations: AnimationType[] = [];

  for (let i = 0; i < array.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        animations.push({ first: j, second: j + 1, swapped: true });
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swapped = true;
      } else {
        animations.push({ first: j, second: j + 1, swapped: false });
      }
    }
    if (!swapped) break;
  }

  return animations;
};

export default bubbleSort;
