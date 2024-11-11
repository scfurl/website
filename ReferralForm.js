import React, { useState } from 'react';

const ReferralForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    dob: '',
    address: '',
    cityStateZip: '',
    phone: '',
    email: '',
    primaryInsurancePlan: '',
    primaryMemberId: '',
    primaryGroupNumber: '',
    secondaryInsurancePlan: '',
    secondaryMemberId: '',
    secondaryGroupNumber: '',
    reasonForReferral: '',
    urgency: '',
    eye: [],
    doctorName: '',
    practiceName: '',
    officeAddress: '',
    doctorPhone: '',
    doctorFax: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'eye') {
      setFormData((prevState) => {
        const eye = checked
          ? [...prevState.eye, value]
          : prevState.eye.filter((eyeValue) => eyeValue !== value);
        return { ...prevState, eye };
      });
    } else if (type === 'radio' && name === 'urgency') {
      setFormData((prevState) => ({ ...prevState, urgency: value }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        // Display success message or redirect
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error
      });
  };

  return (
    <div className="container">
      {/* Logo and Contact Info */}
      <img src="assets/img/logo.png" alt="Cascade Retina Logo" className="logo" />
      <div className="contact-info">
        <p>10521 19th Ave SE Suite 100</p>
        <p>Everett, WA 98208</p>
        <p>Phone: 425-533-9777</p>
        <p>Fax: 425-533-9800</p>
        <p>
          Email: <a href="mailto:scottfurlan@gmail.com">scottfurlan@gmail.com</a>
        </p>
      </div>

      {/* Back Button at the Top */}
      <div className="button-group">
        <button type="button" onClick={() => window.history.back()}>
          Back
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <h1>Patient Referral Form</h1>

        {/* Patient Information */}
        <div className="form-section">
          <h3>Patient Information</h3>
          <label htmlFor="patientName">Name:</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />

          {/* ... (other input fields similar to above) */}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Primary Insurance */}
        <div className="insurance-section">
          <h3>Primary Insurance</h3>
          <label htmlFor="primaryInsurancePlan">Insurance Plan:</label>
          <input
            type="text"
            id="primaryInsurancePlan"
            name="primaryInsurancePlan"
            value={formData.primaryInsurancePlan}
            onChange={handleChange}
            required
          />

          {/* ... (other input fields for primary insurance) */}
        </div>

        {/* Secondary Insurance (Optional) */}
        <div className="insurance-section">
          <h3>Secondary Insurance (Optional)</h3>
          <label htmlFor="secondaryInsurancePlan">Insurance Plan:</label>
          <input
            type="text"
            id="secondaryInsurancePlan"
            name="secondaryInsurancePlan"
            value={formData.secondaryInsurancePlan}
            onChange={handleChange}
          />

          {/* ... (other input fields for secondary insurance) */}
        </div>

        {/* Reason for Referral */}
        <div className="form-section">
          <h3>Reason for Referral</h3>
          <textarea
            id="reasonForReferral"
            name="reasonForReferral"
            rows="4"
            value={formData.reasonForReferral}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Urgency */}
        <div className="form-section">
          <h3>When do you want the patient to be seen?</h3>
          <div className="checkbox-group">
            <label>
              <input
                type="radio"
                name="urgency"
                value="Immediately"
                checked={formData.urgency === 'Immediately'}
                onChange={handleChange}
                required
              />{' '}
              Immediately
            </label>
            {/* ... (other urgency options) */}
          </div>
        </div>

        {/* Eye */}
        <div className="form-section">
          <h3>Eye</h3>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="eye"
                value="OD"
                checked={formData.eye.includes('OD')}
                onChange={handleChange}
              />{' '}
              OD (Right Eye)
            </label>
            {/* ... (other eye options) */}
          </div>
        </div>

        {/* Referring Doctor */}
        <div className="form-section">
          <h3>Referring Doctor</h3>
          <label htmlFor="doctorName">Name:</label>
          <input
            type="text"
            id="doctorName"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            required
          />

          {/* ... (other input fields for doctor) */}
        </div>

        {/* Submit and Back Buttons */}
        <div className="button-group">
          <button type="submit">Submit Referral</button>
          <button type="button" onClick={() => window.history.back()}>
            Back
          </button>
        </div>
      </form>

      {/* Footer */}
      <div className="footer">
        <p>
          <a href="https://www.cascaderetina.com/" target="_blank" rel="noopener noreferrer">
            Julie Furlan, MD | www.CascadeRetina.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ReferralForm;
