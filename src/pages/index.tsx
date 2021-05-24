import { GetServerSideProps } from 'next'
import Head from 'next/head';
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home: Como Projetar</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Olá, bem-vindo(a)!</span>
          <h1>Posts sobre o mundo da <span>Arquitetura</span></h1>
          <p>
            Adquira acesso a todos os posts <br />
            <span>por {product.amount} por mês</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Avatar" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1IuKklI9fYz4u6LvOs4RAEgs', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat([], {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product
    }
  }
}