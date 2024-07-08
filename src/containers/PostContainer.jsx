import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost } from "../features/posts/postSlice";
import SearchBar from "../components/SearchBar";
import PostCard from "../components/PostCard";
import AddPostModal from "../components/AddPostModal";
import { Button } from "flowbite-react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function PostContainer() {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()))
    );
  }, [posts, query]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(addPost(values))
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <>
      <div className="max-w-5xl p-4 mx-auto mt-4">
        <div className="mb-8">
          <div className="flex justify-between mb-8">
            <h1 className="text-2xl font-bold">Posts</h1>
            <button onClick={() => setOpenModal(true)} className="theme py-2 px-4 rounded-md">
              Add Post
            </button>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]"><Loader/></div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <div className="flex justify-between mt-8 ">
              <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="hover:bg-[#0e7490] ">
                <BiArrowToLeft className="text-black"/>
              </Button>
              <span>Page {currentPage} of {totalPages}</span>
              <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="hover:bg-[#0e7490]">
                <BiArrowToRight className="text-black "/>
              </Button>
            </div>
          </>
        )}
      </div>
      <AddPostModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default PostContainer;
