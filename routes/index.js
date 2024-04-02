const router = require("express").Router();

const carRouter = require("./carRouter");
const adminCarRouter = require("./adminCarRouter");

router.use("/api/v1/cars", carRouter);
router.use("/admin/cars", adminCarRouter);

module.exports = router;
