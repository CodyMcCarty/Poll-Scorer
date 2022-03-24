import React from "react";
import { Content } from "./PollGrader.styles";

const Setup = ({ handleFile, data }) => {
  return (
    <Content>
      <div>Setup</div>
      <input type="file" onChange={(e) => handleFile(e)} />
    </Content>
  );
};

export default Setup;
