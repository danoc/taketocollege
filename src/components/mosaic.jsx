import React from "react";
import PropTypes from "prop-types";
import { size, map, forEach, times, reduce } from "lodash";
import styled from "@emotion/styled";
import { css } from "emotion";

const getShortestColumn = (contents) => {
  let shortestIndex = 0;
  let shortestValue;

  forEach(contents, (column, i) => {
    const itemsInColumn = reduce(
      column,
      (sum, col) => sum + size(col.props.items),
      0
    );

    if (i === 0) {
      shortestValue = itemsInColumn;
    } else if (itemsInColumn < shortestValue) {
      shortestValue = itemsInColumn;
      shortestIndex = i;
    }
  });

  return shortestIndex;
};

const Container = styled("div")`
  display: flex;
`;

const Column = styled("div")`
  flex: 1;

  ${(props) =>
    props.isFirst === false &&
    css`
      padding-left: 0.5rem;
    `};

  ${(props) =>
    props.isLast === false &&
    css`
      padding-right: 0.5rem;
    `};
`;

const Category = styled("div")`
  margin-bottom: 4rem;
`;

const Mosaic = ({ children, columns }) => {
  const contents = times(columns, () => []);

  forEach(children, (child) => {
    // Avoid function call if only doing one function.
    const shortestColumn = columns === 1 ? 0 : getShortestColumn(contents);
    contents[shortestColumn].push(child);
  });

  return (
    <Container>
      {map(contents, (column, i) => (
        <Column key={i} isFirst={i === 0} isLast={i === columns - 1}>
          {map(column, (category) => (
            <Category key={category.props.title}>{category}</Category>
          ))}
        </Column>
      ))}
    </Container>
  );
};

Mosaic.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.arrayOf({}),
    })
  ).isRequired,
  columns: PropTypes.number,
};

Mosaic.defaultProps = {
  columns: 1,
};

export default Mosaic;
