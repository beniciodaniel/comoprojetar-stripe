import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, cloneElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

export function ActiveLink({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  let className;

  if (asPath === rest.href) {
    className = activeClassName;
  } else if (
    asPath !== '/' &&
    rest.href !== '/' &&
    asPath.includes(String(rest.href))
  ) {
    className = activeClassName;
  } else {
    className = '';
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        className
      })}
    </Link>
  );
}
