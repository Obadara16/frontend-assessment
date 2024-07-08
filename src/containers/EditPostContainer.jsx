import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, updatePost, reset } from "../features/posts/postSlice";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postSchema } from "../utils/validationSchema";
import Loader from "../components/Loader";

const EditPostContainer = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, isLoading, isError, isSuccess, message } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPost(postId));
  }, [dispatch, postId]);



  if (isLoading || !post) {
    return <div className="flex justify-center items-center h-[50vh]"><Loader/></div>;
  }

  return (
    <div className="max-w-5xl p-4 mx-auto mt-4">
      <h1 className="text-2xl font-bold">Edit Post</h1>
      <Formik
        initialValues={{ title: post.title || "", body: post.body || "" }}
        enableReinitialize
        validationSchema={postSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(updatePost({ id: postId, ...values }))
            .unwrap()
            .then(() => {
              setSubmitting(false);
              navigate(`/posts/${postId}`);
            })
            .catch((error) => {
              console.error(error);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <Field
                type="text"
                name="title"
                className="w-full p-2 border border-gray-300 text-gray-900"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Body</label>
              <Field
                as="textarea"
                name="body"
                className="w-full h-[200px] p-2 border border-gray-300"
              />
              <ErrorMessage name="body" component="div" className="text-red-500 text-sm" />
            </div>
            <button
              type="submit"
              className="post-btn bg-blue-500 text-white px-4 py-2"
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? <Loader/> : "Update Post"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditPostContainer;
