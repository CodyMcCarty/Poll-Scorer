import React from "react";

// name list right answers, their answers with right answers

const Results = ({ data }) => {
  return (
    <div>
      Results
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
      ;
    </div>
  );
};

export default Results;
