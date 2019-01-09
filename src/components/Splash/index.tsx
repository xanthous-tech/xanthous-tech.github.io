import * as React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";

const StyledSplash = styled.section`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  padding-bottom: 70px;
  width: auto;
  background-color: #ffffff;

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
`;

export interface SplashProps {
  bg: String
}

const Splash: React.FunctionComponent<SplashProps> = ({ bg }) => (
  <StyledSplash>
    <div className="intro" style={{ backgroundImage: `url(${bg})`}} >
      <div className="intro-title">
        <div>
          <h1>We build software</h1>
          <div className="ghost" />
        </div>
        <div>
          <h1>to help business grow.</h1>
          <div className="ghost" />
        </div>
      </div>
      <p className="intro-text">
        We're eager to help data driven companies achieve their business goals.
        All that is possible thanks to our distributed team of highly motivated
        individuals.
      </p>
      <div className="intro-invitation">
        <Link to="/contact">Let's Chat!</Link>
      </div>
    </div>
  </StyledSplash>
);

export default Splash;
