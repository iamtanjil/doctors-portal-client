import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';


const CheckOut = ({ booking }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, seTCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const { price, email, patient, _id } = booking;
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://doctors-portal-server-orpin-ten.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            seTCardError(error.message);
        }
        else {
            seTCardError('');
        }
         setSuccess('');
         setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patient,
                        email: email
                    },
                },
            },
        );
        if (paymentIntent.status === "succeeded") {
            setSuccess('Congratulation! Your Payment is Successful.');
            setTransactionId(paymentIntent.id);
            setProcessing(false)
            const payment = {
                objectId: _id,
                transactionId: paymentIntent.id,
                price,
                email
            }
            fetch('https://doctors-portal-server-orpin-ten.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary bg-gradient-to-r from-primary to-secondary text-white btn-sm mt-10' type="submit" disabled={!stripe || processing || !clientSecret}>
                    Pay
                </button>
            </form>
            <p className='text-red-500 mt-2'>{cardError}</p>
            {
                success && <>
                    <p className='text-green-500'>{success}</p>
                    <p className='mt-2'>Txd Id: <strong>{transactionId}</strong></p>
                </>
            }
        </>
    );
};

export default CheckOut;