import React from "react";
import PropTypes from "prop-types";
import { map, size } from "lodash";

const Category = props => (
  <section>
    <h2 className="f5 mb ph1">{props.title}</h2>
    {size(props.items) > 0 && (
      <ul className="list pl0 mt0">
        {map(props.items, item => (
          <li className="bb b--light-gray f5" key={item.title}>
            {item.to ? (
              <a
                href={item.to}
                className="pv2 ph1 block db link dark-gray hover-bg-near-white"
                title={`Shop for “${item.title}” on Amazon`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
            ) : (
              <span className="pv2 ph1 db dark-gray">{item.title}</span>
            )}
          </li>
        ))}
      </ul>
    )}
  </section>
);

Category.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Category;