import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import WindowSizeListener from "react-window-size-listener";
import styled from "react-emotion";
import "normalize.css";
import Mosaic from "../components/mosaic";
import Category from "../components/category";
import categories from "../data/items.json";
import slugify from "../utils/slugify";

const Container = styled("div")`
  margin-left: auto;
  margin-right: auto;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  color: #111;
  max-width: 96rem;
  font-family: -apple-system, BlinkMacSystemFont, "avenir next", avenir,
    "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial,
    sans-serif;
`;

const Header = styled("header")`
  margin-bottom: 2rem;
  border-width: 0.5rem;
  border-color: #eee;
  border-bottom-style: solid;
`;

const H1 = styled("h1")`
  font-size: 2.25rem;
  margin-top: 0;
  margin-bottom: 2rem;
`;

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
      <Container>
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
        <Header>
          <H1>Take to College</H1>
        </Header>
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
      </Container>
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
