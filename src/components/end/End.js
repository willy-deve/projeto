import React from 'react';

function End({ retry }) {
  return (
    <React.Fragment>
      <h1>Game over</h1>
      <button onClick={retry}>Resetar  jogo</button>
    </React.Fragment>
  );
}

export default End;
