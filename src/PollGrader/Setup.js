import React from "react";
import { Content } from "./PollGrader.styles";

const Setup = ({ handleFile, data }) => {
  /**
   * Setup:
   * titles
   * instructions
   * set up popup, select correct answers, ability to re-edit
   */

  return (
    <Content>
      <div>Setup</div>
      <input type="file" onChange={(e) => handleFile(e)} />
    </Content>
  );
};

export default Setup;
