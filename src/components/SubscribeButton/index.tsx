import { useSession, signIn } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    // precisa estar logado para se inscrever
    if (!session) {
      signIn('github');
      return;
    }

    // criação da checkout session
    // precisa usar o API Routes para client nao saber das chaves privadas
    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId }); // importante o jeito de passar o parametro
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      type="button"
      className={styles.subscribeButton}
    >
      Se increva agora!
    </button>
  );
}
