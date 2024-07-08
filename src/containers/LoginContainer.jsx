import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../utils/validationSchema';
import Loader from '../components/Loader';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading,  isSuccess} = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      navigate('/posts');
    }
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, navigate, dispatch]);

  return (
    <div className='w-full flex justify-center items-center h-[80vh]'>
      <div className="w-full px-4 md:w-1/3 mx-auto mt-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(loginUser(values));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="mt-4">
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
                className="theme text-white px-4 py-2"
                disabled={isSubmitting || isLoading}
              >
                {isLoading ? <Loader/> : "Login"}
              </button>

            </Form>
          )}
        </Formik>
        <p className='mt-8'>Don't have an account yet? <Link to="/register" className='text-[#0e7490] hover:text-blue-900'>Click here to register</Link></p>

      </div>
    </div>
  );
};

export default LoginContainer;
