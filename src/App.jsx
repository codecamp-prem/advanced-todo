import { createContext, useEffect, useReducer, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm"
import {TodoList} from "./TodoList"
import {TodoFilterForm} from "./TodoFilterForm"

const LOCAL_STORAGE_KEY = "TODOS"
const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
}
export const TodoContext = createContext()


// state = todos
function reducer(todos, {type, payload}){
  switch (type){
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ]
    case ACTIONS.TOGGLE:
      return todos.map(todo => {
        if (todo.id === payload.id) return { ...todo, completed: payload.completed }

        return todo
      })
    case ACTIONS.DELETE:
      return todos.filter(todo => todo.id !== payload.id)
    case ACTIONS.UPDATE:
      return todos.map(todo => {
        if(todo.id === payload.id) return {...todo, name: payload.name}
        return todo
      })
    default:
      throw new Error(`no action found for ${type}.`)
  }

}

function App() {
  const [filterName, setFilterName] = useState("")
  const [hideCompletedTodos, setHideCompletedTodos] = useState(false)

  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value == null) return initialValue
    return JSON.parse(value)
  })

  // Filtering Todos
  const filterTodos = todos.filter((todo) => {
    if (hideCompletedTodos && todo.completed) return false
    return todo.name.includes(filterName)
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addNewTodo(newTodoName) {
    dispatch({ type: ACTIONS.ADD, payload: {name: newTodoName} })
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: {id: todoId, completed} })
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: {id: todoId} })
  }

  function updateTodo(todoId, newTodoName){
    dispatch({ type: ACTIONS.UPDATE, payload: {id: todoId, name: newTodoName} })
  }

  return (
    <TodoContext.Provider 
      value={{
      todos: filterTodos,
      addNewTodo,
      toggleTodo,
      deleteTodo,
      updateTodo,
    }}>
      <TodoFilterForm filterState={{filterName, setFilterName, hideCompletedTodos, setHideCompletedTodos}} />
      <TodoList />
      <NewTodoForm/>
    </TodoContext.Provider>
  )
}

export default App
