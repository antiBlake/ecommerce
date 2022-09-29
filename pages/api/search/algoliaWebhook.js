import algoliasearch from "algoliasearch";
import indexer from "sanity-algolia";
import { sanityClient } from "../../../lib/sanity";

export default async function handler(req, res) {
  // remember to add the secret cuz this shit is hackcable I mean everything is but still. You can't make it easy for them

  const algolia = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_ADMIN_API_KEY
  );

  const products = await sanityClient.fetch(
    `*[_type == 'product'&&!(_id in path("drafts.**"))][]._id`
  );
  const algoliaIndex = algolia.initIndex("dev_ecommerce");

  const sanityAlgolia = indexer(
    {
      product: {
        index: algoliaIndex,
        projection: `
        {
  title,
  'price':defaultProductVariant.price,
  'path':slug.current
}`,
      },
    },
    (document) => document
  );

  try {
    sanityAlgolia.webhookSync(sanityClient, req.body);

    res.status(200).send("success!");
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
  return;
}
