import * as React from 'react';

export const EmailTemplate = ({
  firstName,
  gpuDetails
}) => (
  <div>
    <h1>Hello, {firstName}!</h1>
    <p>Thank you for your GPU trade-in request. Here are the details:</p>
    
    <div style={{ margin: '20px 0', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
      <h2>Trade-In Details:</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>GPU: {gpuDetails.gpu}</li>
        <li>Brand: {gpuDetails.brand}</li>
        <li>Series: {gpuDetails.series.replace('%20', ' ')}</li>
        <li>Model: {gpuDetails.model}</li>
        <li>Condition: {gpuDetails.condition.replace('%20', ' ')}</li>
      </ul>
    </div>

    <p>Our team will review your request and contact you within 1-2 business days with next steps.</p>
    
    <p>Best regards,<br/>DepxTech Team</p>
  </div>
);
