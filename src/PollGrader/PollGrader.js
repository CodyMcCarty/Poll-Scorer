import React, { useState } from "react";
import { Wrapper } from "./PollGrader.styles";
import * as XLSX from "xlsx";
import Setup from "./Setup";
import Score from "./Score";
import Results from "./Results";

const PollGrader = () => {
  //   const [fileName, setFileName] = useState(null);
  const [data, setData] = useState([]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    // setFileName(file.name);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    setData(jsonData);

    console.log(jsonData);
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
      <div>PollGrader</div>
      <Setup handleFile={handleFile} data={data} />
      <Score data={data} />
      <Results />

      {/* <input type="file" onChange={(e) => handleFile(e)} /> */}
    </Wrapper>
  );
};

export default PollGrader;
