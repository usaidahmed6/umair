import React, { useEffect, useState } from 'react';
import './../styles/home.css';
import { addDoc, todoRef,  getDocs } from '../config/firebase'

const Home = () => {
  // for geting value 
  const [todo, setTodo] = useState([false]);
//for saving onChange input value
  const [onChnageTodo, setOnChnageTodo] = useState('');

  useEffect(() => {
    getTodos()
  }, [])

//for getting onChange input value
  const handleInput = (e) => {
    setOnChnageTodo(e.target.value);
  }
//When clicked on button, input-value=>firebase
  const onfinsh = async () => {
    const obj = {
      name: onChnageTodo,
    }

    await addDoc(todoRef, obj)

  }
 //For getting values from Firebase database 
  const getTodos = async () => {
    const querySnapshort = await getDocs(todoRef)
    let todosItems = [];
    querySnapshort.forEach((doc) => {
      todosItems.push({ id: doc.id, ...doc.data() });
      setTodo(todosItems);

    })
  }
  
  console.log('data=====>', todo);

  //HTML
  return (
    <div className='container'>
      <input type="text" onChange={handleInput} />
      <button onClick={onfinsh}>
        submit
      </button>
    </div>
  )
}

export default Home