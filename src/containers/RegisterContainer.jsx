import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from '../utils/validationSchema';

const RegisterContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (isSuccess) {
      navigate('/login');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <div className='w-full flex justify-center items-center h-[80vh]'>
      <div className="w-full px-4 md:w-1/3 mx-auto mt-4">
        <h1 className="text-2xl font-bold">Register</h1>
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={registerSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(registerUser(values));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <Field
                  type="text"
                  name="username"
                  className="w-full p-2 border border-gray-300"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 border border-gray-300"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? "Loading" : "Register"}
              </button>
              {isError && <p className="text-red-500 text-sm mt-2">{message}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterContainer;
