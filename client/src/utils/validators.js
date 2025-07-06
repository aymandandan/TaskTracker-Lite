// Email validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Password validation (at least 8 characters)
export const validatePassword = (password) => {
  return password.length >= 8;
};

// Username validation (3-30 characters, alphanumeric with underscores and dots)
export const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9_.]{3,30}$/;
  return re.test(username);
};

// Form validation helper
export const validateForm = (fields) => {
  const errors = {};
  let isValid = true;

  Object.keys(fields).forEach((field) => {
    const { value, required, minLength, maxLength, pattern, message } = fields[field];
    
    if (required && !value) {
      errors[field] = `${field} is required`;
      isValid = false;
    } else if (minLength && value.length < minLength) {
      errors[field] = `${field} must be at least ${minLength} characters`;
      isValid = false;
    } else if (maxLength && value.length > maxLength) {
      errors[field] = `${field} must be less than ${maxLength} characters`;
      isValid = false;
    } else if (pattern && !pattern.test(value)) {
      errors[field] = message || `Invalid ${field}`;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Form field validator
export const createValidator = (rules) => {
  return (values) => {
    const errors = {};
    
    Object.keys(rules).forEach((field) => {
      const rule = rules[field];
      const value = values[field];
      
      if (rule.required && !value) {
        errors[field] = rule.requiredMessage || `${field} is required`;
      } else if (value) {
        if (rule.minLength && value.length < rule.minLength) {
          errors[field] = rule.minLengthMessage || `${field} must be at least ${rule.minLength} characters`;
        } else if (rule.maxLength && value.length > rule.maxLength) {
          errors[field] = rule.maxLengthMessage || `${field} must be less than ${rule.maxLength} characters`;
        } else if (rule.pattern && !rule.pattern.test(value)) {
          errors[field] = rule.message || `Invalid ${field}`;
        } else if (rule.validate) {
          const customError = rule.validate(value, values);
          if (customError) {
            errors[field] = customError;
          }
        }
      }
    });
    
    return errors;
  };
};
