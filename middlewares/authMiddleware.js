const JWT = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    //get token

    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECREAT, (err, decode) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Unathorize-User", err });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
    
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Auth API", error });
  }
};

module.exports = authMiddleware;