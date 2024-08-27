const {Router} = require("express");
const { registerUser, login, logout, fetchAllUser, fetchOneUser, updateUser, deleteUser } = require("../controller/userController");



const router = Router();

router.post("/signup",registerUser);
router.post("/login",login);
router.get("/logout",logout);
router.get("/alluser",fetchAllUser);
router.get("/oneuser/:id",fetchOneUser)
router.patch("/updateuser/:id",updateUser);
router.delete("/deleteuser/:id",deleteUser)

module.exports = router;