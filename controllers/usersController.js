const User = require("../model/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const createUser = async (req, res) => {
  const { usr, pwd, roles } = req.body;
  if (!usr || !pwd)
    return res.status(400).json("username and passwd are required!");
  // check for duplicate username
  const duplicate = await User.findOne({ usr: usr }).exec();
  if (duplicate)
    return res.status(400).json({ message: "choose another username" });
  // encrypt passwd
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = await User.create({
      usr: usr,
      pwd: hashedPwd,
      roles: roles,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json("user validation failed");
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  console.log('user password must be updated every 6 month');
  const { usr, newPwd, roles } = req.body;
  // newPwd verification on front-end side
  const result =
    roles ? 
    await User.findOneAndUpdate({ usr: usr }, { pwd: await bcrypt.hash(newPwd, 10), roles: roles }, {
    new: true
  }) : await User.findOneAndUpdate({ usr: usr }, { pwd: await bcrypt.hash(newPwd, 10)}, {
    new: true
  })
  result
    ? res.status(201).json(result)
    : res.status(400).json(`no user ${usr} found`)
}

const deleteUser = async (req, res) => {
    const { _id, usr } = req.body;
    if (_id) {
        const result = await User.findByIdAndDelete({ _id });
        result
            ? res.status(200).json(result)
            : res.status(400).json(`no user with _id ${_id}`);
    }
    else if (usr) {
        const result = await User.findOneAndDelete({ usr });
        result
            ? res.status(200).json(result)
            : res.status(400).json(`no user ${usr} is found`);
    } else {
        res.status(400).json(`no valid information has been provided`)
    }
}
const getUser = async (req, res) => {
  const _id = req.params.id;
  console.log(req.params);
  if (!_id) return res.sendStatus(400);
  const foundUser = await User.findById({ _id: _id });
  foundUser
    ? res.status(200).json(foundUser)
    : res.status(400).json({message: `no user with _id ${_id} was found`})
}
module.exports = { getAllUsers, createUser, updateUser, deleteUser, getUser };
