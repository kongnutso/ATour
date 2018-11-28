import React from "react";
import { Flex } from "rebass";
import CardItem from "./CardItem";

// target props: tours
// tourName, tourImage, tourRating, tourPrice, tourLocation
const Cards = props => {
  const { isGuide, items, role } = props;
  return (
    <Flex
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: "center"
      }}
      width={1}
      flexWrap="wrap"
    >
      {items
        ? items.map(item => (
            <div
              key={isGuide ? item.guideId : item.tourId}
              style={{ margin: "10px 20px 10px 20px" }}
            >
              <CardItem item={item} isGuide={isGuide} role={role} />
            </div>
          ))
        : null}
    </Flex>
  );
};

export default Cards;
