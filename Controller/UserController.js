import prisma from "../DB/db.config.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (findUser) {
      return res.status(400).json({
        message: "Email already exist, Please choose another one",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
    console.log(error);
  }
};

//getAllUser

export const getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
    });
    console.log(error);
  }
};

//get a single user by ID

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
    });
    console.log(error);
  }
};

//Update the user

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: { name, email, password },
    });
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
    });
    console.log(error);
  }
};

// Delete a user by ID

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.delete({
      where: { id: Number(userId) },
    });
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Internal server error",
    });
    console.log(error);
  }
};
