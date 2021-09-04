import React, { Fragment, useEffect, useState } from "react";
import EditTodos from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    // function to delete a todo
    async function deleteTodo(id){
        try {
            const res = await fetch(`http://localhost:5000/todos/${id}`,{
                method: "DELETE"
            })
            // console.log(res);
            setTodos(todos.filter(todo=>todo.todo_id !== id));
        } catch (err) {
            console.log(err.message);
        }
    }

    // Function to get all the todos displayed
    async function getTodos() {
        const res = await fetch("http://localhost:5000/todos");

        const todoArray = await res.json();

        setTodos(todoArray);
    }

    // More about this hook here -> https://sebhastian.com/react-usestate-useeffect-hooks/
    useEffect(() => {
        getTodos();
    }, []);

    console.log(todos);
    return (
        <Fragment>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodos todo={todo}/></td>
                            <td><button className="btn btn-danger" onClick={() =>
                                deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos;