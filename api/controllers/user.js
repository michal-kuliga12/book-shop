import User from "../models/User.js";

// UPDATE User
export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
// DELETE User
export const deleteUser = async (req, res, next) => {
  const idArray = req.body;
  try {
    const deletedUser = await User.deleteMany({ _id: { $in: idArray } });
    res.status(200).json({ deletedUser });
  } catch (err) {
    next(err);
    console.log(err);
  }
};
// GET User
export const getUser = async (req, res, next) => {
  const id = req.userId;
  console.log(id);
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return next(err);
  }
  //   const id = req.params.id;
  //   try {
  //     const user = await User.findOne({ _id: id });
  //     res.status(200).json(user);
  //   } catch {
  //     next(err);
  //   }
};
//GET ALL UserS
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch {
    next(err);
  }
};

//CHECK USER
export const checkUser = async (req, res, next) => {
  const id = req.userId;
  try {
    const user = User.find({ _id: id });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
