import { Link } from 'gatsby';
import * as React from 'react';
import styled from '@emotion/styled';
import { css } from 'emotion';

import { colors } from '../styles/colors';
import { outer, inner } from '../styles/shared';
import config from '../website-config';

import { SocialLink } from './../styles/shared';
import Facebook from './icons/facebook';
import Twitter from './icons/twitter';
import Medium from './icons/medium';
import GitHub from './icons/github';
import RSS from './icons/rss';

const SiteFooter = css`
  position: relative;
  padding: 43px 95px;
  /* color: #fff; */
  background: ${colors.backgroundgray};
`;

const SiteFooterContent = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: #474747;
  font-size: 1.3rem;
  max-width: 1440px;
  margin: auto;
  a {
    color: #474747;
  }
  a:hover {
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
  }
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const SiteFooterNav = styled.nav`
  display: flex;

  a {
    position: relative;
    margin-left: 20px;
  }

  a:before {
    content: '';
    position: absolute;
    top: 11px;
    left: -11px;
    display: block;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 100%;
  }

  a:first-of-type:before {
    display: none;
  }
  @media (max-width: 650px) {
    a:first-child {
      margin-left: 0;
    }
  }
`;

const SocialLinks = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const Footer: React.FunctionComponent = () => {
  return (
    <footer className={`${outer} ${SiteFooter}`}>
      <div className={`${inner} ${SiteFooterContent}`}>
        <section className="copyright">
          <Link to="/">{config.title}</Link> &copy; {new Date().getFullYear()}
        </section>
        <SiteFooterNav>
          <SocialLinks>
            <SocialLinkItem path={config.facebook} title="Facebook" svg={<Facebook />} />
            <SocialLinkItem path={config.twitter} title="Twitter" svg={<Twitter />} />
            <SocialLinkItem path={config.medium} title="Medium" svg={<Medium />} />
            <SocialLinkItem path={config.github} title="GitHub" svg={<GitHub />} />
            <SocialLinkItem path={config.rss} title="RSS" svg={<RSS />} />
          </SocialLinks>
        </SiteFooterNav>
      </div>
    </footer>
  );
};

export default Footer;

const SocialLinkItem: React.FC<{
  path: string | undefined;
  title: string;
  svg: React.ReactElement<any>;
}> = ({ path, title, svg }) => {
  return path ? (
    <a
      className={`${SocialLink}`}
      href={path}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      {svg}
    </a>
  ) : null;
};
