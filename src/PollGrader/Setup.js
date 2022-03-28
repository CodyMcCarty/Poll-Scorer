import React, { useState } from "react";
import { Content } from "./PollGrader.styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";

const Setup = ({
  handleFile,
  possibleAnswers,
  answersKey,
  setAnswersKey,
  fileName,
  updateScores,
  checkedAnswer,
  setCheckedAnswer,
}) => {
  /**
   * a checked answer is added to setAnswers and visa versa
   * @param {event} e the event
   */
  const handleCheckedAnswers = (e) => {
    let localAnswerKey = answersKey;
    let isChecked = e.target.checked;
    let QnA = e.target.name.split(",");
    let question = QnA[0].trim();
    let answer = QnA[1].trim();
    let objKey = `${question}_${answer}`.trim();

    setCheckedAnswer({
      ...checkedAnswer,
      [objKey]: isChecked,
    });

    if (!localAnswerKey[question]) localAnswerKey[question] = [];
    if (isChecked) localAnswerKey[question].push(answer);
    if (!isChecked) {
      let index = localAnswerKey[question].indexOf(answer);
      if (index !== -1) localAnswerKey[question].splice(index, 1);
    }

    setAnswersKey(localAnswerKey);
  };

  //TODO: add checkbox to input custom answer incase eb got it wrong
  // TODO bug with clicking on some boxes that are the same answer elsewhere

  return (
    <Content>
      <Typography>1. select a poll.xlsx file</Typography>
      {/* <input type="file" onChange={(e) => handleFile(e)} /> */}
      <Button variant="contained" component="label">
        {fileName ? fileName : "Upload File"}
        <input type="file" hidden onChange={(e) => handleFile(e)} />
      </Button>

      <Typography>2. check all the correct answers</Typography>
      <Typography>3. click save scores</Typography>
      <Typography>4. go to the Score or Results tab</Typography>

      <div />

      <Button variant="outlined" onClick={updateScores}>
        Save Scores
      </Button>

      <Box sx={{ display: "block" }}>
        {Object.keys(possibleAnswers).map((question, i) => (
          <FormControl key={question} fullWidth={true}>
            <FormLabel>{`Q${i + 1}: ${question}`}</FormLabel>
            <FormGroup>
              {possibleAnswers[question].map((answer, j) => (
                <FormControlLabel
                  key={answer}
                  control={
                    <Checkbox
                      checked={
                        checkedAnswer[
                          `${question.trim()}_${answer.trim()}`.trim()
                        ]
                          ? checkedAnswer[
                              `${question.trim()}_${answer.trim()}`.trim()
                            ]
                          : false
                      }
                      onChange={handleCheckedAnswers}
                      name={`${question}, ${answer}`}
                    />
                  }
                  label={answer}
                ></FormControlLabel>
              ))}
            </FormGroup>
          </FormControl>
        ))}
      </Box>

      <Button variant="outlined" onClick={updateScores}>
        Save Scores
      </Button>
    </Content>
  );
};

export default Setup;
