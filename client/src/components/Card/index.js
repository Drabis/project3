import React from "react";
import "./style.css";
import axios from "axios";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import parse from "html-react-parser";

const CardPost = (props) => {
  const handleDelete = async () => {
    try {
      await axios.delete("/api/posts/" + props.id);

      props.handleDelete(props.id);
    } catch (err) {}
  };

  const getImage = () => {
    console.log(props);
    // switch statement to return image based on category
    let img;
    switch (props.category) {
      case "Music":
        img = process.env.PUBLIC_URL + "/assets/images/music/drums.jpg";
        break;
      case "Food":
        img = process.env.PUBLIC_URL + "/assets/images/food/salmon.jpg";
        break;
      case "Sport":
        img = process.env.PUBLIC_URL + "/assets/images/sport/football.jpeg";
        break;
      case "Life":
        img = process.env.PUBLIC_URL + "/assets/images/culture/yash.jpg";
        break;
      case "Culture":
        img = process.env.PUBLIC_URL + "/assets/images/life/amani.jpg";
        break;
      default:
    }

    return img;
  };

  return (
    <Row className="cardBody">
      <Col md="12">
        <Card body>
          <i className="deleteIcon" onClick={handleDelete}>
            X
          </i>
          <img className="photo" src={getImage()} alt="" />
          <CardTitle tag="h5">{props.title}</CardTitle>
          <CardTitle tag="h5">{props.author}</CardTitle>
          {/* <img src={getImage(props.category)} /> */}
          <CardText>
            {props.html && props.html.length > 20
              ? parse(props.html.substring(0, 20) + "...")
              : ""}
            {props.html && props.html.length < 20
              ? parse(props.html.substring(0, 20))
              : ""}
          </CardText>
          <a href={"/post/" + props.id}>
            <Button className="button">Read more</Button>
          </a>
          <a href={"/write/" + props.id}>
            <Button className="button">Update post</Button>
          </a>
          <div className="rating">
            <span>Rate this post:</span>
            <Button variant="info" onClick={""}>
              +
            </Button>
              {}
            <Button variant="info" onClick={""}>
              -
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default CardPost;
