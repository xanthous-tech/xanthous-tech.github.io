// tslint:disable:no-http-string
import { Link } from 'gatsby';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';
import { SiteHeader, outer } from '../../styles/shared';

import SubscribeModal from '../subsribe/SubscribeOverlay';
import LanguageToggle from '../LanguangeToggle';
import SiteNavLogo from './SiteNavLogo';

import t from '../../content/i18n';

const HomeNavRaise = css`
  @media (min-width: 900px) {
    position: relative;
  }
`;

const SiteNavStyles = css`
  position: relative;
  display: flex;
  justify-content: space-between;
  max-width: 1300px;
  margin: auto;
  padding: 0 30px;
`;

const SiteNavLeft = styled.div`
  display: flex;
  z-index: 900;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  margin-right: 10px;
  letter-spacing: 0.4px;
  white-space: nowrap;

  -ms-overflow-scrolling: touch;

  /* @media (max-width: 700px) {
    margin-right: 0;
    padding-left: 4vw;
  } */
`;

const NavStyles = css`
  display: flex;
  margin: 0 0 0 -12px;
  padding: 0;
  list-style: none;

  li {
    display: block;
    margin: 0;
    padding: 0;
    text-transform: uppercase;
  }

  li a {
    display: block;
    margin: 0;
    padding-left: 60px;
    color: #fff;
    opacity: 0.85;
    font-family: Saira;
    font-size: 16px;
    line-height: 12px;
    @media (max-width: 1000px) {
      padding-left: 30px;
    }
  }

  li a:hover {
    text-decoration: none;
    opacity: 1;
  }
`;

const bold = css`
  font-weight: 800;
`;

const SiteNavRight = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 24px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const SubscribeButton = styled.a`
  display: block;
  padding: 4px 10px;
  border: #fff 1px solid;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1em;
  border-radius: 10px;
  opacity: 0.8;

  :hover {
    text-decoration: none;
    opacity: 1;
    cursor: pointer;
  }
`;

interface SiteNavProps {
  isHome?: boolean;
  langKey: string;
  slug?: string;
}

interface SiteNaveState {
  isOpen: boolean;
}

class SiteNav extends React.Component<SiteNavProps, SiteNaveState> {
  subscribe = React.createRef<SubscribeModal>();

  constructor(props: SiteNavProps) {
    super(props);
    this.state = { isOpen: false };
  }
  openModal = () => {
    if (this.subscribe.current) {
      this.subscribe.current.open();
    }
  };

  render() {
    const { isHome = false } = this.props;
    const linkPrefix = this.props.langKey === 'en' ? '' : this.props.langKey;

    console.log(this.props);
    return (
      <header className={`${SiteHeader} ${outer}`}>
        <nav className={`${SiteNavStyles}`}>
          <SiteNavLeft>{!isHome && <SiteNavLogo link={`${linkPrefix}/`} />}</SiteNavLeft>
          <SiteNavRight>
            <ul className={`${NavStyles}`} role="menu">
              <SiteNavItem exact={true} path={`${linkPrefix}/`} label={t['general.nav.home']()} />
              <SiteNavItem path={`${linkPrefix}/about`} label={t['general.nav.about']()} />
              <SiteNavItem path={`${linkPrefix}/projects`} label={t['general.nav.projects']()} />
              <SiteNavItem path={`${linkPrefix}/blog`} label={t['general.nav.blog']()} />
              <SiteNavItem path={`${linkPrefix}/contact`} label={t['general.nav.contact']()} />
            </ul>
            <LanguageToggle {...this.props} />
          </SiteNavRight>
        </nav>
      </header>
    );
  }
}

const SiteNavItem: React.FC<{ path: string; label: string; exact?: boolean }> = ({
  label,
  path,
  exact,
}) => {
  const currentSlug = () => {
    if (typeof window === 'undefined') {
      return;
    }

    if (exact) {
      return window.location.pathname === path ? `${bold}` : '';
    }

    return window.location.pathname.includes(path) ? `${bold}` : '';
  };

  return (
    <li className={currentSlug()} role="menuitem">
      <Link to={path}>{label}</Link>
    </li>
  );
};

export default SiteNav;
