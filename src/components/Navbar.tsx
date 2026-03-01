import { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiGithub,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeContext";

type AuthMode = "signin" | "signup";

function SignInCard({
  onClose,
  onSignedIn,
  onSwitchToSignUp,
}: {
  onClose: () => void;
  onSignedIn: () => void;
  onSwitchToSignUp: () => void;
}) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSignedIn();
    onClose();
  };

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-[0_18px_45px_rgba(15,23,42,0.22)]">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <FiX className="h-5 w-5" />
      </button>

      <div className="px-8 pt-8 pb-6">
        <h2 className="text-center text-[20px] font-semibold dark:text-white">
          Sign in to OpenRouter
        </h2>
        <p className="mt-1 text-center text-[13px] text-gray-500 dark:text-gray-400">
          Welcome back! Please sign in to continue
        </p>

        {/* Social buttons */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[13px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <FiGithub className="h-4 w-4" />
          </button>
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[13px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <FcGoogle className="h-4 w-4" />
          </button>
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[13px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <span className="text-base">🦊</span>
          </button>
        </div>

        {/* Or divider */}
        <div className="mt-6 flex items-center gap-3 text-[11px] text-gray-400 dark:text-gray-500">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-600" />
          <span>or</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-600" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-700 dark:text-gray-200">
              Email address
            </label>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg border border-gray-200 dark:border-gray-600 bg-[#F9FAFB] dark:bg-gray-700 text-[13px] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#6366F1]"
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

      <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-4 text-center text-[13px] text-gray-500 dark:text-gray-400">
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

function SignUpCard({
  onClose,
  onSignedUp,
  onSwitchToSignIn,
}: {
  onClose: () => void;
  onSignedUp: () => void;
  onSwitchToSignIn: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || password.length < 8 || !acceptedTerms) return;
    onSignedUp();
    onClose();
  };

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-[0_18px_45px_rgba(15,23,42,0.22)]">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <FiX className="h-5 w-5" />
      </button>

      <div className="px-8 pt-8 pb-6">
        <h2 className="text-center text-[20px] font-semibold dark:text-white">
          Create your account
        </h2>
        <p className="mt-1 text-center text-[13px] text-gray-500 dark:text-gray-400">
          Welcome! Please fill in the details to get started.
        </p>

        {/* Social buttons */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[13px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <FiGithub className="h-4 w-4" />
          </button>
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[13px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <FcGoogle className="h-4 w-4" />
          </button>
          <button className="flex h-10 items-center justify-center rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[13px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <span className="text-base">🦊</span>
          </button>
        </div>

        {/* Or divider */}
        <div className="mt-6 flex items-center gap-3 text-[11px] text-gray-400 dark:text-gray-500">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-600" />
          <span>or</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-600" />
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-700 dark:text-gray-200">
              Email address
            </label>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg border border-gray-200 dark:border-gray-600 bg-[#F9FAFB] dark:bg-gray-700 text-[13px] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#6366F1]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-lg border border-gray-200 dark:border-gray-600 bg-[#F9FAFB] dark:bg-gray-700 text-[13px] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#6366F1] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FiEyeOff className="h-4 w-4" />
                ) : (
                  <FiEye className="h-4 w-4" />
                )}
              </button>
            </div>
            {password.length > 0 && password.length < 8 && (
              <div className="flex items-center gap-1.5 text-[11px] text-red-500">
                <FiAlertCircle className="h-3.5 w-3.5" />
                <span>Your password must contain 8 or more characters.</span>
              </div>
            )}
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              id="signup-terms"
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#6366F1] focus:ring-[#6366F1]"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label
              htmlFor="signup-terms"
              className="text-[12px] leading-snug text-gray-500 dark:text-gray-400"
            >
              I agree to the{" "}
              <button
                type="button"
                className="text-[#6366F1] underline-offset-2 hover:underline"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="text-[#6366F1] underline-offset-2 hover:underline"
              >
                Privacy Policy
              </button>
              .
            </label>
          </div>

          <Button
            type="submit"
            className="mt-2 h-11 w-full rounded-full bg-[#4F46E5] text-[14px] font-medium hover:bg-[#4338CA]"
          >
            Continue
            <span className="ml-2 text-[15px] leading-none">▸</span>
          </Button>
        </form>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-4 text-center text-[13px] text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          className="font-medium text-[#6366F1] hover:underline"
          onClick={onSwitchToSignIn}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  // Disable body scroll when auth dialog is open
  useEffect(() => {
    if (!authOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [authOpen]);

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const closeAuth = () => setAuthOpen(false);

  return (
    <>
      <div className="relative z-20 w-full bg-white dark:bg-black">
        <div className="flex items-center justify-between px-4 py-4 md:px-10">
          {/* Logo + Search */}
          <div className="flex flex-1 items-center gap-3 md:gap-6">
            <h1 className="text-lg font-semibold md:text-xl dark:text-white">
              OpenRouter
            </h1>

            <div className="relative w-full max-w-[200px] md:max-w-[288px]">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-gray-500 md:text-base" />
              <Input
                placeholder="Search"
                className="h-9 w-full bg-gray-100 dark:bg-black dark:text-white pl-8 text-sm md:h-10 md:pl-10 md:text-base"
              />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden items-center gap-2 text-sm text-gray-600 dark:text-gray-300 lg:flex">
            <a
              href="#"
              className="rounded-md px-3 py-2 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition-colors"
            >
              Models
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 font-medium hover:bg-gray-100 hover:text-black transition-colors"
            >
              Chat
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 font-medium hover:bg-gray-100 hover:text-black transition-colors"
            >
              Rankings
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 font-medium hover:bg-gray-100 hover:text-black transition-colors"
            >
              Enterprise
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 font-medium hover:bg-gray-100 hover:text-black transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 font-medium hover:bg-gray-100 hover:text-black transition-colors"
            >
              Docs
            </a>

            {!isSignedIn ? (
              <Button
                className="rounded-full bg-[#6467F2] px-6 hover:bg-indigo-700"
                onClick={() => openAuth("signin")}
              >
                Sign in
              </Button>
            ) : (
              <div className="relative ml-4">
                <div className="flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-2 py-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="flex items-center justify-center rounded-full px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <FiChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="flex items-center gap-1 border-l border-gray-200 dark:border-gray-700 pl-2 pr-1"
                  >
                    <img
                      src="./Meta.png"
                      alt=""
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold"
                    />
                  </button>
                </div>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black py-2 text-sm text-gray-700 dark:text-gray-200 shadow-lg">
                    <button
                      className="block w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/activity");
                      }}
                    >
                      Activity
                    </button>
                    <button
                      className="block w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/logs");
                      }}
                    >
                      Logs
                    </button>
                    <button
                      className="block w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/credits");
                      }}
                    >
                      Credits
                    </button>
                    <button
                      className="block w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/settings");
                      }}
                    >
                      Settings
                    </button>
                    <button
                      className="block w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => {
                        setIsSignedIn(false);
                        setIsProfileOpen(false);
                      }}
                    >
                      Sign Out
                    </button>
                    <div className="mt-1 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 pb-1 pt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>Theme</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => theme === "dark" && toggleTheme()}
                          className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors ${
                            theme === "light"
                              ? "border-gray-600 bg-gray-100 text-gray-900"
                              : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <FiSun className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => theme === "light" && toggleTheme()}
                          className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors ${
                            theme === "dark"
                              ? "border-gray-600 bg-gray-700 text-gray-100"
                              : "border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          <FiMoon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-2 rounded-lg bg-[#6467F2] p-2 text-white transition-colors hover:bg-indigo-700 lg:hidden"
            aria-label="Toggle menu"
          >
            <FiMenu className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex flex-col gap-2 border-t dark:border-gray-700 bg-white dark:bg-black px-4 pb-4 lg:hidden">
            <a
              href="#"
              className="rounded-md px-3 py-2 font-medium text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
            >
              Models
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 font-medium text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
            >
              Chat
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 font-medium text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
            >
              Rankings
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 font-medium text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
            >
              Enterprise
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 font-medium text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="rounded-md px-3 py-2 font-medium text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
            >
              Docs
            </a>
            {!isSignedIn && (
              <Button
                className="mt-2 rounded-full bg-[#6467F2] px-6 hover:bg-indigo-700"
                onClick={() => openAuth("signin")}
              >
                Sign in
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Auth Dialog with blurred background */}
      {authOpen && (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-16 sm:pt-24">
          {/* backdrop click to close */}
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={closeAuth}
          />

          <div className="relative z-10 flex w-full items-start justify-center">
            {authMode === "signin" ? (
              <SignInCard
                onClose={closeAuth}
                onSignedIn={() => setIsSignedIn(true)}
                onSwitchToSignUp={() => setAuthMode("signup")}
              />
            ) : (
              <SignUpCard
                onClose={closeAuth}
                onSignedUp={() => setIsSignedIn(true)}
                onSwitchToSignIn={() => setAuthMode("signin")}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
