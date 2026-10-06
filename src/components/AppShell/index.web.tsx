import Head from 'expo-router/head';
import { Link, usePathname } from 'expo-router';
import { useRef, useEffect, useState, type ReactNode } from 'react';
import { Icon } from '../Icon';
import PageMotion from '../PageMotion';
import { RouterAnchor } from '../RouterAnchor';
import { applicationName } from '../../shared/config';
import { navigation, routes } from '../../shared/routes';
import { useTheme } from '../../shared/themeContext/useTheme';
import { useMemes } from '../../shared/memesContext/useMemes';
import './styles.scss';
import '../MemeCard/styles.scss';
import '../AddMemePage/styles.scss';
import '../ContentPage/styles.scss';
import '../LibraryPage/styles.scss';
import '../LandingPage/styles.scss';
import '../MemeCarousel/styles.scss';
import '../CategoriesPage/styles.scss';
import '../MemeDetailPage/styles.scss';
import '../ConfirmDialog/styles.scss';
import '../../styles/global.scss';

const AppShell = ({ children, sticky = true }: { children: ReactNode; sticky?: boolean }) => {
  const pathname = usePathname();
  const main = useRef<HTMLElement>(null);
  const { theme, error: themeError, toggleTheme } = useTheme();
  const { error: dataError, notice, dismissNotice } = useMemes();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    const closeMenu = (event: KeyboardEvent) => { if (event.key === `Escape`) setMenuOpen(false); };
    window.addEventListener(`keydown`, closeMenu);
    return () => window.removeEventListener(`keydown`, closeMenu);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 16);
      const hero = document.querySelector<HTMLElement>(`[data-hero]`);
      setShowTop(window.scrollY > (hero ? hero.offsetTop + hero.offsetHeight : 320));
    };
    update();
    window.addEventListener(`scroll`, update, { passive: true });
    return () => window.removeEventListener(`scroll`, update);
  }, [pathname]);

  return (
    <div id={`app-shell`} className={`app-shell ${pathname === `/` ? `is-home` : ``}`} data-theme={theme}>
      <Head>
        <title id={`browser-tab-title`}>{`${applicationName} · Your Next Favorite Meme`}</title>
      </Head>
      <PageMotion scope={main} pathname={pathname} />
      <a id={`skip-navigation`} className={`skip-link`} href={`#main-content`}>Skip to content</a>
      <header id={`site-header`} className={`site-header ${scrolled ? `is-scrolled` : ``}`} data-sticky={sticky}>
        <div id={`header-inner`} className={`header-inner`}>
          <Link href={`/`} asChild>
            <RouterAnchor id={`brand-home`} className={`brand-link`} aria-label={`Memes Database home`}>
              <img id={`brand-mark`} className={`brand-mark`} src={`/brand/logo-mark.svg`} alt={``} />
              <span id={`brand-wordmark`} className={`brand-wordmark`}>Memes Database</span>
            </RouterAnchor>
          </Link>
          <nav id={`header-navigation`} className={`header-navigation ${menuOpen ? `is-open` : ``}`} aria-label={`Main navigation`}>
            {navigation.map(item => <Link key={item.path} href={item.path} asChild><RouterAnchor id={`nav-${item.label.toLowerCase()}`} className={`nav-link nav-menu-link`} aria-current={pathname === item.path ? `page` : undefined}><Icon name={item.icon} />{item.label}</RouterAnchor></Link>)}
            <Link href={routes.add} asChild><RouterAnchor id={`nav-mobile-add`} className={`nav-link nav-mobile-add`}><Icon name={`add`} />Add a Meme</RouterAnchor></Link>
            <Link href={routes.signin} asChild><RouterAnchor id={`nav-mobile-account-access`} className={`nav-link nav-mobile-auth`}><Icon name={`user`} />Sign In / Sign Up</RouterAnchor></Link>
          </nav>
          <div id={`header-actions`} className={`header-actions`}>
            <button id={`theme-toggle`} className={`icon-button theme-toggle`} onClick={toggleTheme} aria-label={`Switch to ${theme === `dark` ? `light` : `dark`} mode`} title={`Switch to ${theme === `dark` ? `light` : `dark`} mode`}><Icon name={theme === `dark` ? `sun` : `moon`} /></button>
            <Link href={routes.add} asChild><RouterAnchor id={`header-add-meme`} className={`button button-small header-add`}><Icon name={`add`} />Add a Meme</RouterAnchor></Link>
            <Link href={routes.signin} asChild><RouterAnchor id={`header-account-access`} className={`button button-small header-auth`}><Icon name={`user`} />Sign In / Sign Up</RouterAnchor></Link>
            <button
              id={`mobile-menu-toggle`}
              className={`icon-button mobile-menu-toggle`}
              aria-controls={`header-navigation`}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? `Close navigation` : `Open navigation`}
              onClick={() => setMenuOpen(open => !open)}
            >
              <svg id={`mobile-menu-symbol`} className={`icon mobile-menu-symbol`} viewBox={`0 0 24 24`} aria-hidden={`true`}>
                <path id={`mobile-menu-line-top`} className={`mobile-menu-line mobile-menu-line-top`} d={`M4 6h16`} />
                <path id={`mobile-menu-line-middle`} className={`mobile-menu-line mobile-menu-line-middle`} d={`M4 12h16`} />
                <path id={`mobile-menu-line-bottom`} className={`mobile-menu-line mobile-menu-line-bottom`} d={`M4 18h16`} />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main ref={main} id={`main-content`} className={`main-content`} tabIndex={-1}>{themeError ? <p id={`theme-storage-error`} className={`error-banner`} role={`alert`}>{themeError}</p> : null}{dataError ? <p id={`collection-storage-error`} className={`error-banner`} role={`alert`}>{dataError}</p> : null}{children}</main>
      <footer id={`site-footer`} className={`site-footer`}>
        <div id={`footer-top`} className={`footer-top`}>
          <Link href={`/`} asChild><RouterAnchor id={`footer-brand`} className={`footer-brand`}>Funny. Filed. Found.</RouterAnchor></Link>
          <nav id={`footer-navigation`} className={`footer-navigation`} aria-label={`Footer navigation`}>
            <Link href={`/about`} asChild><RouterAnchor id={`footer-about`}>About</RouterAnchor></Link>
            <Link href={`/terms`} asChild><RouterAnchor id={`footer-terms`}>Terms</RouterAnchor></Link>
            <Link href={`/privacy`} asChild><RouterAnchor id={`footer-privacy`}>Privacy</RouterAnchor></Link>
            <Link href={`/contact`} asChild><RouterAnchor id={`footer-contact`}>Contact</RouterAnchor></Link>
          </nav>
        </div>
        <div id={`footer-bottom`} className={`footer-bottom`}>
          <span id={`copyright`}>© {new Date().getFullYear()} Memes-Database</span>
          <a id={`piratechs-link`} className={`piratechs-link`} href={`https://piratechs.com/`}>Made with Piratechs<Icon name={`external`} /></a>
        </div>
      </footer>
      {notice ? <div id={`app-notice`} className={`app-toast`} role={`status`}><span id={`app-notice-text`}>{notice}</span><button id={`dismiss-notice`} className={`icon-button`} aria-label={`Dismiss message`} onClick={dismissNotice}><Icon name={`close`} /></button></div> : null}
      <button id={`scroll-to-top`} className={`scroll-to-top ${showTop ? `is-visible` : ``}`} tabIndex={showTop ? 0 : -1} aria-label={`Scroll to top`} onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia(`(prefers-reduced-motion: reduce)`).matches ? `auto` : `smooth` })}><Icon name={`up`} /></button>
    </div>
  );
};

export default AppShell;
