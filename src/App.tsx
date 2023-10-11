import { useEffect, useState } from "react";
import "./App.css";
import VisualizeArray from "./components/VisualizeArray/VisualizeArray";

function App() {
  const [size, setSize] = useState(50);
  const [arr, setArr] = useState([]);
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    setArr([]);

    const tempArray = [];

    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * 90 + 10);
      tempArray.push(randomNumber);
    }

    setArr(tempArray);
  }, [size]);

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
          swapped = true;
          newArray.push([...array]);
        }
      }
      if (!swapped) break;
    }

    setAnimations(newArray);
  }

  function animateArray() {
    animations.forEach((animation, i) => {
      setTimeout(() => {
        setArr(animation);
      }, i * 5);
    });
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
        <div style={{ display: "flex", gap: "1px", alignItems: "baseline" }}>
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
