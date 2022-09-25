import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  projectId: "lm1r956o",
  dataset: "production",
  apiVersison: "v2021-10-21",
  useCdn: "false",
  token: process.env.SANITY_AUTH_TOKEN,
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);
