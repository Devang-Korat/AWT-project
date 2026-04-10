const router = require("express").Router();
const { loginUser, register } = require("../controllers/authController");
const User = require("../models/User");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");


router.post("/register", register);
router.post("/login", loginUser);

const isAdmin = (req, res, next) => {
  console.log("User from token:", req.user);

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only access" });
  }
  next();
};

router.get("/all", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: "employee" }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/profile/name", auth, async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select("-password");
 
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/check-email", async (req,res)=>{
 const user = await User.findOne({email:req.body.email});

 if(!user) return res.status(400).json({message:"Email not found"});

 res.json({message:"Email verified"});
});

router.post("/reset-password", async (req, res) => {

  try {

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne(
      { email },
      { password: hashedPassword }
    );

    res.json({
      message: "Password updated successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error updating password"
    });

  }

});

router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const { name, email, mobile, role, isActive, password } = req.body;

    if (!name || !email || !mobile) {
      return res.status(400).json({
        message: "Name, Email and Mobile are required",
      });
    }

    let updateData = {
      name,
      email,
      mobile,
      role,
      isActive,
    };

    if (password && password.trim() !== "") {

      if (password.length < 6) {
        return res.status(400).json({
          message: "Password must be at least 6 characters",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", auth, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;