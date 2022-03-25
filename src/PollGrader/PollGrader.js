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
  //   const [fileName, setFileName] = useState(null);
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState([]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    // setFileName(file.name);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    setData(jsonData);
    const localAnswer = updateAnswers(jsonData);
    updateScores(jsonData, localAnswer);

    // console.log(jsonData);
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateAnswers = (jsonData) => {
    let temp = [
      { "How many keywords should be in an ad group": ["40-60", "10-30"] },
      { test: [5, 10] },
      { test2: ["b", 4] },
    ];
    setAnswers(temp);
    return temp;
    // hard code for now
    // let answers = setAnswers();
    // jsonData.map((row) => {
    //   console.log(row);
    //   // Object.keys(row).map((key, i) => {
    //   // console.log(key);
    //   // });
    // });
  };

  const updateScores = (jsonData, answers) => {
    jsonData.map((row) => {
      Object.keys(row).map((key, i) => {});
    });
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
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Setup
              handleFile={handleFile}
              data={data}
              answers={answers}
              setAnswers={setAnswers}
            />
          </TabPanel>
          <TabPanel value="2">
            <Score data={data} answers={answers} />
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
