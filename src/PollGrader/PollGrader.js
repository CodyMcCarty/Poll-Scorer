import React, { useState } from "react";
import { Wrapper } from "./PollGrader.styles";
import * as XLSX from "xlsx";
import Setup from "./Setup";
import Score from "./Score";
import Results from "./Results";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const PollGrader = () => {
  const [fileName, setFileName] = useState(null);
  const [data, setData] = useState([]);
  const [possibleAnswers, setPossibleAnswers] = useState({});
  const [answersKey, setAnswersKey] = useState({});
  const [scores, setScores] = useState([]);
  const [checkedAnswer, setCheckedAnswer] = useState({});

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const localPossibleAnswers = updatePossibleAnswers(jsonData);
    setPossibleAnswers(localPossibleAnswers);
    setData(jsonData);
    prepAnswerKey(localPossibleAnswers);
    initialChecked(localPossibleAnswers);
    // const localAnswer = updateAnswersKey(jsonData);
    // const updatedJson = updateScores(jsonData, localAnswer);
  };

  const [value, setValue] = React.useState("1");

  /**changes tabs */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const initialChecked = (possibleAnswers) => {
    let initial = {};
    Object.keys(possibleAnswers).map((key, i) => {
      possibleAnswers[key].map((answer) => {
        initial[answer] = false;
      });
    });
    setCheckedAnswer(initial);
    return initial;
  };

  /**
   *
   * @param {OBJECT} QnA question:[answer]
   */
  const prepAnswerKey = (QnA) => {
    let answerKey = {};
    Object.keys(QnA).map((key, i) => {
      answerKey[key] = [];
    });
    setAnswersKey(answerKey);
  };

  /**
   * Used to lay out checkable answers for setup
   * @param {JSON} jsonData the poll results in JSON format
   * @returns {OBJECT} question: [all possible answers]
   */
  const updatePossibleAnswers = (jsonData) => {
    let answers = {};
    jsonData.map((row) => {
      Object.keys(row).map((key, i) => {
        if (key === "Name") return;
        if (!answers[key]) answers[key] = [];
        if (!answers[key].includes(row[key])) answers[key].push(row[key]);
      });
    });
    return answers;
  };

  // /**
  //  * Makes an answer key
  //  * @param {JSON} jsonData the poll results in JSON format
  //  * @returns {OBJECT} the correct answers
  //  */
  // const updateAnswersKey = (jsonData) => {
  //   let temp = {
  //     "How many keywords should be in an ad group": ["40-60", "10-30"],
  //     test: [5, 10],
  //     test2: ["b", 4],
  //   };
  //   setAnswersKey(temp);
  //   return temp;
  // };

  /**
   * preps the poll results with the answer key, a score, and a Moodle Message.
   * @param {JSON} jsonData the poll results in JSON format
   * @param {OBJECT} answerKey the correct answers
   * @returns updates the JSON with the answer key, and a Moodle message.
   */
  const updateScores = (e, jsonData = data, answerKey = answersKey) => {
    let updatedJson = gradePoll(jsonData, answerKey);
    updatedJson.map((row) => {
      let numOfQs = 0;
      let numOfCorrect = 0;
      Object.keys(row).map((key, i) => {
        if (key === "Name" || key === "Score" || key === "Message") return;
        numOfQs += 1;
        let correctAnswers = row[key][1];
        let answerGiven = String(row[key][0]).trim();
        if (correctAnswers.includes(answerGiven)) {
          numOfCorrect += 1;
        } else {
          row.Message.push(`
          The correct answer was ${row[key][1]} and you said ${row[key][0]}.
          `);
        }
      });
      row.Score = ((numOfCorrect / numOfQs) * 100).toFixed(2);
    });
    setScores(updatedJson);
    return updatedJson;
  };

  /** pairs their answer with the correct answers
   *
   * @param {JSON} jsonData the poll results in JSON format
   * @param {OBJECT} answerKey the correct answers
   * @returns {JSON} the poll results replacing (value)their answer with [their answer, [correct answers]]
   */
  const gradePoll = (jsonData, answerKey) => {
    let updatedJsonData = [];
    jsonData.map((row) => {
      Object.keys(row).map((key, i) => {
        if (key === "Name") return;
        let newValue = [row[key]];
        newValue.push(answerKey[key]);
        row[key] = newValue;
        row.Score = 0;
        row.Message = [];
      });
      updatedJsonData.push(row);
    });
    setScores(updatedJsonData);
    return updatedJsonData;
  };

  /**
   * Setup:
   * titles
   * instructions
   * set up popup, select correct answers, ability to re-edit
   *
   * Score:
   * file title
   * name: score
   * dropdown for Moodle comments
   *
   * Results:
   * big table results all info
   */

  return (
    <Wrapper>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Set Up" value="1" />
              <Tab label="Score" value="2" />
              <Tab label="Full Results" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Setup
              handleFile={handleFile}
              possibleAnswers={possibleAnswers}
              answersKey={answersKey}
              setAnswersKey={setAnswersKey}
              fileName={fileName}
              updateScores={updateScores}
              checkedAnswer={checkedAnswer}
              setCheckedAnswer={setCheckedAnswer}
            />
          </TabPanel>
          <TabPanel value="2">
            <Score scores={scores} />
          </TabPanel>
          <TabPanel value="3">
            <Results data={data} />
          </TabPanel>
        </TabContext>
      </Box>
    </Wrapper>
  );
};

export default PollGrader;
