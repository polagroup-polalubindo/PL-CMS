import React from 'react';
import { useBarcode } from '@createnextapp/react-barcode';
import { Svg } from '@react-pdf/renderer';
 
function Barcode({value}) {
  const { inputRef } = useBarcode({
    value:"asdasd",
    options: {
      background: 'red',
    }
  });
  
  return <Svg ref={inputRef} />;
};
 
export default Barcode;