import IndexLayout from '../layouts';
import Wrapper from '../components/Wrapper';
import SiteNav from '../components/header/SiteNav';
import { SiteHeader, outer, inner, SiteMain } from '../styles/shared';
import * as React from 'react';
import { css } from 'emotion';

import { PostFullHeader, PostFullTitle, NoImage, PostFull } from '../templates/post';
import { PostFullContent } from '../components/PostContent';
import Footer from '../components/Footer';
import Helmet from 'react-helmet';

const PageTemplate = css`
  .site-main {
    background #fff;
    padding-bottom: 4vw;
  }
`;


const About: React.FunctionComponent = () => (
  <IndexLayout langKey="en">
    <Helmet>
      <title>About Xanthous Tech</title>
    </Helmet>
    <Wrapper className={`${PageTemplate}`}>
      <header className={`${SiteHeader} ${outer}`}>
        <div className={`${inner}`}>
          <SiteNav langKey="en" slug="/about" />
        </div>
      </header>
      <main id="site-main" className={`site-main ${SiteMain} ${outer}`}>
        <article className={`${PostFull} post page ${NoImage}`}>
          <PostFullHeader>
            <PostFullTitle>About Us</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <p>
                We started off as a group of freelancers, to help teams and companies around the world to solve various technical challenges.
                We realized that we really love to work with startups and to help them succeed. More importantly, we are pretty good at it!
                So we started Xanthous Tech in 2018 to help more businesses grow.
              </p>
              <p>Check out our <a href="/projects">projects</a> and see what it is like to work with us!</p>
              {/* <blockquote>
                <p>
                  If you'd like to set up a site like this for yourself, head over to{' '}
                  <a href="https://ghost.org">Ghost.org</a> and start a free 14 day trial to give
                  Ghost a try!
                </p>
              </blockquote> */}
            </div>
          </PostFullContent>
        </article>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
