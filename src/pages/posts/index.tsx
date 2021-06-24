import Head from 'next/head';
import React from 'react';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Como Projetar</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Arquitetura moderna e etc bla bla bla</strong>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
              consectetur sit quam odio a asperiores rerum saepe.
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Arquitetura moderna e etc bla bla bla</strong>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
              consectetur sit quam odio a asperiores rerum saepe.
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Arquitetura moderna e etc bla bla bla</strong>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro
              consectetur sit quam odio a asperiores rerum saepe.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
