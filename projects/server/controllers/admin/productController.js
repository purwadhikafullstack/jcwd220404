const { Op } = require("sequelize");
const db = require("../../models");
const product = db.Product;
const price = db.Price;
const category = db.Category;

module.exports = {
  create: async (req, res) => {
    try {
      const { productName,
        description } = req.body;

      if (!productName && 
        !description) throw "required field";

      await product.create({
        productName,
        description,
      });
      res.status(200).send({
        message: "Successfully Added",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  createCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;

      await category.create({
        categoryName,
      });
      res.status(200).send({
        message: "Successfully Added",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAll: async (req, res) => {
    try {
      const users = await product.findAll({
        attributes: [
          "id",
          "productName",
          "description",
          "picture",
        ],
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAllCategory: async (req, res) => {
    try {
      const users = await category.findAll({
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findById: async (req, res) => {
    try {
      const users = await product.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findBy: async (req, res) => {
    try {
      const { productName, 
        description } = req.query;
      const users = await product.findAll({
        where: {
          [Op.or]: {
            productName: productName ? productName : "",
            description: description ? description : "",
          },
        },
        raw: true,
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  searchBy: async (req, res) => {
    try {
      const { productName, categoryName } = req.query;
      const users = await product.findAll({
        where: {
          [Op.or]: {
            productName: {
              [Op.like]: `%${productName}%`,
            },
            categoryName: {
              [Op.like]: `%${categoryName}%`,
            },
          },
        },
        raw: true,
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  totalProduct: async (req, res) => {
    try {
      const users = await product.findAll({
        attributes: [[sequelize.fn("count", sequelize.col(`id`)), "total"]],
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  remove: async (req, res) => {
    try {
      await product.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log(req.params.id);
      const users = await product.findAll();
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  removeCategory: async (req, res) => {
    try {
      await category.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log(req.params.id);
      const users = await category.findAll();
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  update: async (req, res) => {
    try {
      const { productName, 
         description } = req.body;

      await product.update(
        {
          productName,
          description,
        },
        {
          where: { id: req.params.id },
        }
      );
      const users = await product.findOne({ where: { id: req.params.id } });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      await category.update(
        {
          categoryName,
        },
        {
          where: { id: req.params.id },
        }
      );
      const users = await category.findOne({ where: { id: req.params.id } });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  sortBy: async (req, res) => {
    try {
      const { data, order } = req.query;
      const users = await product.findAll({
        order: [[data, order]],
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  uploadFile: async (req, res) => {
    try {
      let fileUploaded = req.file;
      console.log("controller", fileUploaded);
      await product.update(
        {
          picture: `upload/${fileUploaded.filename}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const getPicture = await product.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      res.status(200).send({
        id: getPicture.id,
        picture: getPicture.picture,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  uploadCategory: async (req, res) => {
    try {
      let fileUploaded = req.file;
      console.log("controller", fileUploaded);
      await category.update(
        {
          categoryPicture: `upload/${fileUploaded.filename}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const getPicture = await category.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      res.status(200).send({
        id: getPicture.id,
        categoryPicture: getPicture.categoryPicture,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  paginationProduct: async (req, res) => {
    try {
      const { page, limit, search_query, order, sort} = req.query;
      const productlist_page = parseInt(page) || 0;
      const list_limit = parseInt(limit) || 5;
      const search = search_query || "";
      const offset = list_limit * productlist_page;
      const orderby = order || "productName";
      const direction = sort || "ASC";
      const totalRows = await product.count({
        where: {
          [Op.or]: [
            {
              productName: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              description: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await product.findAll({
        // include: [
        //   {
        //     model: cart,
        //     attributes: ["id"],
        //   },
        // ],
        where: {
          [Op.or]: [
            {
              productName: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              description: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        offset: offset,
        limit: list_limit,
        order: [[orderby, direction]],
        // include: [
        //   {
        //     model: cart,
        //     attributes: ["id"],
        //   },
        // ],
      });

      res.status(200).send({
        result: result,
        page: productlist_page,
        limit: list_limit,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  paginationCategory: async (req, res) => {
    try {
      const { page, limit, search_query, order, sort } = req.query;
      const categorylist_page = parseInt(page) || 0;
      const list_limit = parseInt(limit) || 5;
      const search = search_query || "";
      const offset = list_limit * categorylist_page;
      const orderby = order || "categoryName";
      const direction = sort || "ASC";
      const totalRows = await category.count({
        where: {
          [Op.or]: [
            {
              categoryName: {
                [Op.like]: "%" + search + "%",
              },
            },
            // {
            //   description: {
            //     [Op.like]: "%" + search + "%",
            //   },
            // },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await category.findAll({
        // include: [
        //   {
        //     model: cart,
        //     attributes: ["id"],
        //   },
        // ],
        where: {
          [Op.or]: [
            {
              categoryName: {
                [Op.like]: "%" + search + "%",
              },
            },
            // {
            //   description: {
            //     [Op.like]: "%" + search + "%",
            //   },
            // },
          ],
        },
        offset: offset,
        limit: list_limit,
        order: [[orderby, direction]],
        // include: [
        //   {
        //     model: cart,
        //     attributes: ["id"],
        //   },
        // ],
      });

      res.status(200).send({
        result: result,
        page: categorylist_page,
        limit: list_limit,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  stock: async (req, res) => {
    try {
    } catch (err) {
      res.status(400).send(err);
    }
  },
};