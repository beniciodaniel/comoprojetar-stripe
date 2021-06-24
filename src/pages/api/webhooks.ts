import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import { saveSubscription } from './_lib/manageSubscription';
import { stripe } from '../../services/stripe';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false
  }
};

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    console.log('Evento recebido!');
    const buf = await buffer(req);
    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              false
            );

            break;
          case 'checkout.session.completed':
            const checkoutSession = event.data
              .object as Stripe.Checkout.Session;

            console.log('CHECKOUT SESSION COMPLETED: ', checkoutSession);

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              true
            );

            console.log('PASSEI DO SAVESUBSCRIPTION: :)');

            break;
          default:
            throw new Error('Unhandled event!');
        }
      } catch (error) {
        return res.json({ error: 'Webhook handler failed!' });
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
};
