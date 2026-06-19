import { useState, useEffect } from "react";
import axios from "axios";
import {
X,
Phone,
ShieldCheck,
AlertCircle,
CheckCircle2,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";

function ClaimModal({
isOpen,
onClose,
item,
itemType = "found",
}) {
const { user } = useUser();

const [reason, setReason] =
useState("");

const [loading, setLoading] =
useState(false);

const [
alreadyClaimed,
setAlreadyClaimed,
] = useState(false);

const [
checkingStatus,
setCheckingStatus,
] = useState(true);

useEffect(() => {
if (!isOpen) {
setReason("");
}
}, [isOpen]);

useEffect(() => {
const checkClaimStatus =
async () => {
if (!item || !user) return;

    try {
      setCheckingStatus(true);

      const res =
        await axios.get(
          `https://findit-manit-backend-ab8s.onrender.com/api/claims/check/${item._id}/${user.id}`
        );

      setAlreadyClaimed(
        res.data.alreadyClaimed
      );
    } catch (error) {
      console.log(error);
    } finally {
      setCheckingStatus(false);
    }
  };

if (isOpen) {
  checkClaimStatus();
}

}, [isOpen, item, user]);

if (!isOpen || !item) return null;

const handleSubmit =
async () => {
if (reason.trim().length < 20) {
alert(
"Please provide a detailed explanation (minimum 20 characters)."
);
return;
}

  try {
    setLoading(true);

    await axios.post(
      "https://findit-manit-backend-ab8s.onrender.com/api/claims",
      {
        itemId: item._id,

        itemType,

        ownerId:
          item.userId,

        claimerId:
          user.id,

        claimerName:
          user.fullName,

        claimerPhone:
          user?.primaryPhoneNumber
            ?.phoneNumber ||
          "Not Provided",

        reason,
      }
    );

    alert(
      "Claim request sent successfully."
    );

    setAlreadyClaimed(true);

    onClose();
  } catch (error) {
    console.log(error);

    alert(
      error?.response?.data
        ?.message ||
        "Failed to send claim request."
    );
  } finally {
    setLoading(false);
  }
};

return (
<div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center px-4 transition-colors">

  <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden dark:bg-slate-800">

    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-5 text-white flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold">
          {itemType === "lost"
            ? "I Found This Item"
            : "Claim Item"}
        </h2>

        <p className="text-indigo-100 text-sm">
          {itemType === "lost"
            ? "Provide details about where you found this item."
            : "Provide proof that this item belongs to you."}
        </p>
      </div>

      <button
        onClick={onClose}
        className="hover:bg-white/20 p-2 rounded-full transition"
      >
        <X size={22} />
      </button>

    </div>

    <div className="p-6">

      <div className="bg-slate-50 rounded-2xl p-4 border dark:bg-slate-700 dark:border-slate-600">

        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          {item.title}
        </h3>

        <p className="text-gray-600 mt-2 dark:text-gray-300 ">
          {item.description}
        </p>

      </div>

      <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-4 dark:bg-green-900/20 dark:border-green-700">

        <div className="flex items-center gap-2 mb-2">

          <Phone
            size={18}
            className="text-green-600"
          />

          <span className="font-semibold text-slate-800 dark:text-white">
            {itemType === "lost"
              ? "Owner Contact Number"
              : "Finder Contact Number"}
          </span>

        </div>

        <p className="text-lg font-bold text-green-700">
          {item.phoneNumber}
        </p>

      </div>

      <div className="mt-5 bg-blue-50 border border-blue-200 rounded-2xl p-4 dark:bg-blue-900/20 dark:border-blue-700">

        <div className="flex gap-2">

          <AlertCircle
            size={18}
            className="text-blue-600 mt-0.5"
          />

          <p className="text-sm text-blue-800 dark:text-blue-300">
            {itemType === "lost"
              ? "Tell the owner where and when you found this item."
              : "Describe unique details proving ownership."}
          </p>

        </div>

      </div>

      <div className="mt-5">

        <div className="flex items-center gap-2 mb-3">

          <ShieldCheck
            size={18}
            className="text-indigo-600"
          />

          <label className="font-semibold text-slate-800 dark:text-white">
            {itemType === "lost"
              ? "Details About Finding The Item"
              : "Ownership Proof"}
          </label>

        </div>

        <textarea
          rows="6"
          value={reason}
          onChange={(e) =>
            setReason(
              e.target.value
            )
          }
          placeholder={
            itemType === "lost"
              ? "Example: I found this wallet near the library at around 4 PM yesterday..."
              : "Example: Black Wildcraft wallet containing my college ID card, SBI ATM card and ₹500 cash..."
          }
          className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:outline-none focus:border-indigo-500 resize-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
        />

        <div className="text-right text-sm text-gray-500 mt-1 dark:text-gray-400">
          {reason.length}/500
        </div>

      </div>

      {alreadyClaimed && (
        <div className="mt-4 bg-yellow-50 border border-yellow-300 rounded-2xl p-4 dark:bg-yellow-900/20 dark:border-yellow-700">

          <div className="flex items-center gap-2">

            <CheckCircle2
              className="text-yellow-600"
              size={18}
            />

            <span className="font-medium text-yellow-700">
              Claim request already submitted.
            </span>

          </div>

        </div>
      )}

      <div className="mt-6 flex gap-3">

        <button
          onClick={onClose}
          className="flex-1 border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 transition dark:border-slate-600 dark:hover:bg-slate-700 dark:text-white"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={
            loading ||
            alreadyClaimed ||
            checkingStatus
          }
          className={`flex-1 py-3 rounded-xl text-white font-semibold transition ${
            loading ||
            alreadyClaimed ||
            checkingStatus
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {checkingStatus
            ? "Checking..."
            : alreadyClaimed
            ? "Already Submitted"
            : loading
            ? "Sending..."
            : itemType === "lost"
            ? "Notify Owner"
            : "Confirm Claim"}
        </button>

      </div>

    </div>

  </div>

</div>

);
}

export default ClaimModal;