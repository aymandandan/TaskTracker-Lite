import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { validateEmail, validatePassword, validateUsername } from '../../utils/validators';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    
    // Clear form-level error when any input changes
    if (errors.form) {
      setErrors((prev) => ({
        ...prev,
        form: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (!validateUsername(formData.username)) {
      newErrors.username = 'Username must be between 3 and 30 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include at least one number and one special character';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({
        form: error.response?.data?.message || 'Registration failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2
            className={`mt-6 text-center text-3xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            Create a new account
          </h2>
          <p className={`mt-2 text-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-500 hover:text-indigo-400">
              Sign in
            </Link>
          </p>
        </div>

        {errors.form && (
          <div className={`rounded-md p-4 ${isDark ? 'bg-red-900 bg-opacity-30' : 'bg-red-50'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${isDark ? 'text-red-200' : 'text-red-800'}`}>
                  {errors.form}
                </h3>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div
            className={`rounded-md shadow-sm -space-y-px ${isDark ? 'bg-gray-800 p-6 rounded-lg' : 'bg-white p-6 rounded-lg shadow'}`}
          >
            <div className="mb-4">
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                label="Username"
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                label="Email address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Email address"
              />
            </div>
            <div className="mb-4">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                label="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Password"
              />
            </div>
            <div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="terms"
                name="agreeToTerms"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-indigo-600 dark:checked:border-indigo-600"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label
                htmlFor="terms"
                className={`ml-2 block text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}
              >
                I agree to the{' '}
                <Link to="/terms" className="font-medium text-indigo-500 hover:text-indigo-400">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-medium text-indigo-500 hover:text-indigo-400">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
            )}
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full flex justify-center"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
