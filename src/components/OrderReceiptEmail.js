export const OrderReceiptEmail = ({
  orderDetails,
  userEmail
}) => (
  <div style={{ 
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '40px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
  }}>
    <h1 style={{ 
      color: '#1a1a1a',
      fontSize: '24px',
      borderBottom: '2px solid #e6e6e6',
      paddingBottom: '16px',
      marginBottom: '24px',
      textAlign: 'center'
    }}>
      <span style={{ color: '#4F46E5' }}>DepxTech</span> Order Confirmation
    </h1>
    
    <p style={{ 
      fontSize: '16px',
      color: '#4F46E5',
      textAlign: 'center',
      fontWeight: '500'
    }}>Thank you for your order!</p>
    
    <div style={{ margin: '32px 0' }}>
      <h2 style={{ 
        color: '#1a1a1a',
        fontSize: '18px',
        marginBottom: '16px'
      }}>Order Details</h2>
      <div style={{
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '6px'
      }}>
        <p style={{ margin: '4px 0', color: '#4b5563' }}>Order ID: {orderDetails.payment_intent_id}</p>
        <p style={{ margin: '4px 0', color: '#4b5563' }}>Date: {new Date(orderDetails.created_at).toLocaleString()}</p>
      </div>
    </div>
    
    <div style={{ margin: '32px 0' }}>
      <h3 style={{ 
        color: '#1a1a1a',
        fontSize: '18px',
        marginBottom: '16px'
      }}>Items</h3>
      {orderDetails.items.map((item, index) => (
        <div key={index} style={{ 
          padding: '16px',
          borderBottom: '1px solid #e6e6e6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flex: 1
          }}>
            <img 
              src={`https://src.depxtech.com/${item.image}`}
              alt={item.title}
              width="64"
              height="64"
              style={{
                width: '64px',
                height: '64px',
                objectFit: 'cover',
                borderRadius: '6px',
                border: '1px solid #e6e6e6',
                backgroundColor: '#f9fafb'
              }}
            />
            <div>
              <p style={{ margin: '0', fontWeight: '500', color: '#1a1a1a' }}>{item.title}</p>
              <p style={{ margin: '4px 0 0', color: '#6b7280' }}>Quantity: {item.quantity}</p>
            </div>
          </div>
          <p style={{ 
            margin: '0', 
            fontWeight: '500', 
            color: '#4F46E5',
            whiteSpace: 'nowrap'
          }}>
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
    
    <div style={{ margin: '32px 0' }}>
      <h3 style={{ 
        color: '#1a1a1a',
        fontSize: '18px',
        marginBottom: '16px'
      }}>Shipping Address</h3>
      <div style={{
        padding: '16px',
        backgroundColor: '#f9fafb',
        borderRadius: '6px',
        color: '#4b5563'
      }}>
        <p style={{ lineHeight: '1.6', margin: '0' }}>
          {orderDetails.shipping_address.first_name} {orderDetails.shipping_address.last_name}<br />
          {orderDetails.shipping_address.line1}<br />
          {orderDetails.shipping_address.line2 && <>{orderDetails.shipping_address.line2}<br /></>}
          {orderDetails.shipping_address.city}, {orderDetails.shipping_address.state} {orderDetails.shipping_address.postal_code}<br />
          {orderDetails.shipping_address.country}
        </p>
      </div>
    </div>
    
    <div style={{ 
      margin: '32px 0',
      padding: '24px',
      backgroundColor: '#4F46E5',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h3 style={{ 
        color: '#ffffff',
        margin: '0',
        fontSize: '20px'
      }}>
        Total Amount: ${orderDetails.total_amount.toFixed(2)}
      </h3>
    </div>
    
    <div style={{ 
      marginTop: '40px',
      padding: '24px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#6b7280',
      textAlign: 'center'
    }}>
      <p style={{ margin: '0 0 8px' }}>If you have any questions about your order, please contact our support team at <span style={{ color: '#4F46E5' }}>support@depxtech.com</span></p>
      <p style={{ margin: '0' }}>Order confirmation sent to: <span style={{ color: '#4F46E5' }}>{userEmail}</span></p>
    </div>
  </div>
); 