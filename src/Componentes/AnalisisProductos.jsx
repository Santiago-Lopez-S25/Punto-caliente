import React, { useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import { aggregators } from 'react-pivottable/Utilities'; 

const AnalisisProductos = ({ productos }) => {
  const [pivotState, setPivotState] = useState({
    aggregatorName: 'Sum', 
    vals: ['precio,'],      
    rows: ['categoria'],   
    cols: []               
  });

  return (
    <div>
      <h3>Análisis de Productos</h3>
      <PivotTableUI
        data={productos} 
        onChange={(s) => setPivotState(s)} 
        {...pivotState} 
        aggregators={aggregators} 
      />
    </div>
  );
};

export default AnalisisProductos;

