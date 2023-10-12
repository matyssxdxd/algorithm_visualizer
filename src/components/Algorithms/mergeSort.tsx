// JavaScript program for Merge Sort

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
function merge(arr, left, mid, right, animations) {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  // Create temp arrays
  const leftTemp = new Array(n1);
  const rightTemp = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) leftTemp[i] = arr[left + i];
  for (let j = 0; j < n2; j++) rightTemp[j] = arr[mid + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  let i = 0;

  // Initial index of second subarray
  let j = 0;

  // Initial index of merged subarray
  let k = left;

  while (i < n1 && j < n2) {
    if (leftTemp[i] <= rightTemp[j]) {
      animations.push({ first: k, second: leftTemp[i], swapped: true });
      arr[k] = leftTemp[i];
      i++;
    } else {
      animations.push({ first: k, second: rightTemp[j], swapped: true });
      arr[k] = rightTemp[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    animations.push({ first: k, second: leftTemp[i], swapped: true });
    arr[k] = leftTemp[i];
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    animations.push({ first: k, second: rightTemp[j], swapped: true });
    arr[k] = rightTemp[j];
    j++;
    k++;
  }
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted
function mergeSort(arr, left = 0, right = arr.length - 1, animations) {
  if (left >= right) {
    return;
  }

  const mid = Math.floor(left + (right - left) / 2);

  mergeSort(arr, left, mid, animations);
  mergeSort(arr, mid + 1, right, animations);
  merge(arr, left, mid, right, animations);
}

export default function sortArray(arr) {
  const array = [...arr];
  const animations = [];
  mergeSort(array, 0, array.length - 1, animations);
  return animations;
}
