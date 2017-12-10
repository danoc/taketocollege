import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { map, size } from "lodash";
import "tachyons";

const Category = props => (
  <section className="w-20">
    <h3 className="f5">{props.title}</h3>
    {size(props.items) > 0 && (
      <ul>
        {map(props.items, item => (
          <li>
            {item.to ? (
              <a href={item.to}>{item.title}</a>
            ) : (
              <span>{item.title}</span>
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
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const IndexPage = () => (
  <div className="sans-serif mw9 pa4">
    <Helmet
      title="What to Take to College"
      meta={[
        { property: "og:title", content: "What to Take to College" },
        { property: "og:type", content: "website" },
        { name: "theme-color", content: "#333333" },
      ]}
      htmlAttributes={{
        lang: "en",
      }}
    />
    <header className="bb b--light-gray bw3">
      <h1 className="mt0 mb3 f2">Take to College</h1>
    </header>
    <main>
      <h2 className="f5">College Packing List</h2>
      <div className="flex flex-wrap">
        <Category
          title="School Supplies"
          items={[
            { title: "Backpack" },
            { title: "Calculator" },
            { title: "Folder" },
            { title: "Loose Leaf" },
            { title: "Notebook" },
            { title: "Pencil Sharpener" },
            { title: "Pencils" },
            { title: "Pens" },
            { title: "Scissor" },
            { title: "Stapler" },
            { title: "Textbooks" },
          ]}
        />
        <Category
          title="School Supplies"
          items={[
            { title: "Backpack" },
            { title: "Calculator" },
            { title: "Folder" },
            { title: "Loose Leaf" },
            { title: "Notebook" },
            { title: "Pencil Sharpener" },
            { title: "Pencils" },
            { title: "Pens" },
            { title: "Scissor" },
            { title: "Stapler" },
            { title: "Textbooks" },
          ]}
        />
        <Category
          title="School Supplies"
          items={[
            { title: "Backpack" },
            { title: "Calculator" },
            { title: "Folder" },
            { title: "Loose Leaf" },
            { title: "Notebook" },
            { title: "Pencil Sharpener" },
            { title: "Pencils" },
            { title: "Pens" },
            { title: "Scissor" },
            { title: "Stapler" },
            { title: "Textbooks" },
          ]}
        />
        <Category
          title="School Supplies"
          items={[
            { title: "Backpack" },
            { title: "Calculator" },
            { title: "Folder" },
            { title: "Loose Leaf" },
            { title: "Notebook" },
            { title: "Pencil Sharpener" },
            { title: "Pencils" },
            { title: "Pens" },
            { title: "Scissor" },
            { title: "Stapler" },
            { title: "Textbooks" },
          ]}
        />
        <Category
          title="School Supplies"
          items={[
            { title: "Backpack" },
            { title: "Calculator" },
            { title: "Folder" },
            { title: "Loose Leaf" },
            { title: "Notebook" },
            { title: "Pencil Sharpener" },
            { title: "Pencils" },
            { title: "Pens" },
            { title: "Scissor" },
            { title: "Stapler" },
            { title: "Textbooks" },
          ]}
        />
        <Category
          title="School Supplies"
          items={[
            { title: "Backpack" },
            { title: "Calculator" },
            { title: "Folder" },
            { title: "Loose Leaf" },
            { title: "Notebook" },
            { title: "Pencil Sharpener" },
            { title: "Pencils" },
            { title: "Pens" },
            { title: "Scissor" },
            { title: "Stapler" },
            { title: "Textbooks" },
          ]}
        />
      </div>
    </main>
  </div>
);

export default IndexPage;
