import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import Head from 'next/head';
import Prismic from '@prismicio/client';
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

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100
    }
  );

  console.log(JSON.stringify(response, null, 2));

  return {
    props: {}
  };
};
