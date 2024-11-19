// Creating token and saving in cookie

const sendToken = (user, statusCode, res, token) => {
  //options cookie
  const options = {
    maxAge: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: "Auth User",
    user,
    token,
  });
};

export default sendToken;
