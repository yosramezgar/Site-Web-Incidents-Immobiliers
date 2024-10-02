let jwt = require("jsonwebtoken");

let Authentication = {


  auh_technicien: async (req, res, next) => {
    try {
      let token = req.header("Authorization");
      if (!token)
        return res.status(400).json({ msg: "Invalid Authentication" });

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, technicien) => {
        if (err) return res.status(400).json({ msg: "Invalid Authentication" });

        req.technicien = technicien;
        next();
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = Authentication;
