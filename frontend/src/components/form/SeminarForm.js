import React, { useState } from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import { validateEmail, validateName } from '../../utils/validation';
import '../../styles/form.css';

const SeminarForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [seminar, setSeminar] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};

    // Name validation
    if (!validateName(name)) {
      formIsValid = false;
      errors['name'] = 'Please enter your name';
    }

    // Email validation
    if (!validateEmail(email)) {
      formIsValid = false;
      errors['email'] = 'Invalid email format';
    }

    // Seminar validation
    if (!seminar) {
      formIsValid = false;
      errors['seminar'] = 'Please select a seminar';
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            seminar,
          }),
        });
        const result = await response.json();
        if (response.ok) {
          alert('Email sent successfully!');
          // Очистка полей формы после успешной отправки
          setName('');
          setEmail('');
          setSeminar('');
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send email.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="container form-container">
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors['name']}
          placeholder="Enter your name"
        />

        <FormInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors['email']}
          placeholder="Enter your email"
          type="email"
        />

        <FormSelect
          label="Seminar"
          value={seminar}
          onChange={(e) => setSeminar(e.target.value)}
          error={errors['seminar']}
          options={[
            { value: '', text: 'Select a seminar' },
            { value: 'backend', text: 'Backend' },
            { value: 'frontend', text: 'Frontend' },
            { value: 'devops', text: 'DevOps' },
          ]}
        />

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SeminarForm;
