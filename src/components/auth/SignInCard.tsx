import { useState, type FormEvent } from "react";
import { FiGithub, FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type SignInCardProps = {
  onClose: () => void;
  onSignedIn: () => void;
  onSwitchToSignUp: () => void;
};

export function SignInCard({ onClose, onSignedIn, onSwitchToSignUp }: SignInCardProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSignedIn();
    onClose();
  };

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.22)]">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
      >
        <FiX className="h-5 w-5" />
      </button>

      <div className="px-8 pt-8 pb-6">
        <h2 className="text-center text-[20px] font-semibold">
          Sign in to OpenRouter
        </h2>
        <p className="mt-1 text-center text-[13px] text-gray-500">
          Welcome back! Please sign in to continue
        </p>

        {/* Social buttons */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white text-[13px] text-gray-700 hover:bg-gray-50">
            <FiGithub className="h-4 w-4" />
          </button>
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white text-[13px] text-gray-700 hover:bg-gray-50">
            <FcGoogle className="h-4 w-4" />
          </button>
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white text-[13px] text-gray-700 hover:bg-gray-50">
            <span className="text-base">🦊</span>
          </button>
        </div>

        {/* Or divider */}
        <div className="mt-6 flex items-center gap-3 text-[11px] text-gray-400">
          <div className="h-px flex-1 bg-gray-200" />
          <span>or</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-700">
              Email address
            </label>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg border border-gray-200 bg-[#F9FAFB] text-[13px] placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#6366F1]"
            />
          </div>

          <Button
            type="submit"
            className="mt-1.5 h-11 w-full rounded-full bg-[#4F46E5] text-[14px] font-medium hover:bg-[#4338CA]"
          >
            Continue
            <span className="ml-2 text-[15px] leading-none">▸</span>
          </Button>
        </form>

        <button
          type="button"
          className="mt-3 w-full text-center text-[12px] font-medium text-[#6366F1] hover:underline"
        >
          Use passkey instead
        </button>
      </div>

      <div className="border-t border-gray-200 px-8 py-4 text-center text-[13px] text-gray-500">
        Don't have an account?{" "}
        <button
          type="button"
          className="font-medium text-[#6366F1] hover:underline"
          onClick={onSwitchToSignUp}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}