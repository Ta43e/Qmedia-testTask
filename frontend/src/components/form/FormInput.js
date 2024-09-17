import React from 'react';

const FormInput = ({ label, value, onChange, error, placeholder, type = 'text' }) => (
  <div className="form-group">
    <label className="col-sm-2 control-label">{label}</label>
    <div className="col-sm-10">
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  </div>
);

export default FormInput;
