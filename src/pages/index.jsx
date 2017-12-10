import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { map, size } from "lodash";
import "tachyons";

const Category = props => (
  <section className="w-100 w-50-ns w-33-m w-20-l pr3">
    <h2 className="f5 mb">{props.title}</h2>
    {size(props.items) > 0 && (
      <ul className="list pl0 mt0">
        {map(props.items, item => (
          <li className="bb b--light-gray f5">
            {item.to ? (
              <a
                href={item.to}
                className="pv2 ph1 block db link dark-gray hover-bg-near-white"
                title={`Shop for “${item.title}” on Amazon`}
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
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const IndexPage = () => (
  <div className="sans-serif mw9 ph4 near-black pv5 ml-auto mr-auto">
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
    <header className="bb b--light-gray bw3 mb3">
      <h1 className="mt0 mb3 f2">Take to College</h1>
    </header>
    <main>
      <div className="flex flex-wrap">
        <Category
          title="School Supplies"
          items={[
            { title: "Backpack", to: "https://amazon.com/" },
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
