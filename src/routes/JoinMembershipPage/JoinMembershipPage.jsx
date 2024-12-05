import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './JoinMembershipPage.scss';

const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your Stripe public key

function CheckoutForm({ plan, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return; // Make sure stripe and elements are loaded

    setLoading(true);

    // Create payment method and process the payment
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log(error);
      setLoading(false);
    } else {
      // Send payment info to your backend
      const response = await fetch('http://localhost:5000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          plan,
        }),
      });

      const session = await response.json();

      if (session.error) {
        console.log(session.error);
        setLoading(false);
      } else {
        onSuccess(session.client_secret);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Card details
          <CardElement />
        </label>
      </div>
      <button disabled={loading || !stripe} type="submit">
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

function JoinMembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState('Basic'); // Default plan selection

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePaymentSuccess = (clientSecret) => {
    console.log('Payment successful with client secret:', clientSecret);
    alert('Payment was successful!');
  };

  return (
    <div className="join-membership-page">
      <h1>Join Our Membership</h1>
      <p className="intro">
        Become a member of Urban Nest and unlock exclusive benefits to enhance your real estate experience.
        Choose from our affordable membership plans.
      </p>

      <section className="plans">
        <div className="plan-card" onClick={() => handlePlanChange('Basic')}>
          <h2>Basic Plan</h2>
          <p className="price">$19.99 / month</p>
          <ul>
            <li>Access to exclusive listings</li>
            <li>Monthly market insights</li>
            <li>Priority support</li>
          </ul>
        </div>

        <div className="plan-card" onClick={() => handlePlanChange('Premium')}>
          <h2>Premium Plan</h2>
          <p className="price">$49.99 / month</p>
          <ul>
            <li>Everything in Basic Plan</li>
            <li>Advanced property search filters</li>
            <li>Personalized property recommendations</li>
          </ul>
        </div>

        <div className="plan-card" onClick={() => handlePlanChange('Ultimate')}>
          <h2>Ultimate Plan</h2>
          <p className="price">$99.99 / month</p>
          <ul>
            <li>Everything in Premium Plan</li>
            <li>Exclusive VIP listings</li>
            <li>Investment analysis tools</li>
          </ul>
        </div>
      </section>

      <Elements stripe={stripePromise}>
        <CheckoutForm plan={selectedPlan} onSuccess={handlePaymentSuccess} />
      </Elements>
    </div>
  );
}

export default JoinMembershipPage;
