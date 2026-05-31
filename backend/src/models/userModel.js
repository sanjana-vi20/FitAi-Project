import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    referenceDiet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diet",
      // required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    photo: {
      url: {
        type: String,
      },
      publicID: {
        type: String,
      },
    },
    //profile
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // jb data laao to virtuals ko bhi lekr aana
    toObject: { virtuals: true },
  },
);

// virtual populate
userSchema.virtual("profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "referenceUser",
});

userSchema.virtual("diet", {
  ref: "Diet",
  localField: "_id",
  foreignField: "referenceUser",
});

const User = mongoose.model("User", userSchema);

export default User;
