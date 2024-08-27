const Router = require("express");
const { addToDo, fetchAllToDo, fetchOneToDo, updateToDo, deleteToDo } = require("../controller/todoController");
const { protect } = require("../middlewere/auth");




const router = Router();

router.post("/addtodo",addToDo);
router.get("/alltodo",fetchAllToDo);
router.get("/onetodo/:id",fetchOneToDo);
router.patch("/updatetodo/:id",updateToDo);
router.delete("/deletetodo/:id",deleteToDo);

module.exports = router;