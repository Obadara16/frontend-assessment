import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, deletePost } from '../features/posts/postSlice';
import { getComments } from '../features/comments/commentSlice';
import { useParams, useNavigate } from 'react-router-dom';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const PostDetailContainer = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, isLoading, isError, message } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);  
  const { user } = useSelector((state) => state.user);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(fetchPost(id));
    dispatch(getComments(id)); 
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deletePost(id));
    setOpenDeleteModal(false);
  };

  if (isLoading) return <div className="flex justify-center items-center h-[80vh]">Loading...</div>;

  return (
    <>
      <div className="max-w-5xl p-4 mx-auto mt-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-2xl">{post?.title || 'Loading...'}</h3>
          {post?.userId?._id === user?._id && (
            <div className="flex flex-col">
              <button
                onClick={() => navigate(`/posts/edit/${id}`)}
                className="mb-5 post-btn"
              >
                Edit
              </button>
              <button
                onClick={() => setOpenDeleteModal(true)}
                className="post-btn delete-btn"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <p className="text-sm mb-[5px] leading-[1.7]">
          {post?.body || 'Loading...'}
        </p>
        <div className="comments mt-10 flex flex-col gap-8">
          <CommentList comments={comments || []} userId={user?._id} />
          <CommentForm postId={id} /> 
        </div>
      </div>
      <Modal
        show={openDeleteModal}
        size="md"
        onClose={() => setOpenDeleteModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostDetailContainer;
