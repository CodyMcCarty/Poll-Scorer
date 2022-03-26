import React from "react";

/**
 * statitics on the poll
 * table to sort by score name:score
 * table to sort by % of wrong answers to see if we should throw out a question
 */

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
