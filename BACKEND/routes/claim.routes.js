import express from "express";

import {
createClaim,
checkExistingClaim,
getUserClaims,
approveClaim,
rejectClaim,
} from "../controlllers/claim.controller.js";

const router = express.Router();

router.post("/", createClaim);

router.get("/check", checkExistingClaim);

router.get(
"/user/:userId",
getUserClaims
);

router.patch(
"/:claimId/approve",
approveClaim
);

router.patch(
"/:claimId/reject",
rejectClaim
);

export default router;
