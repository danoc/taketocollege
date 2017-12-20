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

const IndexPage = () => (
  <div className="sans-serif mw9 ph4 near-black pv5 ml-auto mr-auto">
    <Helmet
      title="What to Take to College"
      description="A shopping list for students entering college."
      meta={[
        { property: "og:title", content: "What to Take to College" },
        {
          property: "og:description",
          content: "A shopping and packing list for students entering college."
        },
        { property: "og:type", content: "website" },
        { name: "theme-color", content: "#333333" }
      ]}
      htmlAttributes={{
        lang: "en"
      }}
    />
    <header className="bb b--light-gray bw3 mb4">
      <h1 className="mt0 mb4 f2">Take to College</h1>
    </header>
    <main>
      <div className="flex flex-wrap">
        <Category
          title="School Supplies"
          items={[
            { title: "Backpack", to: "https://amzn.to/2AKPbKm" },
            { title: "Calculator", to: "https://amzn.to/2BJRdNL" },
            { title: "Folders", to: "https://amzn.to/2BAVikJ" },
            { title: "Loose Leaf", to: "https://amzn.to/2CIdlEY" },
            { title: "Notebooks", to: "https://amzn.to/2BByHEC" },
            { title: "Pencils", to: "https://amzn.to/2BLuJMc" },
            { title: "Pens", to: "https://amzn.to/2BLyRvz" },
            { title: "Scissor", to: "https://amzn.to/2CI17wb" },
            { title: "Stapler", to: "https://amzn.to/2BgoRLr" },
            { title: "Textbooks", to: "https://amzn.to/2CFrDGc" }
          ]}
        />
        <Category
          title="Room Items"
          items={[
            { title: "Broom", to: "https://amzn.to/2D5r2Pg" },
            { title: "Calendar", to: "https://amzn.to/2D7C2vq" },
            { title: "Desk Lamp", to: "https://amzn.to/2BLZ1hP" },
            { title: "Fan", to: "https://amzn.to/2CIdmc1" },
            { title: "Fabreeze", to: "https://amzn.to/2Bfjpsa" },
            { title: "Hangers", to: "https://amzn.to/2BCqAYx" },
            { title: "Mirror", to: "https://amzn.to/2Dagj6n" },
            {
              title: "Picture Frame and Photos",
              to: "https://amzn.to/2BAZzEQ"
            },
            { title: "Posters", to: "https://amzn.to/2CH583N" },
            { title: "Storage Trays", to: "https://amzn.to/2BM5zNj" },
            {
              title: "Tools (Screwdriver, Hammer)",
              to: "https://amzn.to/2CHbd02"
            },
            { title: "Wastebasket", to: "https://amzn.to/2CIsmH0" }
          ]}
        />
        <Category
          title="Electronics & Fun"
          items={[
            {
              title: "Basketball, Football, etc.",
              to: "https://amzn.to/2BiYLHO"
            },
            { title: "Books", to: "https://amzn.to/2BgqNnb" },
            { title: "Camera", to: "https://amzn.to/2BLF3DR" },
            { title: "Cell Phone & Charger", to: "https://amzn.to/2BifhHQ" },
            { title: "Headphones", to: "https://amzn.to/2CGGIY7" },
            { title: "Television", to: "https://amzn.to/2CGQrO9" },
            { title: "Video Games", to: "https://amzn.to/2BgXUan" }
          ]}
        />
        <Category
          title="Miscellaneous"
          items={[
            {
              title: "Batteries (Especially AA)",
              to: "https://amzn.to/2D7GwlW"
            },
            { title: "Duct Tape", to: "https://amzn.to/2CH63kL" },
            { title: "Ear Plugs", to: "https://amzn.to/2BLFmP1" },
            { title: "Instant Stain Remover", to: "https://amzn.to/2BL0ZPp" },
            { title: "Scotch Tape", to: "https://amzn.to/2BAgrLM" },
            { title: "Sewing Kit", to: "https://amzn.to/2Bjq3xO" },
            { title: "Tissues", to: "https://amzn.to/2BgYZyX" }
          ]}
        />
        <Category
          title="Health"
          items={[
            { title: "Bandages", to: "https://amzn.to/2Bhi7x5" },
            { title: "Contact Lenses" },
            { title: "Cough Drops", to: "https://amzn.to/2BBETN5" },
            { title: "Cough Medicine", to: "https://amzn.to/2B4QO4Z" },
            { title: "First-aid kit", to: "https://amzn.to/2CH7Pm6" },
            { title: "Glasses", to: "https://amzn.to/2CH7QGG" },
            { title: "Neosporin", to: "https://amzn.to/2BB1cCr" },
            { title: "Pain Relievers", to: "https://amzn.to/2CHjHVh" },
            { title: "Purell", to: "https://amzn.to/2BMU48x" },
            { title: "Sunscreen", to: "https://amzn.to/2z0t9AD" },
            { title: "Vitamins", to: "https://amzn.to/2BiZGYM" }
          ]}
        />
        <Category
          title="Bedding"
          items={[
            { title: "Bed Risers", to: "https://amzn.to/2B0y2vl" },
            { title: "Bedding", to: "https://amzn.to/2D78CxF" },
            { title: "Blanket", to: "https://amzn.to/2BC2VaJ" },
            { title: "Comforter", to: "https://amzn.to/2BBxRaT" },
            { title: "Mattress Pad", to: "https://amzn.to/2BOyBvZ" },
            { title: "Pillowcases", to: "https://amzn.to/2BzxJZF" },
            { title: "Pillows", to: "https://amzn.to/2B2l6VO" }
          ]}
        />
        <Category
          title="Clothes & Accessories"
          items={[
            { title: "Bathrobe", to: "https://amzn.to/2DbIUYY" },
            { title: "Casual Clothes" },
            { title: "Clothing", to: "https://amzn.to/2B1aAOK" },
            { title: "Flip Flops", to: "https://amzn.to/2Bj0m0g" },
            { title: "Formal Clothes" },
            { title: "Hats, Gloves, Scarves" },
            { title: "Poncho / Raincoat" },
            { title: "Rain Boots", to: "https://amzn.to/2BLzg1a" },
            { title: "Shoes" },
            { title: "Sporting Clothes" },
            { title: "Swimwear" },
            { title: "Umbrella", to: "https://amzn.to/2BDIMkF" },
            { title: "Watch", to: "https://amzn.to/2B2mzeM" }
          ]}
        />
        <Category
          title="Hygiene & Beauty"
          items={[
            { title: "Conditioner", to: "https://amzn.to/2Bhysln" },
            { title: "Cotton Swabs (Q-Tips)", to: "https://amzn.to/2BfnhJI" },
            { title: "Dental Floss", to: "https://amzn.to/2BCUHPC" },
            { title: "Deodorant", to: "https://amzn.to/2B27Ksu" },
            { title: "Hair Brush / Comb", to: "https://amzn.to/2BkbM3C" },
            { title: "Hair Dryer", to: "https://amzn.to/2BB2Cgf" },
            { title: "Makeup", to: "https://amzn.to/2z0655a" },
            { title: "Mouthwash", to: "https://amzn.to/2B1iNCs" },
            { title: "Nail Clipper", to: "https://amzn.to/2B5FGV6" },
            { title: "Razors", to: "https://amzn.to/2BKCaU2" },
            { title: "Shampoo", to: "https://amzn.to/2CHjGAF" },
            { title: "Shaving Cream", to: "https://amzn.to/2BBHHK7" },
            { title: "Shower Cap", to: "https://amzn.to/2BB3EsD" },
            { title: "Shower Tote", to: "https://amzn.to/2B2CERM" },
            { title: "Soap", to: "https://amzn.to/2CH9hon" },
            { title: "Toothbrush", to: "https://amzn.to/2BC4Fkh" },
            { title: "Toothpaste", to: "https://amzn.to/2Da1q3U" },
            { title: "Towels (Bath, Hand)", to: "https://amzn.to/2BCegY2" },
            { title: "Tweezers", to: "https://amzn.to/2B2GASD" }
          ]}
        />
        <Category
          title="Computers & Accessories"
          items={[
            { title: "Laptop", to: "https://amzn.to/2BC6fTf" },
            { title: "External Hard Drive", to: "https://amzn.to/2z1D1KE" },
            { title: "Power Strips", to: "https://amzn.to/2D70L2W" }
          ]}
        />
        <Category
          title="Kitchen Needs"
          items={[
            { title: "Bottle Opener", to: "https://amzn.to/2BzJAqp" },
            { title: "Disposable Plates", to: "https://amzn.to/2z07xo8" },
            { title: "Disposable Silverware", to: "https://amzn.to/2B2ono4" },
            { title: "Microwave", to: "https://amzn.to/2z06QLv" },
            { title: "Mini-Fridge", to: "https://amzn.to/2BOfClg" },
            { title: "Plastic Cups", to: "https://amzn.to/2z1ksGd" },
            { title: "Water Bottle", to: "https://amzn.to/2B1dKlA" }
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
            { title: "Social Security Number" }
          ]}
        />
        <Category
          title="Laundry"
          items={[
            { title: "Bin/Hamper", to: "https://amzn.to/2z09yAr" },
            { title: "Detergent", to: "https://amzn.to/2CHlslj" },
            { title: "Dryer Sheets", to: "https://amzn.to/2BBIGtN" },
            { title: "Fabric Softener", to: "https://amzn.to/2z0vU4X" }
          ]}
        />
      </div>
    </main>
  </div>
);

export default IndexPage;
