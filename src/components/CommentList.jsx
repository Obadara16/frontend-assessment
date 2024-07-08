import React, { useState } from "react";
import { LuDelete } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { Button, Modal } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../features/comments/commentSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "./Loader";

const CommentList = ({ comments, userId }) => {
  const dispatch = useDispatch();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId)).then(() => {
      setOpenDeleteModal(false);
    });
  };

  const handleUpdate = (commentId, values) => {
    dispatch(updateComment({ commentId, commentData: { body: values.updatedCommentBody } })).then(() => {
      setOpenUpdateModal(false);
      window.location.reload(); 
    });
  };

  const validationSchema = Yup.object().shape({
    updatedCommentBody: Yup.string().required("Comment body is required"),
  });

  return (
    <>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment?._id} className="w-full flex p-4 bg-gray-100 rounded-lg shadow-sm">
            <div className="flex-1">
              <h3 className="font-semibold">{comment.userId.username}</h3>
              <p>{comment?.body}</p>
            </div>
            {comment.userId._id === userId && (
              <div className="comment-actions w-20 flex flex-col justify-center gap-3">
                <button
                  onClick={() => {
                    setSelectedComment(comment);
                    setOpenDeleteModal(true);
                  }}
                  className="post-btn delete-btn rounded-full w-fit"
                >
                  <LuDelete />
                </button>
                <button
                  onClick={() => {
                    setSelectedComment(comment);
                    setOpenUpdateModal(true);
                  }}
                  className="post-btn rounded-full w-fit"
                >
                  <MdEdit />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Delete Confirmation Modal */}
      <Modal
        show={openDeleteModal}
        size="md"
        popup
        onClose={() => setOpenDeleteModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(selectedComment?._id)}
              >
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => setOpenDeleteModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Update Comment Modal */}
      <Modal
        show={openUpdateModal}
        size="xl"
        popup
        onClose={() => setOpenUpdateModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <Formik
            initialValues={{ updatedCommentBody: selectedComment?.body || "" }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleUpdate(selectedComment?._id, values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <h3
                  style={{ marginBottom: "10px" }}
                  className="text-xl font-medium text-gray-900 dark:text-white mt-8"
                >
                  Update Comment
                </h3>
                <div>
                  <Field
                    as="textarea"
                    name="updatedCommentBody"
                    className="create w-full mt-5"
                  />
                  <ErrorMessage
                    name="updatedCommentBody"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  className="post-btn mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader/> : "Update"}
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CommentList;
