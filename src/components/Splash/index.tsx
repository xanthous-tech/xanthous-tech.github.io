import * as React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import logo from '../../content/img/x-tech-logo.svg';
import t from '../../content/i18n'

const StyledSplash = styled.section`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 70px;
  width: auto;
  background-color: #ffffff;

  .logo {
    width: 200px;
    padding: 20px;
  }

  .intro {
    width: 100vw;
    min-height: 802px;
    background-size: auto;
    background-repeat: no-repeat;
    background-position: right;
    position: relative;
  }

  .intro > .intro-title {
    position: absolute;
    top: 242px;
    left: 96px;
    font-family: Cabin;
    font-size: 64px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 0;
  }

  .intro-title > div {
    width: max-content;
    position: relative;
  }

  .intro-title h1 {
    position: relative;
    z-index: 2;
  }

  .intro-title .ghost {
    position: absolute;
    width: 100%;
    height: 25px;
    background-color: #ffcd38;
    opacity: 0.4;
    left: 0;
    bottom: 0;
    z-index: 1;
  }

  .intro > .intro-text {
    position: absolute;
    width: 50%;
    top: 428px;
    left: 103px;
    font-family: PingFangHK-Regular;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.8px;
  }

  .intro > .intro-invitation {
    position: absolute;
    width: 223px;
    height: 64px;
    top: 553px;
    left: 103px;
    background-color: #ffcc33;
    border-radius: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 7px 13px 18px 6px rgba(255 205 54, 0.17);
  }

  .intro-invitation > a {
    font-family: Cabin;
    font-size: 30px;
    color: #fff;
  }
  @media (min-width:376px) and (max-width:425px){
  .intro-invitation {
    margin-top: 100px;
  }
}
@media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
  .intro-invitation {
    margin-top: 100px;
  }
}
`;

export interface SplashProps {
  bg: String
}

const Splash: React.FunctionComponent<SplashProps> = ({ bg }) => (
  <StyledSplash>
    <div className="intro" style={{ backgroundImage: `url(${bg})` }} >
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="intro-title">
        <div>
          <h1>{t["general.splash.title1"]()}</h1>
          <div className="ghost" />
        </div>
        <div>
          <h1>{t["general.splash.title2"]()}</h1>
          <div className="ghost" />
        </div>
      </div>
      <p className="intro-text">
        {t["general.splash.intro-text"]()}
      </p>
      <div className="intro-invitation">
        <Link to="/contact">
          {t["general.splash.lets-chat"]()}
        </Link>
      </div>
    </div>
  </StyledSplash>
);

export default Splash;
