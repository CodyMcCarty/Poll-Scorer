import React from "react";
import { Content } from "./PollGrader.styles";

// name, score, moodle message

const Score = ({ scores }) => {
  return (
    <Content>
      <div>Score</div>
      {scores.map((row) => (
        <div key={row.Name}>
          <div>{row.Name}</div>
          <div>{row.Score}</div>
          <div>
            {row.Message.map((message, i) => (
              <p key={`${row.Message} ${i}`}>{message}. </p>
            ))}
          </div>
          <div />
        </div>
      ))}
    </Content>
  );
};

export default Score;
