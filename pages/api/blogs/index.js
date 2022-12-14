const connectDatabase = require("../../../utils/db");
import NextCors from "nextjs-cors";
import Blogs from "../../../models/Blogs";

connectDatabase();

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });


  // *********************************************************************

  switch (req.method) {
    case "POST":
      try {
        const blog = await Blogs.create(req.body);
        res.status(201).json({ success: true, data: blog });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;
    case "GET":
      try {
        let blogs = await Blogs.find({});
        const { category } = req.query;
      
        if (category && category !== "" && category !== "undefined") {
          blogs = blogs.filter((blog) => blog.category === category);
        }
        res.status(200).json({ success: true, data: blogs });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;

    
    default:
      res.status(400).json({ success: false, message: "Default request" });
      break;
  }
}