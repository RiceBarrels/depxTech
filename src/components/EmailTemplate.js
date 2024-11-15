export const EmailTemplate = ({ firstName, details, to, type }) => {
    const getDetailsContent = () => {
        switch(type.toLowerCase()) {
            case 'gpu':
                return (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ color: '#64748b', marginRight: '8px' }}>GPU:</span>
                            <span style={{ color: '#1e293b', fontWeight: 500 }}>{details.gpu}</span>
                        </li>
                        <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ color: '#64748b', marginRight: '8px' }}>Brand:</span>
                            <span style={{ color: '#1e293b', fontWeight: 500 }}>{details.brand}</span>
                        </li>
                        <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ color: '#64748b', marginRight: '8px' }}>Series:</span>
                            <span style={{ color: '#1e293b', fontWeight: 500 }}>{details.series}</span>
                        </li>
                        <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ color: '#64748b', marginRight: '8px' }}>Model:</span>
                            <span style={{ color: '#1e293b', fontWeight: 500 }}>{details.model}</span>
                        </li>
                        <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ color: '#64748b', marginRight: '8px' }}>Condition:</span>
                            <span style={{ color: '#1e293b', fontWeight: 500 }}>{details.condition}</span>
                        </li>
                        <li style={{ padding: '12px 0' }}>
                            <span style={{ color: '#64748b', marginRight: '8px' }}>Offered Price:</span>
                            <span style={{ color: '#2563eb', fontWeight: 600, fontSize: '18px' }}>${details.price}</span>
                        </li>
                    </ul>
                );
            case 'ram':
                return (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ color: '#64748b', marginRight: '8px' }}>DDR Type:</span>
                            <span style={{ color: '#1e293b', fontWeight: 500 }}>{details.ddr}</span>
                        </li>
                        <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ color: '#64748b', marginRight: '8px' }}>Brand:</span>
                            <span style={{ color: '#1e293b', fontWeight: 500 }}>{details.brand}</span>
                        </li>
                        <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ color: '#64748b', marginRight: '8px' }}>Speed:</span>
                            <span style={{ color: '#1e293b', fontWeight: 500 }}>{details.speed}</span>
                        </li>
                        <li style={{ padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
                            <span style={{ color: '#64748b', marginRight: '8px' }}>Condition:</span>
                            <span style={{ color: '#1e293b', fontWeight: 500 }}>{details.condition}</span>
                        </li>
                        <li style={{ padding: '12px 0' }}>
                            <span style={{ color: '#64748b', marginRight: '8px' }}>Offered Price:</span>
                            <span style={{ color: '#2563eb', fontWeight: 600, fontSize: '18px' }}>${details.price}</span>
                        </li>
                    </ul>
                );
            // Add more cases for other trade-in types here
            default:
                return <p>Invalid trade-in type</p>;
        }
    };

    const getAcceptUrl = () => {
        switch(type.toLowerCase()) {
            case 'gpu':
                return `https://depxtech.com/trade/gpu/${details.gpu}/${details.series}/${details.modelId}/${details.brand}/${details.condition}/${details.placeHolder}/accept?email=${to}`;
            case 'ram':
                return `https://depxtech.com/trade/ram/${details.ddr}/${details.speedId}/${details.size}/${details.brand}/${details.condition}/Sell-RAM/accept?email=${to}`;
            default:
                return '#';
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#2563eb', textAlign: 'center', marginBottom: '24px' }}>
                New {type.toUpperCase()} Trade In Request
            </h1>
            <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#475569', marginBottom: '16px', fontSize: '18px' }}>Trade-In Details:</h2>
                {getDetailsContent()}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>Hello {firstName} ({to}),</p>
                <p>Please click the button below to accept the Trade In request.</p>
                <a href={getAcceptUrl()}>
                    <button style={{ backgroundColor: '#2563eb', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', fontWeight: 600, fontSize: '18px' }}>
                        Accept Trade In
                    </button>
                </a>
                <p>If you have any questions, please contact us at <a href="mailto:support@depxtech.com">support@depxtech.com</a>.</p>
                <small>If you are unable to click the button, please copy and paste the link below into your browser:</small><br/>
                <small>{getAcceptUrl()}</small>
            </div>
        </div>
    );
};