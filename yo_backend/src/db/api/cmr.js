const db = require("../models");
const path = require("path");

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

const Product = db.cmr;

const upload = require("../../../middleware/multer"); // Import the upload function

const add = async (req, res) => {
  try {
    const localFilePath = req.file.path;

    // const baseUrl = "http://localhost:8080";
    const relativePath = localFilePath.replace(/\\/g, "/"); // Replace backslashes with forward slashes
    const imageUrl = `${relativePath}`;

    const info = {
      image: imageUrl,
    };
    const product = await Product.create(info);
    res.status(200).send(product);
    console.log(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const AllData = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  add,
  AllData,
};
