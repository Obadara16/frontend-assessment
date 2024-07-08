import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createComment } from '../features/comments/commentSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { commentSchema } from '../utils/validationSchema';

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(createComment({ postId, commentData: { body: values.body } }))
      .unwrap()
      .then(() => {
        resetForm();
        toast.success('Comment posted successfully');
      })
      .catch((error) => {
        toast.error(`Failed to post comment: ${error}`);
      });
  };

  return (
    <Formik
      initialValues={{ body: '' }}
      validationSchema={commentSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col space-y-2">
          <Field
            as="textarea"
            name="body"
            className="border p-2 rounded resize-none"
            placeholder="Write a comment..."
          />
          <ErrorMessage name="body" component="div" className="text-red-500 text-sm" />
          <button
            type="submit"
            className="post-btn bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            disabled={isSubmitting}
          >
            Post Comment
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
