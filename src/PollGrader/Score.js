import React from "react";
import { Content } from "./PollGrader.styles";

const Score = ({ data }) => {
  return (
    <Content>
      <div>Score</div>
      <div>
        {data.map((row) => (
          // console.log(row.Name)
          <div>{row.Name}</div>
        ))}
      </div>
    </Content>
  );
};

export default Score;
