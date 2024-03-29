import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { AiFillCloseCircle } from "react-icons/ai";

const App = () => {
  const [budget, setBudget] = useState(50000);
  const [list, setList] =  useState([]);
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('data'))
    if(localData!== null){
      setList([...localData]);
    }
  },[])
  const nameRef = useRef();
  const costRef = useRef();

  function calculateTotal() {
    const sum = list.reduce((acc, curr) => {
      acc += curr.rupees;
      return acc;
    }, 0);
    return sum;
  }
  function handleSubmit(e){
    e.preventDefault();
    const name = nameRef.current.value;
    const cost = Number.parseInt(costRef.current.value);
    setList([...list,{name:name, rupees:cost}]);
    const localData = JSON.parse(localStorage.getItem('data'));
    if(localData===null){
      localStorage.setItem('data', JSON.stringify([{name:name , rupees:cost}]))
    }else{
      localStorage.setItem('data', JSON.stringify([...localData, {name:name, rupees:cost}]))
    }
    nameRef.current.value = "";
    costRef.current.value = "";
  }


  function deleteFunction(itemName){
    const update = list.filter(item => item.name !== itemName)
    localStorage.setItem('data', JSON.stringify([...update]))
    setList([...update]);
  }


  return (
    <div className='App'>
      <h1>My budget Planner</h1>
      <div className='container1'>
        <div className='myBudget'>My budget: {budget}</div>
        <div className='remaining'>Remaining: {budget - calculateTotal()}</div>
        <div className='spent'>Spent: {calculateTotal()}</div>
      </div>
      <div className='container2'>
        <h1>Expenses</h1>
        {list.length === 0 ? <h3 style={{color:'green'}}>Add data to list...</h3> : list.map((item, idx) => {
          return(
            <div className='expenseCard' style={{display:'flex', alignItems:'center'}} key={item.name}>
              {item.name}
              <span style={{display:'flex', gap:'10px', alignItems:'center', justifyContent:'space-between'}}>
                Rs.{item.rupees}
                <AiFillCloseCircle className='delete' style={{cursor:'pointer'}} onClick={()=> deleteFunction(item.name)} />
                </span>
            </div>
          )
        })}
      </div>
      <div className='container3'>
        <h1>Add Expenses</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='form-container' style={{display:'flex', width:'97%', padding:'20px', justifyContent:'center', gap:'20px' }}>
            <div style={{display:'flex', flexDirection:'column', width:'40%', alignItems:'flex-start', gap:'10px'}}>
              <label>Name</label>
              <input type='text' ref={nameRef} style={{width:'100%', height:'40px', borderRadius:'5px'}} />
            </div>
            <div style={{display:'flex', flexDirection:'column', width:'40%', alignItems:'flex-start', gap:'10px'}}>
              <label>Cost</label>
              <input type='Number' ref={costRef} style={{width:'100%', height:'40px', borderRadius:'5px'}} />
            </div>
          </div>
          <button type='submit'>Save</button>
        </form>
        
      </div>
    </div>
  )
}

export default App