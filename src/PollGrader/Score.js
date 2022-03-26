import React from "react";
import { Content } from "./PollGrader.styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

// name, score, moodle message

const Score = ({ scores }) => {
  // return (
  //   <Content>
  //     <div>Score</div>
  //     {scores.map((row) => (
  //       <div key={row.Name}>
  //         <div>{row.Name}</div>
  //         <div>{row.Score}</div>
  //         <div>
  //           {row.Message.map((message, i) => (
  //             <p key={`${row.Message} ${i}`}>{message}. </p>
  //           ))}
  //         </div>
  //         <div />
  //       </div>
  //     ))}
  //   </Content>
  // );
  return (
    <Content>
      <List component="nav" aria-label="Scores">
        {scores.map((row) => (
          <ListItem key={row.Name} button>
            <ListItemText
              primary={`${row.Name}, Score ${row.Score}`}
              secondary={row.Message.map((message, i) => message)}
            />
          </ListItem>
        ))}
      </List>
    </Content>
  );
};

export default Score;
