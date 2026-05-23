require('dotenv').config();
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
stripe.account.retrieve()
  .then(acc => console.log('Stripe Account Country:', acc.country))
  .catch(err => console.error('Error:', err.message));
