const Adoption = require('../models/Adoption');

exports.create = async (req, res) => {
  const { firstName, lastName, email, address, phone, pet } = req.body;

  try {
    const createAdoptiom = await Adoption.create({
      firstName,
      lastName,
      email,
      address,
      phone,
      pet,
    });
    res.json({ msg: 'Adoption created successfully', createAdoptiom });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const adoptions = await Adoption.find();

    res.json(adoptions);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const adoption = await Adoption.findById(id);
    if (!adoption) {
      res.status(400).json({ msg: 'There is no adoption for this Id' });
    }

    res.json(adoption);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, address, phone, pet } = req.body;

  try {
    if (!(await Adoption.findById(id))) {
      res.status(400).json({ msg: 'There is no adoption for this Id' });
    }

    const updateAdpotion = await Adoption.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        address,
        phone,
        pet,
      },
      { new: true }
    );
    res.json({ msg: 'Adoption updated successfully', updateAdpotion });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    if (!(await Adoption.findById(id))) {
      res.status(400).json({ msg: 'There is no adoption for this Id' });
    }

    const removedAdoption = await Adoption.findByIdAndDelete(id);

    res.json({ msg: 'Adoption removed successfully', removedAdoption });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
