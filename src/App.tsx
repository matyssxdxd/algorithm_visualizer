import { useEffect, useRef, useState } from "react";
import "./App.css";
import VisualizeArray from "./components/VisualizeArray/VisualizeArray";

function App() {
  const [size, setSize] = useState(50);
  const [speed, setSpeed] = useState(5);
  const [arr, setArr] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [sorted, setSorted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setArr([]);

    const tempArray = [];

    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * 90 + 10);
      tempArray.push(randomNumber);
    }

    setArr(tempArray);
  }, [size]);

  //

  function bubbleSort() {
    let i, j: number, temp;
    let swapped;
    const array = [...arr];
    const newArray = [];

    for (i = 0; i < array.length - 1; i++) {
      swapped = false;
      for (j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          console.log(`first: ${array[j]}  next: ${array[j + 1]}`);
          swapped = true;
          newArray.push({ animation: [...array], i: j, j: j + 1 });
        }
      }
      if (!swapped) break;
    }

    setAnimations(newArray);
  }

  function animateBar(i, j) {
    const arrayBars = containerRef.current.children;
    setTimeout(() => {
      arrayBars[i].style.backgroundColor = "green";
      arrayBars[j].style.backgroundColor = "green";
    }, speed);
    setTimeout(() => {
      arrayBars[i].style.backgroundColor = "";
      arrayBars[j].style.backgroundColor = "";
    }, speed * 2);
  }

  function animateArray() {
    animations.forEach((element, i) => {
      setTimeout(() => {
        animateBar(element.i, element.j);
        setArr(element.animation);
      }, i * speed);
    });
    setTimeout(() => {
      const arrayBars = containerRef.current.children;
      for (let i = 0; i < arrayBars.length; i++) {
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = "green";
        }, i * speed);
      }
    }, animations.length * (speed + 0.1));
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
          onChange={(event) => setSize(event.target.value)}
        />
        <p>
          Speed: <span>{speed}</span>
        </p>
        <input
          min="5"
          max="100"
          type="range"
          value={speed}
          onChange={(event) => setSpeed(event.target.value)}
        />
        <div
          style={{ display: "flex", gap: "1px", alignItems: "baseline" }}
          ref={containerRef}
        >
          {arr.map((element, index) => (
            <VisualizeArray key={index} height={element} />
          ))}
        </div>
        <button onClick={bubbleSort}>click</button>
        <button onClick={() => console.log(animations)}>click 2</button>
        <button onClick={animateArray}>click 3</button>
      </div>
    </>
  );
}

export default App;
