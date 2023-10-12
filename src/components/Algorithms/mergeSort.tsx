const getMergeSortAnimations = (arr) => {
  const copyArr = [...arr];
  const animations = [];
  mergeSort(copyArr, 0, copyArr.length - 1, animations);
  return animations;
};

const mergeSort = (arr, left, right, animations) => {
  if (right <= left) return;

  const mid = Math.floor(left + (right - left) / 2);
  mergeSort(arr, left, mid, animations);
  mergeSort(arr, mid + 1, right, animations);
  merge(arr, left, mid, right, animations);
};

const merge = (arr, left, mid, right, animations) => {
  const newArr = Array(right - left + 1);

  for (let i = left; i <= right; i++) {
    newArr[i - left] = arr[i];
  }

  let i = 0, j = mid - left + 1, k = left;

  while (i < mid - left + 1 && j < right - left + 1) {
    if (newArr[i] <= newArr[j]) {
      animations.push([[k], false]);
      animations.push([[k, newArr[i]], true]);
      arr[k++] = newArr[i++];
    } else {
      animations.push([[k], false]);
      animations.push([[k, newArr[j]], true]);
      arr[k++] = newArr[j++];
    }
  }

  while (i < mid - left + 1) {
    animations.push([[k], false]);
    animations.push([[k, newArr[i]], true]);
    arr[k++] = newArr[i++];
  }

  while (j < right - left + 1) {
    animations.push([[k], false]);
    animations.push([[k, newArr[j]], true]);
    arr[k++] = newArr[j++];
  }
};

export default getMergeSortAnimations;
