import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "emotion";
import { map, size } from "lodash";
import basket from "../basket.svg";
import slugify from "../utils/slugify";

const H2 = styled("h2")`
  font-size: 1rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
`;

const UL = styled("ul")`
  margin-top: 0;
  padding-left: 0;
  list-style-type: none;
`;

const LI = styled("li")`
  margin-top: 0;
  padding-left: 0;
  list-style-type: none;
  font-size: 1rem;
  border-color: #eee;
  border-bottom-style: solid;
  border-bottom-width: 1px;
`;

const Item = styled("a")`
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: #333;
  text-decoration: none;
  display: flex;

  ${(props) =>
    props.href &&
    css`
      &:focus {
        outline: 1px dotted currentColor;
      }

      &:focus,
      &:hover,
      &:active {
        background-color: #f4f4f4;
      }
    `};
`;

const ShoppingCart = styled("img")`
  margin-left: auto;
  opacity: 0.3;
  height: 1rem;
`;

const trackEvent = (event, categoryTitle, itemTitle) => {
  if (typeof ga !== "undefined") {
    ga("send", "event", {
      eventCategory: "Item",
      eventAction: "buy",
      eventLabel: `${categoryTitle} - ${itemTitle}`,
      transport: "beacon",
    });
  }
};

const Category = ({ title, items }) => (
  <section>
    <H2>{title}</H2>
    {size(items) > 0 && (
      <UL>
        {map(items, (item) => (
          <LI key={item.title} id={slugify(`${title}-${item.title}`)}>
            {item.to ? (
              <Item
                href={item.to}
                title={`Shop for “${item.title}” on Amazon`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                onClick={(e) => {
                  trackEvent(e, title, item.title, item.to);
                }}
              >
                {item.title}
                <ShoppingCart src={basket} alt="" />
              </Item>
            ) : (
              <Item>{item.title}</Item>
            )}
          </LI>
        ))}
      </UL>
    )}
  </section>
);

Category.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Category;
