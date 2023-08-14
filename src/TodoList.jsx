import { TodoItem } from "./TodoItem"
import { TodoContext } from "./App"
import { useContext } from "react"

export function TodoList(){
    const {todos} = useContext(TodoContext)
    return (
        <ul id="list">
        {todos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
            />
            // <TodoItem
            //     key={todo.id}
            //     {...todo}
            //     toggleTodo={toggleTodo}
            //     deleteTodo={deleteTodo}
            // />
            // we can pass toggleTodod, deleteTodo Here as props like id, name, completed
            // not passing toggleTodo, deleteTodo HERE
            // we can make sure particular state information is available in component where it is used 
            // like filter from "./TodoFilter.jsx" and this component "./TodoList.jsx" use both
            // "./TodoItem.jsx" component
            // so props like id, name, completed can only be send from both component
            // to "./TodoItem.jsx" component
            // "./TodoItem.jsx" component can useContext for toggleTodo, deleteTodo
          )
        })}
        </ul>
    )
}