import React from 'react';
import PropTypes from 'prop-types'
import refractor from 'refractor'
import rehype from 'rehype'
import { css } from 'emotion'

const CodeStyle = css`
 pre {
   border: 1px solid #eaeaea;
   padding: 20px;
   margin: 24px 0 40px;
   white-space: pre;
   overflow: auto;
   -webkit-overflow-scrolling: touch;
   background: white;
 }
 code {
   color: #000;
   font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
     DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
     serif;
   font-size: 13px;
   line-height: 20px;
 }
 pre.dark {
   border-color: #333;
   background: transparent;
 }
 .dark code {
   color: #fff;
 }
 .dark.bash code {
   color: #50e3c2;
 }
`;

export const Code: React.FunctionComponent = ({codeString, language}) => {
  return (
  <pre className={(true ? 'dark' : '') + (language ? ` ${language}` : '')}>
    {language ? (
      // tslint:disable-next-line:react-no-dangerous-html
      <code
        className={`language-${language} ${CodeStyle}`}
        dangerouslySetInnerHTML={{
          __html: rehype()
            .stringify({
              type: 'root',
              children: refractor.highlight(codeString, language)
            })
            .toString()
        }}
      />
    ) : (
      <code>{codeString}</code>
    )}
  </pre>
  )
}

Code.contextTypes = {
  darkBg: PropTypes.bool
}

const InlineCodeStyle = css `
  code {
    color: #bd10e0;
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
      serif;
    font-size: 0.9em;
    white-space: pre-wrap;
  }
  code.no-wrap {
    white-space: nowrap;
  }
  code::before {
    content: '\`';
  }
  code::after {
    content: '\`';
  }
`

export const InlineCode = ({ children, noWrap, color }) => (
  <code className={`${InlineCodeStyle} ${noWrap && 'no-wrap'}`}> 
    {children}
  </code>
)

export const RequestHeader = ({ children, ...props }) => (
  <InlineCode noWrap color="#0076FF" {...props}>
    {children}
  </InlineCode>
)