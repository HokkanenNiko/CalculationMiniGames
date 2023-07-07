import React, { useState } from 'react';

const Calculation = ({ calculationInput }) => {
    const [calculation] = useState(calculationInput);

  return (
      <p>What is:{calculation.a} {calculation.operator} {calculation.b}?</p>
  );
}

export default Calculation;