import * as React from "react";
import Page from "../components/Page";
// import Container from "../components/Container";
import Splash from "../components/Sections/Splash";
import CallTheAction from "../components/Sections/CallTheAction";
import IndexLayout from "../layouts";

const IndexPage = () => (
  <IndexLayout>
    <Page>
        <p> chinese </p>
      <Splash />
      <CallTheAction />
    </Page>
  </IndexLayout>
);

export default IndexPage;
