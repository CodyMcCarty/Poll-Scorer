import React from "react";
import { Content } from "./PollGrader.styles";

const Score = ({ data, answers }) => {
  return (
    <Content>
      <div>Score</div>
      <div>
        {data.map((row) => (
          // console.log(row.Name)
          <div key={row.Name}>
            {Object.keys(row).map((key, i) => (
              <p key={i}>
                <span>Key: {key}</span>
                <span>Row: {row[key]}</span>
              </p>
            ))}
          </div>
        ))}
      </div>
    </Content>
  );
};

export default Score;
