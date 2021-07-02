import { FaGithub, FaTwitter } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signin, useSession, signOut } from 'next-auth/client';

import styles from './styles.module.scss';

export function SignInButton() {
  const [session] = useSession();

  console.log(session, 'SESSION');

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaTwitter color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signin('twitter')}
    >
      <FaTwitter color="#eba417" />
      Entrar com Twitter
    </button>
  );
}
