import { config, sanityClient } from "../../../lib/sanity";

export default async function handler(req, res) {
  const { email, name, sub } = req.body;

  console.log("dog");

  const projectId = config.projectId;
  const datasetName = config.dataset;
  const mutations = [
    {
      create: {
        _type: `users`,
        email: `${email}`,
        name: `${name}`,
        title: `${name}`,
        userId: `${sub}`,
      },
    },
  ];

  let userInfo = [];

  for (let i = 0; i < 2; i++) {
    userInfo = await sanityClient.fetch(
      `*[_type == 'users' && userId == $userId]`,
      { userId: sub }
    );

    if (userInfo.length > 0) break;
  }

  if (userInfo.length === 0) {
    try {
      const data = await fetch(
        `https://${projectId}.api.sanity.io/${config.apiVersison}/data/mutate/${datasetName}?returnIds=true`,
        {
          method: "post",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${process.env.SANITY_AUTH_TOKEN}`,
          },
          body: JSON.stringify({ mutations }),
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send({ ans: `tHAT DIDN'T WORK FOR SOME REASON` });
      return;
    }
  }

  res.status(201).json({ ans: "yep it worked" });
  return;
}
