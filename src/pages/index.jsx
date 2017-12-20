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
    <header className="bb b--light-gray bw3 mb3">
      <h1 className="mt0 mb3 f2">Take to College</h1>
    </header>
    <main>
      <div className="flex flex-wrap">
        <Category
          title="School Supplies"
          items={[
            { title: "Backpack", to: "http://amzn.to/2AKPbKm" },
            { title: "Calculator", to: "http://amzn.to/2BJRdNL" },
            { title: "Folders", to: "http://amzn.to/2BAVikJ" },
            { title: "Loose Leaf", to: "http://amzn.to/2CIdlEY" },
            { title: "Notebooks", to: "http://amzn.to/2BByHEC" },
            { title: "Pencils", to: "http://amzn.to/2BLuJMc" },
            { title: "Pens", to: "http://amzn.to/2BLyRvz" },
            { title: "Scissor", to: "http://amzn.to/2CI17wb" },
            { title: "Stapler", to: "http://amzn.to/2BgoRLr" },
            { title: "Textbooks", to: "http://amzn.to/2CFrDGc" }
          ]}
        />
        <Category
          title="Room Items"
          items={[
            { title: "Broom", to: "http://amzn.to/2D5r2Pg" },
            { title: "Calendar", to: "http://amzn.to/2D7C2vq" },
            { title: "Desk Lamp", to: "http://amzn.to/2BLZ1hP" },
            { title: "Fan", to: "http://amzn.to/2CIdmc1" },
            { title: "Fabreeze", to: "http://amzn.to/2Bfjpsa" },
            { title: "Hangers", to: "http://amzn.to/2BCqAYx" },
            { title: "Mirror", to: "http://amzn.to/2Dagj6n" },
            { title: "Picture Frame and Photos", to: "http://amzn.to/2BAZzEQ" },
            { title: "Posters", to: "http://amzn.to/2CH583N" },
            { title: "Storage Trays", to: "http://amzn.to/2BM5zNj" },
            {
              title: "Tools (Screwdriver, Hammer)",
              to: "http://amzn.to/2CHbd02"
            },
            { title: "Wastebasket", to: "http://amzn.to/2CIsmH0" }
          ]}
        />
        <Category
          title="Electronics & Fun"
          items={[
            {
              title: "Basketball, Football, etc.",
              to: "http://amzn.to/2BiYLHO"
            },
            { title: "Books", to: "http://amzn.to/2BgqNnb" },
            { title: "Camera", to: "http://amzn.to/2BLF3DR" },
            { title: "Cell Phone & Charger", to: "http://amzn.to/2BifhHQ" },
            { title: "Headphones", to: "http://amzn.to/2CGGIY7" },
            { title: "Television", to: "http://amzn.to/2CGQrO9" },
            { title: "Video Games", to: "http://amzn.to/2BgXUan" }
          ]}
        />
        <Category
          title="Miscellaneous"
          items={[
            {
              title: "Batteries (Especially AA)",
              to: "http://amzn.to/2D7GwlW"
            },
            { title: "Duct Tape", to: "http://amzn.to/2CH63kL" },
            { title: "Ear Plugs", to: "http://amzn.to/2BLFmP1" },
            { title: "Instant Stain Remover", to: "http://amzn.to/2BL0ZPp" },
            { title: "Scotch Tape", to: "http://amzn.to/2BAgrLM" },
            { title: "Sewing Kit", to: "http://amzn.to/2Bjq3xO" },
            { title: "Tissues", to: "http://amzn.to/2BgYZyX" }
          ]}
        />
        <Category
          title="Health"
          items={[
            { title: "Bandages", to: "http://amzn.to/2Bhi7x5" },
            { title: "Contact Lenses" },
            { title: "Cough Drops", to: "http://amzn.to/2BBETN5" },
            { title: "Cough Medicine", to: "http://amzn.to/2B4QO4Z" },
            { title: "First-aid kit", to: "http://amzn.to/2CH7Pm6" },
            { title: "Glasses", to: "http://amzn.to/2CH7QGG" },
            { title: "Neosporin", to: "http://amzn.to/2BB1cCr" },
            { title: "Pain Relievers", to: "http://amzn.to/2CHjHVh" },
            { title: "Purell", to: "http://amzn.to/2BMU48x" },
            { title: "Sunscreen", to: "http://amzn.to/2z0t9AD" },
            { title: "Vitamins", to: "http://amzn.to/2BiZGYM" }
          ]}
        />
        <Category
          title="Bedding"
          items={[
            { title: "Bed Risers", to: "http://amzn.to/2B0y2vl" },
            { title: "Bedding", to: "http://amzn.to/2D78CxF" },
            { title: "Blanket", to: "http://amzn.to/2BC2VaJ" },
            { title: "Comforter", to: "http://amzn.to/2BBxRaT" },
            { title: "Mattress Pad", to: "http://amzn.to/2BOyBvZ" },
            { title: "Pillowcases", to: "http://amzn.to/2BzxJZF" },
            { title: "Pillows", to: "http://amzn.to/2B2l6VO" }
          ]}
        />
        <Category
          title="Clothes & Accessories"
          items={[
            { title: "Bathrobe", to: "http://amzn.to/2DbIUYY" },
            { title: "Casual Clothes" },
            { title: "Clothing", to: "http://amzn.to/2B1aAOK" },
            { title: "Flip Flops", to: "http://amzn.to/2Bj0m0g" },
            { title: "Formal Clothes" },
            { title: "Hats, Gloves, Scarves" },
            { title: "Poncho / Raincoat" },
            { title: "Rain Boots", to: "http://amzn.to/2BLzg1a" },
            { title: "Shoes" },
            { title: "Sporting Clothes" },
            { title: "Swimwear" },
            { title: "Umbrella", to: "http://amzn.to/2BDIMkF" },
            { title: "Watch", to: "http://amzn.to/2B2mzeM" }
          ]}
        />
        <Category
          title="Hygiene & Beauty"
          items={[
            { title: "Conditioner", to: "http://amzn.to/2Bhysln" },
            { title: "Cotton Swabs (Q-Tips)", to: "http://amzn.to/2BfnhJI" },
            { title: "Dental Floss", to: "http://amzn.to/2BCUHPC" },
            { title: "Deodorant", to: "http://amzn.to/2B27Ksu" },
            { title: "Hair Brush / Comb", to: "http://amzn.to/2BkbM3C" },
            { title: "Hair Dryer", to: "http://amzn.to/2BB2Cgf" },
            { title: "Makeup", to: "http://amzn.to/2z0655a" },
            { title: "Mouthwash", to: "http://amzn.to/2B1iNCs" },
            { title: "Nail Clipper", to: "http://amzn.to/2B5FGV6" },
            { title: "Razors", to: "http://amzn.to/2BKCaU2" },
            { title: "Shampoo", to: "http://amzn.to/2CHjGAF" },
            { title: "Shaving Cream", to: "http://amzn.to/2BBHHK7" },
            { title: "Shower Cap", to: "http://amzn.to/2BB3EsD" },
            { title: "Shower Tote", to: "http://amzn.to/2B2CERM" },
            { title: "Soap", to: "http://amzn.to/2CH9hon" },
            { title: "Toothbrush", to: "http://amzn.to/2BC4Fkh" },
            { title: "Toothpaste", to: "http://amzn.to/2Da1q3U" },
            { title: "Towels (Bath, Hand)", to: "http://amzn.to/2BCegY2" },
            { title: "Tweezers", to: "http://amzn.to/2B2GASD" }
          ]}
        />
        <Category
          title="Computers & Accessories"
          items={[
            { title: "Laptop", to: "http://amzn.to/2BC6fTf" },
            { title: "External Hard Drive", to: "http://amzn.to/2z1D1KE" },
            { title: "Power Strips", to: "http://amzn.to/2D70L2W" }
          ]}
        />
        <Category
          title="Kitchen Needs"
          items={[
            { title: "Bottle Opener", to: "http://amzn.to/2BzJAqp" },
            { title: "Disposable Plates", to: "http://amzn.to/2z07xo8" },
            { title: "Disposable Silverware", to: "http://amzn.to/2B2ono4" },
            { title: "Microwave", to: "http://amzn.to/2z06QLv" },
            { title: "Mini-Fridge", to: "http://amzn.to/2BOfClg" },
            { title: "Plastic Cups", to: "http://amzn.to/2z1ksGd" },
            { title: "Water Bottle", to: "http://amzn.to/2B1dKlA" }
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
            { title: "Bin/Hamper", to: "http://amzn.to/2z09yAr" },
            { title: "Detergent", to: "http://amzn.to/2CHlslj" },
            { title: "Dryer Sheets", to: "http://amzn.to/2BBIGtN" },
            { title: "Fabric Softener", to: "http://amzn.to/2z0vU4X" }
          ]}
        />
      </div>
    </main>
  </div>
);

export default IndexPage;
