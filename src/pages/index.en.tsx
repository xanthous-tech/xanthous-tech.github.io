import * as React from "react";

import Page from "../components/Page";
// import Container from "../components/Container";
import Splash from "../components/Splash";
import IndexLayout from "../layouts";

const IndexPage = () => (
  <IndexLayout>
    <Page>
        <p> english  </p>
      <Splash />
    </Page>
  </IndexLayout>
);

export default IndexPage;
