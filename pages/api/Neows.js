// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

// export default function handler(req, res) {
//   if (req.method === 'POST') {
//     // Process a POST request
//   } else {
//     // Handle any other HTTP method
//   }
// }

// import { NextResponse } from "next/server";

// export const GET = async (req) => {
  
// const keys = [...req.headers.keys()];
//      if (!keys.includes("request-for-key")) {
//       return NextResponse.json("Hello there"); 
//     } else {
//       const data = {apiKey: process.env.NASA_API_KEY};
//       return NextResponse.json(data);
//     }
// }

export default function handler(req, res) {
  const keys = [...Object.keys(req.headers)];
     if (!keys.includes("request-for-key")) {
      return res.status(200).json({ name: "Hello there" })
    } else {
      const data = {apiKey: process.env.NASA_API_KEY};
      return res.status(200).json(data);
    }
}
