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
    'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
    {
      'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500': error,
      'border-gray-300': !error,
      'opacity-50 bg-gray-50': disabled,
    },
    inputClassName
  );

  const labelClasses = classNames(
    'block text-sm font-medium text-gray-700 mb-1',
    { 'text-red-600': error },
    labelClassName
  );

  const errorClasses = classNames(
    'mt-1 text-sm text-red-600',
    errorClassName
  );

  const helperClasses = classNames(
    'mt-1 text-sm',
    { 'text-gray-500': !error, 'text-red-600': error }
  );

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
        <p className={helperClasses}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
