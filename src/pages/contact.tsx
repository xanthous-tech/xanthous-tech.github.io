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
    background: #fff;
    padding-bottom: 4vw;
  }
`;

const Contact: React.FunctionComponent = () => (
  <IndexLayout langKey="en">
    <Helmet>
      <title>Contact Us - Xanthous Tech</title>
    </Helmet>
    <SiteNav langKey="en" slug="/contact" />
    <Wrapper className={`${PageTemplate}`}>
      <main id="site-main" className={`site-main ${SiteMain} ${outer}`}>
        <article className={`${PostFull} post page ${NoImage}`}>
          <PostFullHeader>
            <PostFullTitle>Contact Us</PostFullTitle>
          </PostFullHeader>

          <PostFullContent className="post-full-content">
            <div className="post-content">
              <p>
                If you have an idea, or need help to solve challenging technical problems, please
                drop us a line at&nbsp;<a href="mailto:hi@x-tech.io">hi@x-tech.io</a>!
              </p>
            </div>
          </PostFullContent>
        </article>
      </main>
    </Wrapper>
    <Footer />
  </IndexLayout>
);

export default Contact;
