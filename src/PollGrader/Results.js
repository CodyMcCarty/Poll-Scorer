import React, { useEffect, useState } from "react";
import { Content } from "./PollGrader.styles";
import Typography from "@mui/material/Typography";

/**
 * statitics on the poll
 * [x]avg score
 * table to sort by score name:score
 * table to sort by % of wrong answers to see if we should throw out a question
 */

const Results = ({ data, scores, questionsDifficulty }) => {
  const [avgScore, setAvgScore] = useState(0);
  const [questionDifficulty, setQuestionDifficulty] = useState([]);

  useEffect(() => {
    setAvgScore(findAvgScore());
    // findQuestionDifficulty();
  }, [scores]);

  // Makes a JSON of question : numberOfWrongGuesses
  // const findQuestionDifficulty = () => {
  //   let qDifficulty = {};
  //   scores.map((score, i) => {
  //     Object.keys(score).map((key, j) => {
  //       if (key === "Name" || key === "Score" || key === "Message") return;
  //       if (!(key in qDifficulty)) qDifficulty[key] = 0;
  //       let theirAnswer = score[key][0];
  //       let correctAnswers = score[key][1];
  //       console.log(score[key][0]);
  //       // add for every wrong guess
  //     });
  //   });
  // };

  // finds the average score of all poll takers
  const findAvgScore = () => {
    const localScores = scores;
    let totalScore = 0;
    localScores.forEach((score) => {
      totalScore += parseFloat(score.Score);
    });
    return totalScore / localScores.length;
  };

  return (
    <Content>
      <Typography>
        The average Score was: {avgScore.toFixed(2)}% for all poll takers
      </Typography>
      {questionsDifficulty.map((questions) => (
        <Typography>{`${questions.question} - ${questions.difficulty} people got this one wrong`}</Typography>
      ))}
    </Content>
  );
};

export default Results;
