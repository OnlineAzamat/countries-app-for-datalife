import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div  style={{ padding: "2rem" }}>
      <h1>404 not found</h1>
      <br />
      <Link to="/">Home page</Link>
    </div>
  )
}

export default NotFoundPage