const router = require("express").Router();
const { rearg, tap } = require("lodash");
const sequelize = require("sequelize");
const { Tag, Product, ProductTag } = require("../../models");
const {
  productSerializerAll,
  productSerializerOne,
} = require("../../utils/productSerializer");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        as: "products",
      },
    ],
  })
    .then((tags) => {
      console.log(tags);
      return res.json(tagSerializerAll(tags));
    })
    .catch((err) => {
      console.log(err);
      res.json(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      as: "products",
    },
  })
    .then((tags) => {
      if (!tags) {
        res.status(404).json({ message: "No Tags Found" });
        return;
      }
      return res.json(tagSerializerOne(tags));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: "No tag with this id found" });
        return;
      }
      Tag.findAll({ where: { id: req.params.id } }).then((tag) =>
        res.json(tag)
      );
    })
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tag) => {
      if (!tag) {
        res.status(404).json({ message: "no tag found" });
        return;
      }
      res.json(tag);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
