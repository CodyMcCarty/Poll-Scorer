import React from "react";
import { Content } from "./PollGrader.styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

const Setup = ({ handleFile, possibleAnswers }) => {
  const handleCheckedAnswers = (e) => {
    let answerKey = {};
    let isChecked = e.target.checked;
    let QnA = e.target.name.split(",");
    let question = QnA[0];
    let answer = QnA[1];

    if (!answerKey.question) answerKey.question = [];
    if (isChecked) console.log(answer);
  };
  /**
   * Setup:
   * titles
   * instructions
   * set up popup, select correct answers, ability to re-edit
   */

  // return (
  //   <Content>
  //     <input type="file" onChange={(e) => handleFile(e)} />
  //
  //     {Object.keys(possibleAnswers).map((question, i) => (
  //       <div key={question}>
  //         {`Q${i + 1}`} = {question}
  //         <div>
  //           {possibleAnswers[question].map((answer, j) => (
  //             <p>{`${j + 1}: ${answer}`}</p>
  //           ))}
  //         </div>
  //       </div>
  //     ))}
  //   </Content>
  // );

  return (
    <Content>
      <input type="file" onChange={(e) => handleFile(e)} />

      <Box sx={{ display: "block" }}>
        {Object.keys(possibleAnswers).map((question, i) => (
          <FormControl fullWidth="true">
            <FormLabel>{`Q${i + 1}: ${question}`}</FormLabel>
            <FormGroup>
              {possibleAnswers[question].map((answer, j) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleCheckedAnswers}
                      name={[question, answer]}
                    />
                  }
                  label={answer}
                ></FormControlLabel>
              ))}
            </FormGroup>
          </FormControl>
        ))}
      </Box>
    </Content>
  );
};

export default Setup;
