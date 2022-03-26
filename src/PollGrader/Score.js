import React, { Fragment } from "react";
import { Content } from "./PollGrader.styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

// name, score, moodle message
// TODO click to copy message

const Score = ({ scores }) => {
  const handleClickListItem = (e) => {
    // console.log(e);
    // console.log(e.target.querySelector("innerText"));
    const text = e.target.innerText;
    // e.clipboardData.setData("text/plain", text.toString());
    navigator.clipboard.writeText(text);
  };
  return (
    <Content>
      <List component="button" aria-label="Scores">
        {scores.map((row) => (
          <Fragment key={row.Name}>
            <ListItem key={row.Name} button onClick={handleClickListItem}>
              <ListItemText
                primary={`${row.Name}, Score: ${row.Score}%`}
                secondary={row.Message.map((message, i) => message)}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
    </Content>
  );
};

export default Score;
