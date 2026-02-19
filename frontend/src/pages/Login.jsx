import React, { useState } from "react";
import { Dumbbell, Mail, Lock, ArrowRight, Github } from "lucide-react";
import toast from "react-hot-toast";
import api from '../config/API'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const validate = () => {
    let Error = {};
    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email,
      )
    ) {
      Error.email = "Use Proper Email Format";
    }

    setValidationError(Error);

    return Object.keys(Error).length > 0 ? false : true;
  };

  const handleClear = () => {
    setFormData({
      email: "",
      password: "",
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

      if (!validate()) {
      setLoading(false);
      toast.error("Fill the Form Correctly");
      return;
    }

    try {
      const res = await api.post("/auth/login", formData);
      toast.success(res?.data?.data);
      sessionStorage.setItem("FitAIUser", JSON.stringify(res.data.data));

      handleClear()
      console.log("Login Data:", formData);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgMain flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="max-w-4xl w-full bg-bgCard rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-800 animate-fade-in">
        {/* Left Side: Branding & Welcome Message */}
        <div className="md:w-1/2 bg-grad-brand p-10 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="z-10">
            <div className="flex items-center gap-2 mb-12 animate-float">
              <Dumbbell size={32} className="text-white" />
              <span className="text-3xl font-bold tracking-tighter">FitAI</span>
            </div>
            <h1 className="text-4xl font-extrabold mb-4 leading-tight">
              Welcome <br />
              <span className="text-blue-200 text-5xl font-black">Back.</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-xs">
              Your adaptive fitness engine is ready to adjust your next session.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-textMain">Log In</h2>
            <p className="text-textMuted text-sm">
              Access your personalized training dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-textMuted uppercase mb-1 tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted group-focus-within:text-brand transition-colors">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-bgMain border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-textMain focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-textMuted uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[10px] text-brand hover:underline font-bold"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted group-focus-within:text-brand transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-bgMain border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-textMain focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-brand hover:bg-blue-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-brand/20 uppercase tracking-widest text-sm"
            >
              Sign In <ArrowRight size={18} />
            </button>

            {/* Social Login Separator */}
          </form>

          <p className="mt-8 text-center text-sm text-textMuted">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-brand font-black hover:underline tracking-tight"
            >
              Create Plan
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
