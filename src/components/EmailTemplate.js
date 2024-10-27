export const EmailTemplate = ({ firstName, gpuDetails, to }) => (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2563eb', textAlign: 'center', marginBottom: '24px' }}>New GPU Trade In Request</h1>
      <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#475569', marginBottom: '16px', fontSize: '18px' }}>Trade-In Details:</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', marginRight: '8px' }}>GPU:</span>
            <span style={{ color: '#1e293b', fontWeight: 500 }}>{gpuDetails.gpu}</span>
          </li>
          <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', marginRight: '8px' }}>Brand:</span>
            <span style={{ color: '#1e293b', fontWeight: 500 }}>{gpuDetails.brand}</span>
          </li>
          <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', marginRight: '8px' }}>Series:</span>
            <span style={{ color: '#1e293b', fontWeight: 500 }}>{gpuDetails.series}</span>
          </li>
          <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', marginRight: '8px' }}>Model:</span>
            <span style={{ color: '#1e293b', fontWeight: 500 }}>{gpuDetails.model}</span>
          </li>
          <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', marginRight: '8px' }}>Condition:</span>
            <span style={{ color: '#1e293b', fontWeight: 500 }}>{gpuDetails.condition}</span>
          </li>
          <li style={{ padding: '12px 0' }}>
            <span style={{ color: '#64748b', marginRight: '8px' }}>Offered Price:</span>
            <span style={{ color: '#2563eb', fontWeight: 600, fontSize: '18px' }}>${gpuDetails.price}</span>
          </li>
        </ul>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Please click the button below to accept the Trade In request.</p>
        <a href={`http://localhost:3000/trade/gpu/${gpuDetails.gpu}/${gpuDetails.series}/${gpuDetails.modelId}/${gpuDetails.brand}/${gpuDetails.condition}/${gpuDetails.placeHolder}/accept?email=${to}`}>
            <button style={{ backgroundColor: '#2563eb', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', fontWeight: 600, fontSize: '18px' }}>Accept Trade In</button>
        </a>
      </div>
    </div>
);