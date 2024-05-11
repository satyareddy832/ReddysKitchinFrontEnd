import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = () => {
  const styles = {
    card: {
      maxWidth: 400,
      margin: "auto",
      marginBottom: 20,
    },
    media: {
      height: 345,
    },
    content: {
      textAlign: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: "green",
      marginBottom: 10,
    },
    location: {
      fontSize: 14,
      color: "gray",
    },
  };

  return (
    <div>
      <Card style={styles.card}>
        <CardMedia
          component="img"
          sx={styles.media}
          image="https://images.pexels.com/photos/9393356/pexels-photo-9393356.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Indian Fast Food"
        />
        <CardContent style={styles.content}>
          <Typography variant="h6" style={styles.title}>
            Indian Fast Food
          </Typography>
          <Typography variant="body1" style={styles.subtitle}>
            500 rs off on your First Order
          </Typography>
          <div style={styles.location}>
            <p>Mumbai</p>
          </div>
        </CardContent>

        {true &&
            <CardActions>
            <IconButton>
                <DeleteIcon/>
            </IconButton>
        </CardActions>}
      </Card>
    </div>
  );
};

export default EventCard;
