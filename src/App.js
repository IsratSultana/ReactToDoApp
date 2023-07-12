
import './App.css';
import {useEffect, useState} from "react";
import Task from './Task';

function App() {
   const[todoList,setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
   const[newTask,setNewTask] = useState("")

   const handleChange = (event)=>{
    setNewTask(event.target.value);
   }

   const addTask = () =>{

    const task = {
      id: todoList.length === 0? 1: todoList[todoList.length-1].id + 1,
      taskName: newTask,
      complete: false
    }
     setTodoList([...todoList, task])
   }

   const deleteTask = (id)=>{
    setTodoList(todoList.filter((task)=>task.id!==id));
   }

   const completeTask=(id)=>(
    setTodoList(
      todoList.map((task)=>{
        if(task.id === id){
          return {...task,complete:true}
        }
        else{
          return task;
        }
  })
 ))
 useEffect(()=>{
  
  localStorage.setItem("todos", JSON.stringify(todoList))
 },[todoList])
   

  return(
    <div className='App'>
      <div className='addTask'>
        
           <p id='ptodo'>To Do List</p>
           <input placeholder='write your todo list...' onChange={handleChange} />
           <button id="badd" onClick={addTask}>Add Task</button>
        </div>
      
      <p id='listp'>List of works</p>
      <div className='list'>
             {todoList.map((task)=>{
                return(
                  <Task taskName = {task.taskName}
                   id = {task.id}
                   complete = {task.complete}
                   deleteTask = {deleteTask} 
                   completeTask={completeTask}/>
                )
             }
           )}
       </div>   
      </div> 
   

  )}








export default App;
