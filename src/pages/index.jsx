import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import WindowSizeListener from "react-window-size-listener";
import "tachyons";
import Mosaic from "../components/mosaic";
import Category from "../components/category";
import categories from "../data/items.json";
import slugify from "../utils/slugify";
import "../index.scss";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.setNumberOfColumns = this.setNumberOfColumns.bind(this);

    this.state = {
      numColumns: 1
    };
  }

  componentWillMount() {
    this.setNumberOfColumns();

    this.numberOfItems = 0;
    this.itemListElement = this.props.data.allItemsJson.edges.map(edge =>
      edge.node.items.map(item => {
        this.numberOfItems += 1;

        return {
          "@type": "ListItem",
          position: this.numberOfItems,
          item: {
            "@type": "Thing",
            name: item.title,
            url: `${this.props.data.site.siteMetadata.siteUrl}/#${slugify(
              `${edge.node.name}-${item.title}`
            )}`
          }
        };
      })
    );
  }

  setNumberOfColumns() {
    if (typeof window !== "undefined") {
      const w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );

      if (w < 450) {
        this.setState({ numColumns: 1 });
      } else if (w < 630) {
        this.setState({ numColumns: 2 });
      } else if (w < 970) {
        this.setState({ numColumns: 3 });
      } else if (w < 1300) {
        this.setState({ numColumns: 4 });
      } else if (w >= 1301) {
        this.setState({ numColumns: 5 });
      }
    }
  }

  render() {
    return (
      <div className="sans-serif mw9 ph4 near-black pv5 ml-auto mr-auto">
        <WindowSizeListener onResize={this.setNumberOfColumns} />
        <Helmet
          title="What to Take to College"
          meta={[
            { property: "og:title", content: "What to Take to College" },
            { property: "og:url", content: "https://taketocollege.com/" },
            { property: "og:type", content: "website" },
            {
              property: "og:description",
              content:
                "A shopping and packing list for students entering college."
            },
            {
              name: "description",
              content:
                "A shopping and packing list for students entering college."
            },
            { property: "og:type", content: "website" },
            { name: "theme-color", content: "#333333" },
            { name: "twitter:card", content: "summary" },
            { name: "twitter:site", content: "@taketocollege" },
            { name: "twitter:creator", content: "@_danoc" }
          ]}
          htmlAttributes={{
            lang: "en"
          }}
        >
          <script type="application/ld+json">
            {`
              ${JSON.stringify({
                "@context": "http://schema.org",
                "@type": "ItemList",
                numberOfItems: this.numberOfItems,
                itemListElement: this.itemListElement,
                itemListOrder: "http://schema.org/ItemListUnordered",
                name: "What to Take to College"
              })}
            `}
          </script>
        </Helmet>
        <header className="bb b--light-gray bw3 mb4">
          <h1 className="mt0 mb4 f2">Take to College</h1>
        </header>
        <main>
          <Mosaic columns={this.state.numColumns}>
            {categories.map(category => (
              <Category
                title={category.name}
                key={category.name}
                items={category.items}
              />
            ))}
          </Mosaic>
        </main>
      </div>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.objectOf({}).isRequired
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allItemsJson {
      edges {
        node {
          name
          items {
            to
            title
          }
        }
      }
    }
  }
`;
