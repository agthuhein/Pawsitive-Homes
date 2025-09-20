const Category = require('../models/Category');

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find();

    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const created = await Category.create({ name });

    res.json({ msg: 'success', created });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    res.json({ msg: 'success', updated });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);

    res.json({ msg: 'success', deleted });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
