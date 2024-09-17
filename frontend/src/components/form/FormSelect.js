import React from 'react';

const FormSelect = ({ label, value, onChange, error, options }) => (
  <div className="form-group">
    <label className="col-sm-2 control-label">{label}</label>
    <div className="col-sm-10">
      <select className="form-control" value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  </div>
);

export default FormSelect;
