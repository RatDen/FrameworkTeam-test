import styles from './Header.module.scss';

type HeaderProps = {
  children: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return <header className={styles.header}>{children}</header>;
}
