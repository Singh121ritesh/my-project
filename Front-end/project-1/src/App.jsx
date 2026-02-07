import React from "react";
import{ useEffect, useState } from "react";
import axios from "axios";

function App(){

  const [data, setdata] = useState([]);

  const data_lao = async ()=>{
    try{
    const result = await axios.get("http://localhost:3000/notes")
    setdata(result.data)
  }
  catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
   data_lao()
  },[])
  return(
    <div>
     {data.map((item, index) => (
  <div key={index}>
    <h1>{item.title}</h1>
    <h2>{item.description}</h2>
  </div>
))}
    </div>
  )
}

export default App;