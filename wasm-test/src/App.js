import React from "react";
import logo from "./logo.svg";
import "./App.css";

// A hash that gives us the imported function we need
const importObject = {
  imports: { imported_func: arg => console.log(arg) }
};
function App() {
  //We can use the global WebAssembly object and use the instantiateStreaming
  // We want to stream the file we want to fetch, we use a fetch call witha promise!
  WebAssembly.instantiateStreaming(fetch("wasm_adder.wasm"), importObject).then(
    obj => {
      console.log(obj);

      let foo = obj.instance.exports.add_nums;
      console.log(foo(3, 2));
    }
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
