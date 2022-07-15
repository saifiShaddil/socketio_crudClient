import { useEffect, useState } from "react"
import io from "socket.io-client"
import { Container } from "semantic-ui-react"
import HeadContent from "./components/Header"
import TableUser from "./components/UsersTable"
import { addUser } from "./store/actions"
import { useDispatch, connect } from "react-redux"

const socket = io.connect("http://127.0.0.1:4000")

function App(props) {
  const [data, setData] = useState([]) 

  const dispatch = useDispatch()

  const server = {
    // url: 'http://
  }

  const handleUserUpdated = (user) => {}

  const handleUserDeleted = (id) => {}

  useEffect(() => {
    socket.on("recieve_count", (data) => {
      console.log(data.count)
    })
    socket.on("recieve_addNew", (data) => {
      console.log(data)
      setData([...data])
    })
    socket.on("recieve_update", (data) => {
      console.log(data)
    })
  }, [socket])

  useEffect(() => {
    const controller = new AbortController()
    fetch(import.meta.env.VITE_APP_BASE_URL + "/users", {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then((result) => {
        setData(result)
        dispatch(addUser(result))
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
          users={data}
          server={server}
          socket={socket}
        />
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}
export default connect(mapStateToProps)(App)
