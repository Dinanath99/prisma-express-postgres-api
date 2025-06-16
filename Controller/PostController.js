//Create a new post

import prisma from "../DB/db.config.js";

export const createPost = async (req, res) => {
  try {
    const { user_id, title, description } = req.body;
    if (!user_id || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const post = await prisma.post.create({
      data: {
        user_id: Number(user_id),
        title,
        description,
      },
    });
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    console.log(error);
  }
};

// fetch all posts

export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true, // Include user details
      },
    });
    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All posts fetched successfully",
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get a single post by Id
export const getPostByid = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update a post by Id
export const updatePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, description } = req.body;

    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: {
        title,
        description,
      },
    });

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete a post by Id
export const deletePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    });
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//fetchuser with post
export const getUserWithPosts = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      // getting user post with title and comment count
      //   include: {
      //     post: {
      //       select: {
      //         title: true,
      //         comment_count: true,
      //       },
      //     },
      //   },

      //getting user title with description
      //   include: {
      //     post: {
      //       select: {
      //         title: true,
      //         description: true,
      //       },
      //     },
      //   },

      //  couting user post and comment
      select: {
        _count: {
          select: {
            post: true,
            comment: true,
          },
        },
      },
    });
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Users with posts fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    console.log(error);
  }
};

// To search the post
export const searchPost = async (req, res) => {
  try {
    const query = req.query.q;

    const posts = await prisma.post.findMany({
      where: {
        description: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//pagination 
export const postPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

    const posts = await prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: true, // Include user details
      },
    });

    const totalPosts = await prisma.post.count();

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    console.log(error);
  }
};
