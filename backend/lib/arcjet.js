import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";

import "dotenv/config";

//initialise arcjet

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    //shield protects the app from common attacks e.g. SQL injection, XSS, CSRF attacks
    shield({ mode: "LIVE" }),

    //as the name suggests, it detects bots, we block any bot other than the ones search engines use
    detectBot({
      mode: "LIVE",
      //block all bots except search engines
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        //the full list is https://github.com/arcjet/arcjet-js/blob/main/protocol/well-known-bots.ts
      ],
    }),

    //rate limiting
    tokenBucket({
      mode: "LIVE",
      refillRate: 30,
      interval: 10,
      capacity: 20,
    }),
  ],
});
