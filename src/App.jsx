import { useEffect, useState } from "react"
import io from "socket.io-client"
import { Container } from "semantic-ui-react"
import HeadContent from "./components/Header"
import TableUser from "./components/UsersTable"
import { addUser, getUsers, removeUser, updateUser } from "./store/actions"
import { useDispatch } from "react-redux"

const socket = io.connect("http://127.0.0.1:4000")

function App(props) {

  const dispatch = useDispatch()

  const server = {
    // url: 'http://
  }

  const handleUserUpdated = (user, type) => {
    if(type === "New"){
      // post new user logic here
      console.log(user)
      socket.emit("addNew", user)
    }
    else {
      // update logic here
      console.log(user)
      socket.emit("update", user)
    }
  }

  const handleUserDeleted = (id) => {
    // delete logic here
    dispatch(removeUser(id))
    socket.emit("delete", id)
  }

  useEffect(() => {

    socket.on("recieve_addNew", (data) => {
      console.log(data)
      dispatch(addUser(data))
    })
    socket.on("recieve_update", (data) => {
      console.log(data)
      dispatch(updateUser(data))
    })
    socket.on("deletion_id", (data) => {
      console.log(data)
      dispatch(removeUser(data))
    })
  }, [socket])

  useEffect(() => {
    const controller = new AbortController()
    fetch(import.meta.env.VITE_APP_BASE_URL + "/users", {
      method: "GET",
      signal: controller.signal,
      headers: {
        contentType: "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then((result) => {
        dispatch(getUsers(result))
      })
      .catch((err) => {
        console.log(err)
      })

    return () => controller.abort()
  }, [])


  return (
    <div style={{ margin: "2em auto" }}>
      <Container>
        <HeadContent />
        <TableUser
          onUserUpdated={handleUserUpdated}
          onUserDeleted={handleUserDeleted}
          server={server}
          socket={socket}
        />
      </Container>
    </div>
  )
}

export default App
