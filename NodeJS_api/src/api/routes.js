const { Router } = require('express');
const controller =require('./controller');
const router = Router();

router.get("/deployment",  controller.Deployment);
router.get("/user",  controller.Users);
router.post("/user", controller.addUser);
router.get("/pull-request",  controller.PullRequest);
router.get("/issue",  controller.Issue);
router.get("/developer",  controller.Developer);
router.get("/repository",  controller.Repository);
router.get("/project-lead",  controller.ProjectLead);
router.get("/coverage-rate",  controller.Coverage);


module.exports = router;
