import React from "react";
import PropTypes from "prop-types";
import s from "./switch.module.scss";

const Toggle = ({ name, form, inputProps, schema }) => {
  const isChecked = form.values && form.values[name];

  return (
    <div className={s.switch_container}>
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
  );
};

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  inputProps: PropTypes.object,
  schema: PropTypes.object.isRequired, // Add schema to prop types
};

export default Toggle;
