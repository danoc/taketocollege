import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { map, size } from "lodash";
import "tachyons";

const Category = props => (
  <section className="w-100 w-33-m w-20-l pr3">
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
      description="A shopping list for students entering college."
      meta={[
        { property: "og:title", content: "What to Take to College" },
        {
          property: "og:description",
          content: "A shopping and packing list for students entering college.",
        },
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
            { title: "Backpack", to: "http://amzn.to/2AKPbKm" },
            { title: "Calculator" },
            { title: "Folders" },
            { title: "Loose Leaf" },
            { title: "Notebooks" },
            { title: "Pencils" },
            { title: "Pens" },
            { title: "Scissor" },
            { title: "Stapler" },
            { title: "Textbooks" },
          ]}
        />
        <Category
          title="Room Items"
          items={[
            { title: "Alarm Clock" },
            { title: "Broom" },
            { title: "Calendar" },
            { title: "Desk Lamp" },
            { title: "Fan" },
            { title: "Fabreeze" },
            { title: "Hangers" },
            { title: "Mirror" },
            { title: "Picture Frame and Photos" },
            { title: "Posters" },
            { title: "Storage Trays" },
            { title: "Tools (Screwdriver, Hammer)" },
            { title: "Wastebasket" },
          ]}
        />
        <Category
          title="Electronics & Fun"
          items={[
            { title: "Basketball, Football, etc." },
            { title: "Books" },
            { title: "Camera" },
            { title: "Cell Phone & Charger" },
            { title: "Headphones" },
            { title: "Movies (DVDs, Blu-Ray)" },
            { title: "MP3 Player (iPod)" },
            { title: "Music" },
            { title: "Television" },
            { title: "Video Games" },
          ]}
        />
        <Category
          title="Miscellaneous"
          items={[
            { title: "Batteries (Especially AA)" },
            { title: "Duct Tape" },
            { title: "Ear Plugs" },
            { title: "Instant Stain Remover" },
            { title: "Scotch Tape" },
            { title: "Sewing Kit" },
            { title: "Tissues" },
          ]}
        />
        <Category
          title="Health"
          items={[
            { title: "Bandages" },
            { title: "Contact Lenses" },
            { title: "Cough Drops" },
            { title: "Cough Medicine" },
            { title: "First-aid kit" },
            { title: "Glasses" },
            { title: "Neosporin" },
            { title: "Pain Relievers" },
            { title: "Purell" },
            { title: "Sunscreen" },
            { title: "Vitamins" },
          ]}
        />
        <Category
          title="Bedding"
          items={[
            { title: "Bed Risers" },
            { title: "Bedding" },
            { title: "Blanket" },
            { title: "Comforter" },
            { title: "Mattress Pad" },
            { title: "Pillowcases" },
            { title: "Pillows" },
            { title: "Sheets" },
          ]}
        />
        <Category
          title="Clothes & Accessories"
          items={[
            { title: "Bathrobe" },
            { title: "Casual Clothes" },
            { title: "Clothing" },
            { title: "Flip Flops" },
            { title: "Formal Clothes" },
            { title: "Hats, Gloves, Scarves" },
            { title: "Poncho / Raincoat" },
            { title: "Rain Boots" },
            { title: "Shoes" },
            { title: "Sporting Clothes" },
            { title: "Swimwear" },
            { title: "Umbrella" },
            { title: "Wallet" },
            { title: "Watch" },
          ]}
        />
        <Category
          title="Hygiene & Beauty"
          items={[
            { title: "Conditioner" },
            { title: "Cotton Swabs (Q-Tips)" },
            { title: "Dental Floss" },
            { title: "Deodorant" },
            { title: "Hair Brush / Comb" },
            { title: "Hair Dryer" },
            { title: "Makeup" },
            { title: "Mouthwash" },
            { title: "Nail Clipper" },
            { title: "Razors / Shaving Cream" },
            { title: "Shampoo" },
            { title: "Shower Cap" },
            { title: "Shower Tote" },
            { title: "Soap" },
            { title: "Toothbrush" },
            { title: "Toothpaste" },
            { title: "Towels (Bath, Hand)" },
            { title: "Tweezers" },
          ]}
        />
        <Category
          title="Computers & Accessories"
          items={[
            { title: "Laptop" },
            { title: "External Hard Drive" },
            { title: "Power Strips" },
          ]}
        />
        <Category
          title="Kitchen Needs"
          items={[
            { title: "Bottle Opener" },
            { title: "Disposable Plates" },
            { title: "Disposable Silverware" },
            { title: "Microwave" },
            { title: "Mini-Fridge" },
            { title: "Plastic Cups" },
            { title: "Water Bottle" },
          ]}
        />
        <Category
          title="Documents"
          items={[
            { title: "Documents" },
            { title: "Copies of Important Documents" },
            { title: "Driver's License" },
            { title: "Health Records" },
            { title: "Insurance Information" },
            { title: "Passport" },
            { title: "Social Security Number" },
          ]}
        />
        <Category
          title="Laundry"
          items={[
            { title: "Bin/Hamper" },
            { title: "Detergent" },
            { title: "Dryer Sheets" },
            { title: "Fabric Softener" },
          ]}
        />
      </div>
    </main>
  </div>
);

export default IndexPage;
