import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Camera,
  Send,
  Sparkles,
  Image as ImageIcon,
  Zap,
  Award,
} from "lucide-react";
import AOS from "aos";
import api from "../../../config/API";
import toast from "react-hot-toast";

const AddPostModel = ({ onClose, user }) => {
  const [formData, setFormData] = useState({
    user: user,
    caption: "",
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [photo, setPhoto] = useState();

  // Image select karne ka logic (Sirf UI preview ke liye)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
      setPhoto(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const form_data = new FormData();
    form_data.append("image", photo);
    form_data.append("imageURL", preview);
    form_data.append("caption", formData.caption);
    // form_data.append("user" , formData.user)
    setLoading(true);
    try {
      const res = await api.post(import.meta.env.VITE_USER_POST_P, form_data);
      console.log(res?.data?.message);

      toast.success(res?.data?.message || "Post Shared Successfully!");

      // Post hone ke baad fields reset karo
      setFormData({ caption: "" });
      setPreview(null);
      setPhoto(null);

      
      onClose();

      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 500, easing: "ease-out-back" });
  }, []);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 overflow-hidden">
      {/* --- LAYERED BACKDROP --- */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-blue-500/5 pointer-events-none"></div>

      {/* --- MODAL BOX --- */}
      <div
        data-aos="zoom-in-up"
        className="relative w-full max-w-lg bg-[#0d1117] border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* TOP NEON LINE */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-50"></div>

        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-lime-400/10 rounded-lg">
              <Zap size={18} className="text-lime-400 fill-lime-400" />
            </div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">
              Post <span className="text-lime-400">Update</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {/* USER PROFILE MINI CARD */}
          <div className="flex items-center gap-4 mb-8 bg-white/5 p-4 rounded-3xl border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lime-400 to-emerald-500 flex items-center justify-center text-black font-black italic shadow-[0_0_15px_rgba(163,230,53,0.3)] text-xl">
              {user?.fullName?.charAt(0) || "S"}
            </div>
            <div>
              <h4 className="text-sm font-black text-white italic leading-none uppercase">
                {user?.fullName || "Athlete"}
              </h4>
              <p className="text-[9px] text-lime-400 font-bold uppercase tracking-[0.2em] mt-1 flex items-center gap-1">
                <Award size={10} /> Certified Member
              </p>
            </div>
          </div>

          {/* INPUTS */}
          <div className="space-y-6">
            <textarea
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              placeholder="What did you crush today?"
              className="w-full bg-transparent text-slate-200 placeholder:text-slate-700 text-base focus:outline-none resize-none min-h-[80px] px-2 font-medium italic"
            />

            {/* IMAGE SELECTOR (Using Label) */}
            <div className="relative group">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              <label
                htmlFor="file-upload"
                className={`relative rounded-[2rem] flex flex-col items-center justify-center transition-all duration-500 cursor-pointer overflow-hidden border-2
                  ${preview ? "border-lime-400/30 h-72 shadow-[0_0_30px_rgba(163,230,53,0.1)]" : "border-dashed border-slate-800 bg-slate-900/40 h-52 hover:border-lime-400/50 hover:bg-lime-400/5"}`}
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm">
                      <Camera size={30} className="text-lime-400 mb-2" />
                      <p className="text-[10px] font-black uppercase text-white tracking-widest">
                        Change Photo
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center group-hover:scale-110 transition-transform">
                    <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 mb-3 mx-auto border border-white/5">
                      <Camera size={28} />
                    </div>
                    <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">
                      Select Progress Image
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            disabled={!preview || !formData.caption || loading}
            onClick={handleSubmit}
            className={`w-full mt-10 py-5 bg-lime-400 text-black font-black uppercase text-xs rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_15px_40px_rgba(163,230,53,0.25)] 
           ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-white active:scale-95"}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin"></div>
                Transmitting...
              </>
            ) : (
              <>
                Broadcast to Community <Send size={16} strokeWidth={3} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPostModel;
