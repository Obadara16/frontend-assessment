import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Posts from "./views/Posts";
import "./App.css";
import PostDetail from "./views/PostDetail";
import EditPost from "./views/EditPost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/edit/:postId" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
