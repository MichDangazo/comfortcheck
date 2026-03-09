const Input = ({
  label,
  type = 'text',
  id,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  'aria-describedby': ariaDescribedBy,
  'aria-required': ariaRequired,
  ...props
}) => {
  const inputId = id || name;
  const describedBy = error ? `${inputId}-error` : ariaDescribedBy;
  const isRequired = ariaRequired !== undefined ? ariaRequired : required;

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {isRequired && <span className="required" aria-label="required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={isRequired}
        aria-describedby={describedBy}
        aria-invalid={error ? 'true' : 'false'}
        className={`input-field ${error ? 'error' : ''} ${disabled ? 'disabled' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="input-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;