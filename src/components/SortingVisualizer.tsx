import { useEffect, useRef, useState } from "react";
import ArrayBar from "./ArrayBar/ArrayBar";
import bubbleSort from "./Algorithms/bubbleSort";

function SortingVisualizer() {
  const [size, setSize] = useState<number>(50);
  const [speed, setSpeed] = useState<number>(5);
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

  const animateBubbleSort = () => {
    if (sorting) return;
    setSorting(true);
    let animations = bubbleSort(arr);
    animations.forEach((element, index) => {
      setTimeout(() => {
        animateBar(element.i, element.j)
        setArr(element.animation)
      }, speed * index);
    })
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * speed);
  }

  const resetColors = () => {
    const arrayBars = containerRef.current?.children as HTMLCollection;
    for (let i = 0; i < arrayBars.length; i++) {
       (arrayBars[i] as HTMLElement).style.backgroundColor = "black"
    }
  }

  function animateSortedArray() {
    const arrayBars = containerRef.current?.children as HTMLCollection;
    for (let i = 0; i < arrayBars.length; i++) {
      setTimeout(() => {
        (arrayBars[i] as HTMLElement).style.backgroundColor = "green"
      }, i * speed);
    }
    setTimeout(() => {
      setSorting(false);
    }, arrayBars.length * speed);
  }

  function animateBar(i: number, j: number) {
    const arrayBars = containerRef.current?.children as HTMLCollection;
    setTimeout(() => {
        (arrayBars[i] as HTMLElement).style.backgroundColor = "green";
        (arrayBars[j] as HTMLElement).style.backgroundColor = "green";
    }, speed);
    setTimeout(() => {
        (arrayBars[i] as HTMLElement).style.backgroundColor = "";
        (arrayBars[j] as HTMLElement).style.backgroundColor = "";
    }, speed * 2);
  }

  return (
    <>
      <div className="container">
        <p>
          Size: <span>{size}</span>
        </p>
        <input
          min="5"
          max="100"
          type="range"
          value={size}
          onChange={(event) => setSize(parseInt(event.target.value))}
        />
        <p>
          Speed: <span>{speed}</span>
        </p>
        <input
          min="5"
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
      </div>
    </>
  );
}

export default SortingVisualizer;
