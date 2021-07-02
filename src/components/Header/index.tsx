import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo-white.png" alt="logo" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/home">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts" prefetch>
            <a>Posts</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/about" prefetch>
            <a>Sobre</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
