import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { size, map, forEach, times, reduce } from "lodash";

const getShortestColumn = contents => {
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

const Mosaic = ({ children, columns }) => {
  const contents = times(columns, () => []);

  forEach(children, child => {
    // Avoid function call if only doing one function.
    const shortestColumn = columns === 1 ? 0 : getShortestColumn(contents);
    contents[shortestColumn].push(child);
  });

  return (
    <div className="flex">
      {map(contents, (column, i) => (
        <div
          key={i}
          className={classNames({
            "flex-auto": true,
            pr2: i !== columns - 1,
            pl2: i !== 0
          })}
        >
          {map(column, category => (
            <div key={category.props.title} className="mb5">
              {category}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Mosaic.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.arrayOf({})
    })
  ).isRequired,
  columns: PropTypes.number
};

Mosaic.defaultProps = {
  columns: 1
};

export default Mosaic;
