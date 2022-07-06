import React from "react";
import { QuestionListing } from "./components/question-listing";
import { Seaching } from "./components/searching";
import "./assets/styles/Bass.sass";

function App() {
  return (
    <div className="App">
      <div className="App__container">
        <Seaching />
        <QuestionListing />
      </div>
    </div>
  );
}

export default App;
