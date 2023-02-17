import React from 'react';

import "./End.css"

function End({ retry, score }) {
  return (
    <React.Fragment>
      <h1>Game over</h1>
      <h2>A sua pontuação foi: {score}</h2>
      <button onClick={retry}>Resetar  jogo</button>
    </React.Fragment>
  );
}

export default End;
