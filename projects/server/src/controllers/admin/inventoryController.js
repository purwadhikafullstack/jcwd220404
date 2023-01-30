const { Op } = require("sequelize");
const db = require("../../models");
const inventory = db.Inventory;
const product = db.Product;
const price = db.Price;
const branch = db.Branch;
const category = db.Category;

module.exports = {
  create: async (req, res) => {
    try {
      const { stockQty, entryDate, BranchId, ProductId, AdminId } = req.body;
      const data = await inventory.create({
        stockQty,
        entryDate,
        BranchId,
        ProductId,
        AdminId,
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findByBranch: async (req, res) => {
    try {
      const inventories = await inventory.findAll({
        include: [
          {
            model: product,
            include: [{ model: price }],
          },
          {
            model: branch,
            where: {
              longitude: { [Op.between]: [req.params.from, req.params.to] },
            },
          },
        ],
      });
      res.status(200).send(inventories);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAll: async (req, res) => {
    console.log(req)
    try {
      const inventories = await inventory.findAll({
        where: {
          AdminId: req.params.id
        },
        // attributes: ["id", "productName", "description", "picture"],
        include: [{ model: product }],
      });
      res.status(200).send(inventories);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  paginationProduct: async (req, res) => {
    try {
      const { page, limit, search_query, order, sort } = req.query;
      const productlist_page = parseInt(page) || 0;
      const list_limit = parseInt(limit) || 5;
      const search = search_query || "";
      const offset = list_limit * productlist_page;
      const orderby = order || "productName";
      const direction = sort || "ASC";
      const totalRows = await inventory.count({
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
      const result = await inventory.findAll({
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

  searchBy: async (req, res) => {
    try {
      const { productName, description } = req.query;
      const products = await inventory.findAll({
        where: {
          [Op.or]: {
            productName: {
              [Op.like]: `%${productName}%`,
            },
          },
        },
        raw: true,
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  totalProduct: async (req, res) => {
    try {
      const products = await inventory.findAll({
        attributes: [[sequelize.fn("count", sequelize.col(`id`)), "total"]],
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  sortBy: async (req, res) => {
    try {
      const { data, order } = req.query;
      const products = await inventory.findAll({
        order: [[data, order]],
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};