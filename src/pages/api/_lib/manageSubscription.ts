import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  // buscar o usuário no banco da Fauna com o ID { customerID }
  // precisa criar um índice novo no fauna pra buscar user_by_stripe_customer_id
  // pegar o ref do user do fauna pra relacioanr na collection de subscription
  const userRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId))
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id
  };

  console.log('SUBSCRIPTION DATA: ', subscriptionData);

  if (createAction) {
    await fauna.query(
      q.Create(q.Collection('subscriptions'), { data: subscriptionData })
    );
  } else {
    console.log('TENTANDO ATUALIZAR: ', subscriptionData);
    await fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId)) // teve que criar mais um INDEX em fauna db
        ),
        {
          data: subscriptionData
        }
      )
    );
  }
}
