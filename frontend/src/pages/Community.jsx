import React, { useEffect, useState } from "react";
import {
  Heart,
  MessageSquare,
  Share2,
  Image as ImageIcon,
  Plus,
  Send,
  Award,
  MoreHorizontal,
  Trash2,
  Flag,
} from "lucide-react";
import { motion } from "framer-motion";
import Aos from "aos";
import AddPostModel from "./dashboards/modal/AddPostModel";
import { useAuth } from "../config/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/API";

const Community = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLogin } = useAuth();

  const navigate = useNavigate();

  const [allPosts, setAllPost] = useState();
  const [loading, setLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get(import.meta.env.VITE_GET_ALL_POST);
      setAllPost(res?.data?.data);
      console.log(res?.data?.data);

      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [!!isModalOpen]);

  // Community.jsx ke andar handleLike function add karein:

  const handleLike = async (postId) => {
    try {
      console.log(postId);

      const res = await api.put(`${import.meta.env.VITE_LIKE_POST_P}/${postId}`);

      if (res.status === 200) {
        // Sirf us specific post ki likes update karein state mein
        setAllPost((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...post, likes: res.data.likes } : post,
          ),
        );
      }
    } catch (error) {
      console.error("Like Error:", error);
      toast.error("Action failed");
    }
  };

  const handleDelete = async (postId) => {
  if (window.confirm("Are you sure you want to delete this transmission?")) {
    try {
      const res = await api.delete(`${import.meta.env.VITE_DELETE_POST_D}/${postId}`);
      if (res.status === 200) {
        toast.success("Post Deleted");
        // State se post remove karein taaki UI se turant gayab ho jaye
        setAllPost(allPosts.filter(p => p._id !== postId));
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  }
};

  // console.log("User : ", user);
  // console.log("islogin : ", isLogin);

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });

    Aos.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-[#05080a] text-white pt-20 pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* --- 1. HEADER SECTION --- */}
        <div className="mb-10" data-aos="fade-down">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            FitAI <span className="text-lime-400">Community</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
            Connect • Inspire • Evolve
          </p>
        </div>

        {/* --- 2. ADD POST SECTION --- */}
        <div
          className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-5 mb-12"
          data-aos="fade-up"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-lime-400 flex items-center justify-center text-black font-black italic shadow-[0_0_20px_rgba(163,230,53,0.2)]">
              S
            </div>
            <button className="flex-1 bg-slate-800/50 hover:bg-slate-800 text-left px-6 py-4 rounded-2xl text-slate-400 text-xs font-medium transition-all border border-white/5 tracking-wide">
              What's your progress today, {user?.fullName}?
            </button>
            <button
              className="p-4 bg-lime-400/10 text-lime-400 rounded-2xl hover:bg-lime-400 hover:text-black transition-all group"
              onClick={() => {
                if (isLogin) {
                  setIsModalOpen(true);
                } else {
                  toast.error("Please Login First");
                  navigate("/login");
                }
              }}
            >
              <Plus
                size={20}
                strokeWidth={3}
                className="group-hover:rotate-90 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* --- 3. COMMUNITY FEED --- */}

        {/* --- LOADING STATE --- */}
        {loading && (
          <div className="text-center text-lime-400 font-bold animate-pulse uppercase tracking-widest py-10">
            Syncing Community Data...
          </div>
        )}

        {/* --- ARRAY MAPPING START --- */}
        {!loading && allPosts && allPosts.length > 0
          ? allPosts.map((post) => (
              <div
                key={post._id} // Har array item ke liye unique key zaroori hai
                data-aos="fade-up"
                className="bg-[#0a0f14] border mb-7 border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:border-lime-400/20"
              >
                {/* HEADER: User Info */}
                <div className="p-6 flex items-center  justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-lime-400 to-emerald-500 p-[2px]">
                      <div className="w-full h-full bg-[#0a0f14] rounded-[14px] flex items-center justify-center font-black text-lime-400 italic">
                        {post?.user?.fullName?.charAt(0) || "A"}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white italic tracking-tight leading-none uppercase">
                        {post?.user?.fullName}
                      </h4>
                      <p className="text-[9px] text-lime-400/60 font-bold uppercase tracking-widest mt-1">
                        Active Member
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === post._id ? null : post._id)
                      }
                      className="text-slate-600 hover:text-white transition-colors p-2"
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {/* DROPDOWN MENU */}
                    {openMenuId === post._id && (
                      <div
                        className="absolute right-0 mt-2 w-48 bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                        data-aos="zoom-in"
                        data-aos-duration="200"
                      >
                        {/* Delete Option (Sirf tab dikhao agar post current user ki ho) */}
                        {post.user._id === user?._id && (
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/10 transition-colors text-xs font-bold uppercase tracking-widest"
                          >
                            <Trash2 size={16} /> Delete Post
                          </button>
                        )}

                        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-white/5 transition-colors text-xs font-bold uppercase tracking-widest text-left">
                          <Flag size={16} /> Report
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* IMAGE SECTION */}
                <div className="px-4">
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/5 shadow-inner bg-slate-900/50">
                    <img
                      src={post?.image?.url || post?.imageURL}
                      alt="Progress"
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>

                {/* CAPTION & CONTENT */}
                <div className="p-8">
                  <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                    <span className="text-white font-black not-italic mr-2">
                      @{post?.user?.fullName?.split(" ")[0].toLowerCase()}
                    </span>
                    "{post?.caption}"
                  </p>

                  <p className="text-[9px] text-slate-600 font-bold uppercase mt-4 tracking-tighter">
                    {new Date(post?.createdAt).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  {/* INTERACTION BAR */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-6">
                    <button
                      onClick={() => handleLike(post._id)}
                      className="flex items-center gap-2 group/btn"
                    >
                      <div
                        className={`p-2.5 rounded-xl transition-all duration-300 ${
                          post.likes.includes(user?._id)
                            ? "bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                            : "bg-slate-900 group-hover/btn:bg-red-500/10"
                        }`}
                      >
                        <Heart
                          size={18}
                          className={`transition-colors ${
                            post.likes.includes(user?._id)
                              ? "text-red-500 fill-red-500"
                              : "text-slate-500 group-hover/btn:text-red-500"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                          post.likes.includes(user?._id)
                            ? "text-white"
                            : "text-slate-500 group-hover/btn:text-white"
                        }`}
                      >
                        Likes ({post?.likes?.length || 0})
                      </span>
                    </button>

                    <button className="flex items-center gap-2 group/btn">
                      <div className="p-2.5 bg-slate-900 rounded-xl group-hover/btn:bg-blue-500/10 transition-colors">
                        <MessageSquare
                          size={18}
                          className="text-slate-500 group-hover/btn:text-blue-500 transition-colors"
                        />
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover/btn:text-white transition-colors">
                        Discuss
                      </span>
                    </button>

                    <button className="ml-auto text-slate-500 hover:text-lime-400 transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          : !loading && (
              <div className="text-center text-slate-600 italic py-20">
                No data found in this sector.
              </div>
            )}
        {/* --- ARRAY MAPPING END --- */}
      </div>

      {isModalOpen && (
        <AddPostModel onClose={() => setIsModalOpen(false)} user={user} />
      )}
    </div>
  );
};

export default Community;
