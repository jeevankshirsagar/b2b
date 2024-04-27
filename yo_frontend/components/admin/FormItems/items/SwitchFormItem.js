import React from "react";
import PropTypes from "prop-types";
import FormErrors from "components/admin/FormItems/formErrors";
import s from "./switch.module.scss";

const SwitchFormItem = ({ name, form, hint, size, errorMessage, inputProps, label, required }) => {
  const sizeLabelClassName = size === "small" ? "col-new-label-sm" : size === "large" ? "col-new-label-lg" : "";

  // Ensure form.values is defined and has the property 'name'
  const isChecked = form.values && form.values[name];

  return (
    <div className="form-group">
      {label && (
        <label
          className={`col-form-label ${required ? "required" : ""} ${sizeLabelClassName}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <div className={`${s.switch_container}`}>
        <input
          type="checkbox"
          id={name}
          name={name}
          className={`${s.switch_input}`}
          onChange={(event) => {
            form.setFieldValue(name, event.target.checked);
            form.setFieldTouched(name);
          }}
          checked={!!isChecked}
          {...inputProps}
        />
        <label htmlFor={name} className={`${s.switch_label}`}></label>
        <div className={`${s.switch_background}`}></div>
      </div>

      <div className="invalid-feedback">
        {FormErrors.displayableError(form, name, errorMessage)}
      </div>

      {hint && <small className="form-text text-muted">{hint}</small>}
    </div>
  );
};

SwitchFormItem.defaultProps = {
  inputProps: {},
  required: false, // Set default value for required prop
};

SwitchFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  hint: PropTypes.string,
  size: PropTypes.string,
  errorMessage: PropTypes.string,
  inputProps: PropTypes.object,
  label: PropTypes.string,
  required: PropTypes.bool, // Define prop type for required
};

export default SwitchFormItem;
