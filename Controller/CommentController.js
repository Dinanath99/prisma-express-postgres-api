import prisma from "../DB/db.config.js";

// create comment controller
export const createComment = async (req, res) => {
  try {
    const { user_id, post_id, comment } = req.body;
    if (!user_id || !post_id || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //increase the comment counter
    await prisma.post.update({
      where: {
        id: Number(post_id),
      },
      data: {
        comment_count: {
          increment: 1,
        },
      },
    });

    // Create a new comment

    const newComment = await prisma.comment.create({
      data: {
        user_id: user_id,
        post_id: post_id,
        comment,
      },
    });
    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      newComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    console.log(error);
  }
};

// fetch all comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: true,
        post: true,
      },
    });
    if (!comments || comments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No comments found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All comments fetched successfully",
      comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// fetch a single comment by ID
export const getCommentById = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await prisma.comment.findUnique({
      where: { id: Number(commentId) },
      include: {
        user: true,
        post: true,
      },
    });
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Comment fetched successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update a comment by ID
export const updateCommentById = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment field is required",
      });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: Number(commentId) },
      data: { comment },
    });

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete a comment by ID
export const deleteCommentById = async (req, res) => {
  try {
    const commentId = req.params.id;

    const deletedComment = await prisma.comment.delete({
      where: { id: Number(commentId) },
    });
    res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      deletedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//fetchpost with comments
export const fetchPosts = async (req, res) => {
  try {
    const posts = await prisma.user.findMany({
      // post with title
      // include: {
      //   post: {
      //     select: {
      //       title: true,
      //     },
      //   },
      // },
      //user with post count and comment count
      // select: {
      //   _count: {
      //     select: {
      //       post: true,
      //       comment: true,
      //     },
      //   },
      // },
      //gettting last post at first
      // orderBy: {
      //   id: "desc",
      // },
    });

    if (!posts) {
      return res.status(400).json({
        success: false,
        message: "No post found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post with comment fetched successfully",
      posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
    console.log(error);
  }
};
