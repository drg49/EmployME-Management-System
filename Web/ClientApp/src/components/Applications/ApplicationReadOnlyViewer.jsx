import React from 'react';

export default function ApplicationReadOnlyViewer({ jobAppData }) {
  
  React.useEffect(() => console.log(jobAppData), []);
  
  return (
    <>
      Hello World
    </>
  )
}
