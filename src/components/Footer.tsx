import { Link } from 'gatsby';
import { setLightness } from 'polished';
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

import t from '../content/i18n';

const SiteFooter = css`
  position: relative;
  padding-top: 20px;
  padding-bottom: 60px;
  color: #fff;
  background: ${colors.backgroundgray};
`;

const SiteFooterContent = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  color: #474747;
  font-size: 1.3rem;
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
  a:last-of-type {
    padding-right: 20px;
  }
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
            {config.facebook && (
              <a
                className={`${SocialLink}`}
                href={config.facebook}
                target="_blank"
                title="Facebook"
                rel="noopener noreferrer"
              >
                <Facebook />
              </a>
            )}
            {config.twitter && (
              <a
                className={`${SocialLink}`}
                href={config.twitter}
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </a>
            )}
            {config.medium && (
              <a
                className={`${SocialLink}`}
                href={config.medium}
                title="Medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Medium />
              </a>
            )}
            {config.github && (
              <a
                className={`${SocialLink}`}
                href={config.github}
                title="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub />
              </a>
            )}
            {config.rss && (
              <a
                className={`${SocialLink}`}
                href={config.rss}
                title="RSS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RSS />
              </a>
            )}
          </SocialLinks>

          <Link to="/rss.xml">RSS</Link>
        </SiteFooterNav>
      </div>
    </footer>
  );
};

export default Footer;

/*
          {config.facebook && (
            <a href={config.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          )}
          {config.twitter && (
            <a href={config.twitter} target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
          )}
          {config.medium && (
            <a href={config.medium} title="Medium" target="_blank" rel="noopener noreferrer">
              Medium
            </a>
          )}
          {config.github && (
            <a href={config.github} title="GitHub" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
*/
