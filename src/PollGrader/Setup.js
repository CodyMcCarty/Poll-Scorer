import React from "react";
import { Content } from "./PollGrader.styles";
import Typography from "@mui/material/Typography";

const Setup = ({ handleFile, data, answers, setAnswers }) => {
  /**
   * Setup:
   * titles
   * instructions
   * set up popup, select correct answers, ability to re-edit
   */

  return (
    <Content>
      <input type="file" onChange={(e) => handleFile(e)} />
      {/* {data.map((row) => (
        // console.log(row.Name)
        <div key={row.Name}>
          {Object.keys(row).map((key, i) => (
            <div>
              <div>{key}</div>
              <div>{row[key]}</div>
            </div>
          ))}
        </div>
      ))} */}
    </Content>
  );
};

export default Setup;
