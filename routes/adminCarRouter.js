const router = require("express").Router();
const multer = require("../services/multer");

const adminCarController = require("../controllers/adminCarController");

router.route("/list").get(adminCarController.listCar);
router
  .route("/add")
  .get(adminCarController.createCar)
  .post(multer.single("file"), adminCarController.insertCar);

module.exports = router;
