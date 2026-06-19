import Claim from "../models/Claim.js";
import Notification from "../models/Notification.js";
import LostItem from "../models/LostItem.js";
import FoundItem from "../models/FoundItem.js";


export const createClaim = async (req, res) => {
try {
const {
itemId,
itemType,
ownerId,
claimerId,
claimerName,
claimerPhone,
reason,
} = req.body;

const existingClaim = await Claim.findOne({
  itemId,
  claimerId,
});

if (existingClaim) {
  return res.status(400).json({
    success: false,
    message:
      "You have already submitted a claim request for this item.",
  });
}

const claim = await Claim.create({
  itemId,
  itemType,
  ownerId,
  claimerId,
  claimerName,
  claimerPhone,
  reason,
  status: "pending",
});

await Notification.create({
  receiverId: ownerId,
  title: "New Claim Request",
  message: `${claimerName} wants to claim your item.`,
  claimId: claim._id,
  read: false,
});

return res.status(201).json({
  success: true,
  message: "Claim submitted successfully",
  claim,
});

} catch (error) {
console.log(error);

return res.status(500).json({
  success: false,
  message: "Server Error",
});

}
};


export const checkExistingClaim = async (req, res) => {
try {
const { itemId, claimerId } = req.query;

const claim = await Claim.findOne({
  itemId,
  claimerId,
});

return res.json({
  success: true,
  exists: !!claim,
});

} catch (error) {
console.log(error);

return res.status(500).json({
  success: false,
  message: "Server Error",
});


}
};

export const getUserClaims = async (req, res) => {
try {
const claims = await Claim.find({
ownerId: req.params.userId,
}).sort({
createdAt: -1,
});

return res.json(claims);

} catch (error) {
console.log(error);

return res.status(500).json({
  success: false,
  message: "Server Error",
});

}
};

export const approveClaim = async (req, res) => {
try {
const claim = await Claim.findById(
req.params.claimId
);

if (!claim) {
  return res.status(404).json({
    success: false,
    message: "Claim not found",
  });
}

if (claim.status !== "pending") {
  return res.status(400).json({
    success: false,
    message:
      "This claim has already been processed.",
  });
}

claim.status = "approved";
await claim.save();

if (claim.itemType === "lost") {
  await LostItem.findByIdAndUpdate(
    claim.itemId,
    {
      status: "claimed",
    }
  );
}

if (claim.itemType === "found") {
  await FoundItem.findByIdAndUpdate(
    claim.itemId,
    {
      status: "claimed",
    }
  );
}

await Notification.create({
  receiverId: claim.claimerId,
  title: "Claim Approved",
  message:
    "Your claim request has been approved.",
  read: false,
});

await Notification.deleteMany({
  claimId: claim._id,
});

return res.json({
  success: true,
  message: "Claim approved successfully",
  claim,
});


} catch (error) {
console.log(error);

return res.status(500).json({
  success: false,
  message: "Server Error",
});

}
};


export const rejectClaim = async (req, res) => {
try {
const claim = await Claim.findById(
req.params.claimId
);

if (!claim) {
  return res.status(404).json({
    success: false,
    message: "Claim not found",
  });
}

if (claim.status !== "pending") {
  return res.status(400).json({
    success: false,
    message:
      "This claim has already been processed.",
  });
}

claim.status = "rejected";
await claim.save();

await Notification.create({
  receiverId: claim.claimerId,
  title: "Claim Rejected",
  message:
    "Your claim request has been rejected.",
  read: false,
});

await Notification.deleteMany({
  claimId: claim._id,
});

return res.json({
  success: true,
  message: "Claim rejected successfully",
  claim,
});

} catch (error) {
console.log(error);

return res.status(500).json({
  success: false,
  message: "Server Error",
});


}
};
