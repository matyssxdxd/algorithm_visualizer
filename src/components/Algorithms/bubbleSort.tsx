
interface AnimationType {
    animation: number[],
    i: number,
    j: number,
}

const bubbleSort = (arr: number[]): AnimationType[] => {
    let swapped, temp;
    const array = [...arr];
    const animations: AnimationType[] = [];

    for (let i = 0; i < array.length - 1; i++) {
      swapped = false;
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          console.log(`first: ${array[j]}  next: ${array[j + 1]}`);
          swapped = true;
          animations.push({animation: [...array], i: j, j: j + 1});
        }
      }
      if (!swapped) break;
    }

    return animations;
  }

export default bubbleSort