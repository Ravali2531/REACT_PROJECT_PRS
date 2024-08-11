const express = require('express');
const stripe = require('stripe')('sk_test_51Phhd2IBJqmyhxccuql9gK3ReHR7eaKVJo6QEZP05vIzaKaFpBvtWohMcOhHSvVuOYBTsHEKlRfGb6y0JHMF39yr005F3coRgb');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      payment_method_types: ['card'],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(4242, () => console.log('Server running on http://localhost:4242'));
