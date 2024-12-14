import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { parse, v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  // input todo
  const [todo, settodo] = useState("")
  // all todos--array
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    try {
      let todostring = localStorage.getItem("todos");
      if (todostring) {
        let todos = JSON.parse(todostring);
        settodos(todos);
      }
    } catch (error) {
      console.error("Error parsing todos from localStorage", error);
    }
  }, []);
  
  const savetoLS= () => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  

 const handleAdd = () => {
  settodos([...todos , {id : uuidv4(), todo , isCompleted : false}])
  settodo("")
 
 savetoLS()
 }

 const handleChange = (e) => {
   settodo(e.target.value)
 }
 
 const handleCheckbox = (e) => {
 
  let id = e.target.name;
  console.log(`the id is ${id}`)
  let index = todos.findIndex(item=>{
    return item.id === id;
  })
  console.log(`the index is ${index}`)
  let newTodos = [...todos]
  newTodos[index].isCompleted = !newTodos[index].isCompleted
  settodos(newTodos)
  savetoLS()
 }
 
 const handleDelete = (e,id) => {
  const confirmdelete = window.confirm("Do You Want to delete??")
  if (confirmdelete==true) {
    let newTodos = todos.filter(item=>{
      return item.id !== id;
     })
     settodos(newTodos)
    }
     savetoLS()
  }

  const handleEdit = (e,id) => {
    let t = todos.filter(i=>{
     return i.id == id;
    })
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id != id
    })
    settodos(newTodos)
    savetoLS()
  }
  
  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
  }
  
  return (
    <>
    <Navbar/>

    <div className=" md:container md:mx-auto bg-violet-200 my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2" >
    <h1 className='font-bold text-xl text-center'>oneClick - Manage your task at one place</h1>
   <div className="addtodo flex flex-col my-3 ">
    <h2 className='text-lg font-bold '>Add a todo</h2>
    <div className="flex gap-2">
    <input onChange={handleChange} value={todo} type="text" className='w-full  rounded-lg p-2'/>
    <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-700 px-2 rounded-lg  font-bold hover:bg-violet-950 text-white disabled:bg-purple-500'>Save</button>
    </div>
    </div>
    <input type="checkbox" onChange={toggleFinished} checked={showfinished} /> Show Finished
    <div className="h-[1px] bg-black  opacity-65 w-[90%] mx-auto my-3"></div>
    <h2 className='font-bold text-lg'>Your Todos</h2>
    <div className="todos">
    {todos.length === 0 && <div className='text-blue-800 m-3 font-bold'> No Todos </div> }
      {todos.map(item=>{

      return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full justify-between ">
       <div className='flex gap-3'><input  type="checkbox" onChange={handleCheckbox} name={item.id} checked={item.isCompleted} id="" />
        <div  className={` p-2 ${item.isCompleted?"line-through":""}`} >{item.todo}</div>
        </div> 
        <div className="buttons flex h-full">
          <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-700 px-3 py-1 rounded-md m-2 font-bold  hover:bg-violet-950 text-white'><FaEdit /></button>
          <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-700 px-3 py-1 rounded-md m-2 font-bold hover:bg-violet-950 text-white'><AiFillDelete /></button>
        </div>
      </div>
      })}
    </div>


    </div> 
    
    </>
  )
}

export default App
