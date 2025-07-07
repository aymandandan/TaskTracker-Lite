import React from 'react';
import classNames from 'classnames';

const Input = ({
  id,
  name,
  type = 'text',
  label,
  placeholder = '',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  startIcon,
  endIcon,
  ...props
}) => {
  const inputClasses = classNames(
    'block w-full rounded-md shadow-sm sm:text-sm transition-colors duration-200',
    'bg-white dark:bg-gray-700',
    'text-gray-900 dark:text-gray-100',
    'placeholder-gray-400 dark:placeholder-gray-500',
    'border',
    {
      // Error state
      'border-red-300 dark:border-red-500': error,
      'focus:border-red-500 focus:ring-red-500': error,
      'text-red-900 dark:text-red-100 placeholder-red-300 dark:placeholder-red-400': error,
      // Normal state
      'border-gray-300 dark:border-gray-600': !error,
      'focus:border-indigo-500 dark:focus:border-indigo-400': !error,
      'focus:ring-indigo-500 dark:focus:ring-indigo-400': !error,
      // Disabled state
      'opacity-50 bg-gray-50 dark:bg-gray-600': disabled,
    },
    inputClassName
  );

  const labelClasses = classNames(
    'block text-sm font-medium mb-1 transition-colors duration-200',
    {
      'text-gray-700 dark:text-gray-300': !error,
      'text-red-600 dark:text-red-400': error,
    },
    labelClassName
  );

  const errorClasses = classNames(
    'mt-1 text-sm text-red-600 dark:text-red-400 transition-colors duration-200',
    errorClassName
  );

  const helperClasses = classNames('mt-1 text-sm transition-colors duration-200', {
    'text-gray-500 dark:text-gray-400': !error,
    'text-red-600 dark:text-red-400': error,
  });

  return (
    <div className={classNames('mb-4', className)}>
      {label && (
        <label htmlFor={id || name} className={labelClasses}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative rounded-md shadow-sm">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {startIcon}
          </div>
        )}

        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={classNames(inputClasses, {
            'pl-10': startIcon,
            'pr-10': endIcon,
            'p-2': true,
          })}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={`${name}-error`}
          {...props}
        />

        {endIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {endIcon}
          </div>
        )}
      </div>

      {error ? (
        <p className={errorClasses} id={`${name}-error`}>
          {error}
        </p>
      ) : helperText ? (
        <p className={helperClasses}>{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
