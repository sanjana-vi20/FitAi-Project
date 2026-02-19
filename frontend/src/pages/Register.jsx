import React, { useState } from "react";
import { Dumbbell, Mail, Lock, User, ArrowRight } from "lucide-react";
import api from '../config/API';
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword:"",
    role: "user",
  });

  const [isLoading , setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
   setFormData({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  setValidationError({});
  };

  const validate = () => {
    let Errors = {};

    if (formData.fullName.length < 3) {
      Errors.fullName = "Name should be More Than 3 Characters";
    } else {
      if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
        Errors.fullName = "Only Contain A-Z , a-z and space";
      }
    }

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co.in)$/.test(
        formData.email,
      )
    ) {
      Errors.email = "Use Proper Email Format";
    }
    setValidationError(Errors);

    return Object.keys(Errors).length > 0 ? false : true;
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      toast.error("Fill the Form Correctly");
      return;
    }

    if(formData.password !== formData.confirmPassword)
    {
        toast.error("Confirm password is not same");
        return;
    }

    try {
      // console.log(formData);
      const res = await api.post("/auth/register", formData);
      toast.success(res?.data?.message);
      handleClear();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgMain flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-bgCard rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-800">
        {/* Left Side: Branding & Info */}
        <div className="md:w-1/2 bg-grad-brand p-10 flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Dumbbell size={32} className="text-white" />
              <span className="text-3xl font-bold tracking-tighter">FitAI</span>
            </div>
            <h1 className="text-4xl font-extrabold mb-4 leading-tight">
              Start Your <br />
              <span className="text-blue-200 text-5xl">Adaptive</span> <br />
              Fitness Journey.
            </h1>
            <p className="text-blue-100 text-lg">
              Join 5,000+ users who are transforming their lives with AI-driven
              habit tracking.
            </p>
          </div>

          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <p className="text-sm italic opacity-90">
                "The progressive overload engine adjusted my weights perfectly.
                I've gained 3kg of muscle in 2 months!"
              </p>
              <p className="text-xs mt-2 font-bold">— Rahul S., FitAI User</p>
            </div>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-textMain">Create Account</h2>
            <p className="text-textMuted text-sm">
              Join the future of fitness intelligence.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  className="w-full bg-bgMain border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-textMain focus:outline-none focus:border-brand transition-colors"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  name="fullName"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  className="w-full bg-bgMain border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-textMain focus:outline-none focus:border-brand transition-colors"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  className="w-full bg-bgMain border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-textMain focus:outline-none focus:border-brand transition-colors"
                  placeholder="••••••••"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  
                />
              </div>
            </div>

             <div>
              <label className="block text-xs font-semibold text-textMuted uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  className="w-full bg-bgMain border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-textMain focus:outline-none focus:border-brand transition-colors"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-brand hover:bg-blue-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Create My Plan <ArrowRight size={20} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-textMuted">
            Already have an account?{" "}
            <a href="/login" className="text-brand font-bold hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
