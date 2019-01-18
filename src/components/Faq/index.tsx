import * as React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import FaqItem from './FaqItem';

import t from '../../content/i18n';

const StyledDiv = styled.div`
  .faq-02 {
    padding: 70px 0 40px;
    .container--small {
      max-width: 550px;
      .emoji{
        position: relative;
        vertical-align: middle;
        bottom: 1px;
        max-height: 1em;
      }
      .heading .emoji, .text--04__big_text .emoji {
        margin-left: 0.3em;
        margin-right: 0.3em;
      }
      .title-box--center {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        }
      .title-box {
        margin-bottom: 50px;
        max-width: 700px;
      }
      .heading, .text--04__big_text {
        font-size: 2em;
      }
      .title-box--center .title-box__text {
        margin-left: auto;
        margin-right: auto;
      }
      .title-box__text {
        opacity: 0.9;
        max-width: 80%;
      }
    }
    .faq-02__container {
      display: flex;
      text-align: center;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      margin-top: 30px;
    }
  }
  .container {
    margin-right: auto;
    margin-left: auto;
    padding: 0 15px;
    max-width: 1080px;
  }
  .faq-02__list {
      padding: 0;
      margin: 0 auto;
      list-style: none;
      width: 50%;
      min-width: 375px;
    .faq-02__item {
        position: relative;
        padding-right: 40px;
        padding-left: 35px;
        margin-bottom: 70px;
        .help_icon_wrapper{
          position: absolute;
          width: 20px;
          left: 0;
        }
        .faq-02__question_heading {
          margin-top: 0;
          color: #4D61FC!important;
        }
      }
    }
  .faq-02__button_box{
    padding: 0;
    margin: 0;
    list-style: none;
    margin-bottom: 40px;
    text-align: center;
    .faq-02__button {
      display: inline-block;
      margin-left: 7px;
      margin-right: 7px;
      margin-bottom: 10px;
      &:hover{
        transform: translate3d(0, -2px, 0);
      }
      .button--midnight-outline {
        background-color: transparent;
        color: #00396B;
      }
      .button {
        overflow: hidden;
        display: inline-block;
        position: relative;
        padding: 12px 20px 12px;
        min-width: 120px;
        border: 2px solid transparent;
        min-height: 44px;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(136, 144, 195, 0.2), 0 5px 15px 0 rgba(37, 44, 97, 0.15);
        font-size: 14px;
        font-weight: 700;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: center;
        border: 1px solid #00396B;
        text-decoration: none;
        cursor: pointer;
        transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease,    box-shadow 0.2s ease, transform 0.2s ease;
}
    }
  }
`;

export interface FAQProps {
  title_icon: {
    childImageSharp: {
      fluid: any;
    };
  }
  allFaqYaml: {
    edges: {
      node: {
        question: string;
        answer: string;
      };
    }[];
  }

}


const renderFaq: React.FunctionComponent<FAQProps> = (data) => {
  const icon = data.title_icon.childImageSharp.fluid.src;
  const faqLeft = data.allFaqYaml.edges.slice(0, data.allFaqYaml.edges.length / 2);
  const faqRight = data.allFaqYaml.edges.slice(data.allFaqYaml.edges.length / 2);
  return (
    <StyledDiv>
      <div className="faq-02">
        <div className="container container--small">
          <div className="title-box title-box--center">
            <h2 className="heading">You Ask &mdash; We Tell<img className="emoji" src={icon} alt="Emoji" />
            </h2>
            {/* <p className="title-box__text">Musas sunt boreass de varius elevatus. Ferox, camerarius homos inciviliter resuscitabo de talis, bassus mens.</p> */}
          </div>
        </div>
        <div className="container faq-02__container">
          <ul className="faq-02__list">
            {faqLeft.map((item: any) => (
              <li className="faq-02__item" key={item.node.id}>
                <FaqItem
                  title={t[item.node.question]()}
                  content={t[item.node.answer]()}
                />
              </li>
            ))}
          </ul>
          <ul className="faq-02__list">
            {faqRight.map((item: any) => (
              <li className="faq-02__item" key={item.node.id}>
                <FaqItem
                  title={t[item.node.question]()}
                  content={t[item.node.answer]()}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="container">
          <ul className="faq-02__button_box">
            <li className="faq-02__button">
              <a className="button button--midnight-outline " href="#" target="_blank" rel="noreferrer">
                <span>{t["general.faq.button.email-support"]()}</span>
              </a>
            </li>
            <li className="faq-02__button">
              <a className="button button--midnight-outline " href="#" target="_blank" rel="noreferrer">
                <span>{t["general.faq.button.live-support"]()}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </StyledDiv>
  );
};

const Faq: React.FunctionComponent = () => (
  <StaticQuery
    query={graphql`
      query FaqQuery {
        title_icon: file(relativePath: { eq: "img/chatbot.png" }) {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        allFaqYaml {
          edges {
            node {
              id
              question
              answer
            }
          }
        }
      }
    `}
    render={renderFaq}
  />
);

export default Faq;
