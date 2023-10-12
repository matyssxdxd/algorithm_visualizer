import { useEffect, useRef, useState } from "react";
import ArrayBar from "./ArrayBar/ArrayBar";
import bubbleSort from "./algorithms/bubbleSort";
import mergeSort from "./algorithms/mergeSort";

function SortingVisualizer() {
  const [size, setSize] = useState<number>(50);
  const [speed, setSpeed] = useState<number>(10);
  const [arr, setArr] = useState<number[]>([]);
  const [sorting, setSorting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resetColors();
    setArr([]);

    const tempArray = [];

    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * 90 + 10);
      tempArray.push(randomNumber);
    }

    setArr(tempArray);
  }, [size]);

  const animateMergeSort = () => {
    if (sorting) return;
    setSorting(true);
    const animations = mergeSort(arr);
    animations.forEach(({ first, second, swapped }, index) => {
      setTimeout(() => {
        setArr((prevArr) => {
          const arrCopy = [...prevArr];
          prevArr[first] = second;
          return arrCopy;
        });
      }, index * speed);
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * speed);
  };

  const animateBubbleSort = () => {
    if (sorting) return;
    setSorting(true);
    const animations = bubbleSort(arr);
    animations.forEach(({ first, second, swapped }, index) => {
      setTimeout(() => {
        if (!swapped) {
          animateBar(first);
          animateBar(second);
        } else {
          setArr((prevArr) => {
            animateBar(first);
            animateBar(second);
            const arrCopy = [...prevArr];
            const temp = arrCopy[first];
            arrCopy[first] = arrCopy[second];
            arrCopy[second] = temp;
            return arrCopy;
          });
        }
      }, index * speed);
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * speed);
  };

  const resetColors = () => {
    const arrayBars = containerRef.current?.children as HTMLCollection;
    for (let i = 0; i < arrayBars.length; i++) {
      (arrayBars[i] as HTMLElement).style.backgroundColor = "black";
    }
  };

  function animateSortedArray() {
    const arrayBars = containerRef.current?.children as HTMLCollection;
    for (let i = 0; i < arrayBars.length; i++) {
      setTimeout(() => {
        (arrayBars[i] as HTMLElement).style.backgroundColor = "green";
      }, i * speed);
    }
    setTimeout(() => {
      setSorting(false);
    }, arrayBars.length * speed);
  }

  function animateBar(index: number) {
    const arrayBars = containerRef.current?.children as HTMLCollection;
    setTimeout(() => {
      (arrayBars[index] as HTMLElement).style.backgroundColor = "green";
    }, speed);
    setTimeout(() => {
      (arrayBars[index] as HTMLElement).style.backgroundColor = "";
    }, speed * 2);
  }

  return (
    <>
      <div className="container">
        <p>
          Size: <span>{size}</span>
        </p>
        <input
          min="10"
          max="100"
          type="range"
          value={size}
          onChange={(event) => setSize(parseInt(event.target.value))}
        />
        <p>
          Speed: <span>{speed}</span>
        </p>
        <input
          min="10"
          max="100"
          type="range"
          value={speed}
          onChange={(event) => setSpeed(parseInt(event.target.value))}
        />
        <div
          style={{ display: "flex", gap: "1px", alignItems: "baseline" }}
          ref={containerRef}
        >
          {arr.map((element, index) => (
            <ArrayBar key={index} height={element} />
          ))}
        </div>
        <button onClick={animateBubbleSort}>click</button>
        <button onClick={animateMergeSort}>click</button>
      </div>
    </>
  );
}

export default SortingVisualizer;
