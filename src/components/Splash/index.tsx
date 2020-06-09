import * as React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import t from '../../content/i18n';
import { colors } from '../../styles/colors';

const StyledSplash = styled.section`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  background-color: #ffffff;

  .logo {
    width: 200px;
    padding: 20px;
  }

  .intro {
    min-height: 650px;
    background-size: 555px;
    background-repeat: no-repeat;
    background-position: right;
    position: relative;
  }

  /* .intro > .dashed {
    position: absolute;
    height: 554px;
    width: 95px;
    top: 65px;
    left: 18px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  } */

  /* .intro > .dashed-pic-border {
    position: relative;
    background-position: right;
    height: 554px;
    width: 500px;
    top: 65px;
    left: 800px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  } */

  .intro > .intro-title {
    position: absolute;
    top: 130px;
    left: 50px;
    font-family: Saira;
    letter-spacing: 1px;
    color: black;
    line-height: 84px;
    margin-bottom: 0;
    position: absolute;
  }

  @media (max-width: 1200px) {
    .intro > .intro-title {
      font-size: 48px;
      line-height: 72px;
    }
  }

  .intro-title > div {
    width: max-content;
    position: relative;
  }

  /* .intro-title h1 {
    position: relative;
    z-index: 2;
  } */

  .intro > .intro-quote {
    position: absolute;
    width: 133px;
    height: 154px;
    top: 30px;
    font-family: Saira;
    font-weight: 500;
    font-size: 300px;
    line-height: 300px;
    color: ${colors.quotegray};
  }

  .intro > .intro-text {
    position: absolute;
    width: 689px;
    top: 350px;
    left: 50px;
    height: 96px;
    font-family: Sarala, sans-serif;
    font-size: 26px;
    line-height: 42px;
    letter-spacing: 0.8px;
  }

  .intro > .intro-invitation {
    position: absolute;
    width: 200px;
    height: 60px;
    top: 540px;
    left: 50px;
    background: ${colors.yellow};
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 7px 13px 18px 6px rgba(255 205 54, 0.17);
  }

  .intro-invitation:hover {
    background: ${colors.fadedyellow};
  }

  .intro-invitation > a {
    color: ${colors.darkyellow};
    font-family: Saira;
    font-weight: 600;
    font-size: 30px;
    line-height: 56px;
    text-decoration: none;
  }

  @media (max-width: 1200px) {
    .intro {
      min-height: 550px;
      background-size: 400px;
    }
    .intro > .intro-quote {
      top: -20px;
      left: 10px;
    }
    .intro > .intro-title {
      top: 70px;
      left: 70px;
    }
    .intro > .intro-text {
      top: 210px;
      font-size: 20px;
      width: 340px;
      left: 70px;
    }
    .intro > .intro-invitation {
      top: 445px;
      left: 70px;
    }
    .intro > .dashed {
      display: none;
    }

    .intro > .dashed-pic-border {
      display: none;
    }
  }

  @media (min-width: 376px) and (max-width: 425px) {
    .intro-invitation {
      margin-top: 100px;
    }
  }
  @media (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) {
    .intro-invitation {
      margin-top: 100px;
    }
  }
`;

export interface SplashProps {
  bg: String;
}

const Splash: React.FunctionComponent<SplashProps> = ({ bg }) => (
  <StyledSplash>
    <div className="intro" style={{ backgroundImage: `url(${bg})` }}>
      <div className="intro-quote">“</div>
      <div className="intro-title">
        <h1 className="bold">
          {t['general.splash.title1']()}
          <br />
          {t['general.splash.title2']()}
        </h1>
      </div>
      <p className="intro-text">{t['general.splash.intro-text']()}</p>
      <div className="intro-invitation">
        <Link to="/contact">{t['general.splash.lets-chat']()}</Link>
      </div>
    </div>
  </StyledSplash>
);

export default Splash;
