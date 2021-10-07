import React, { useState } from "react";

function Counter() {
  const [counter, setCounter] = useState(0);

  function incrementCounter() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <h2>{counter}</h2>
      <button type="button" onClick={incrementCounter}>
        Incrementar
      </button>
    </div>
  );
}

export default Counter;
