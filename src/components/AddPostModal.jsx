import { Button, Modal, Textarea, TextInput } from 'flowbite-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { postSchema } from '../utils/validationSchema';

const AddPostModal = ({ openModal, setOpenModal, handleSubmit }) => {
  return (
    <Modal
      show={openModal}
      size="xl"
      onClose={() => setOpenModal(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Add New Post
          </h3>
          <Formik
            initialValues={{ title: '', body: '' }}
            validationSchema={postSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <Field
                    name="title"
                    as={TextInput}
                    placeholder="Title"
                    required
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="mt-2">
                  <Field
                    name="body"
                    as={Textarea}
                    placeholder="Body"
                    required
                  />
                  <ErrorMessage name="body" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                  <Button type="submit" className="theme" disabled={isSubmitting}>
                    Add Post
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddPostModal;
