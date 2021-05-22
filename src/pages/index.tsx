import Head from 'next/head';
import styles from './home.module.scss';

export default function Home() {
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
            <span>por R$ 4,90 por mês</span>
          </p>
        </section>

        <img src="/images/avatar.svg" alt="Avatar" />
      </main>
    </>
  );
}
