import { useState, type FormEvent } from "react";
import { FiGithub, FiX } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_BASE_URL } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export type SignInCardProps = {
  onClose: () => void;
  onSignedIn: (token?: string | null) => void;
  onSwitchToSignUp: () => void;
};

export function SignInCard({ onClose, onSignedIn, onSwitchToSignUp }: SignInCardProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password: normalizedPassword,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          typeof data?.msg === "string" && data.msg.trim()
            ? data.msg
            : "Unable to sign in. Please check your credentials.";
        setErrorMessage(message);
        return;
      }

      const token =
        typeof data?.token === "string" && data.token.trim() ? data.token : null;

      if (!token) {
        setErrorMessage("Authentication token was not returned by the server.");
        return;
      }

      onSignedIn(token);
      onClose();
    } catch (error) {
      console.error("Sign-in request failed:", error);
      setErrorMessage("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.22)]">
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label={t("common.closeButton")}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
      >
        <FiX className="h-5 w-5" />
      </button>

      <div className="px-8 pt-8 pb-6">
        <h2 className="text-center text-[20px] font-semibold">
          {t("signIn.title")}
        </h2>
        <p className="mt-1 text-center text-[13px] text-gray-500">
          {t("signIn.subtitle")}
        </p>

        {/* Social buttons */}
        <div className="mt-6 grid grid-cols-3 gap-3">
        	<button
        		className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white text-[13px] text-gray-700 hover:bg-gray-50"
        		onClick={() => window.location.href = '/api/auth/social/github'}
        	>
        		<FiGithub className="h-4 w-4" />
        	</button>
        	<button
        		className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white text-[13px] text-gray-700 hover:bg-gray-50"
        		onClick={() => window.location.href = '/api/auth/social/google'}
        	>
        		<FcGoogle className="h-4 w-4" />
        	</button>
        	<button className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white text-[13px] text-gray-700 hover:bg-gray-50">
        		<span className="text-base">🦊</span>
        	</button>
        </div>

        {/* Or divider */}
        <div className="mt-6 flex items-center gap-3 text-[11px] text-gray-400">
          <div className="h-px flex-1 bg-gray-200" />
          <span>{t("common.or")}</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-700">
              {t("signIn.emailLabel")}
            </label>
            <Input
              type="email"
              placeholder={t("signIn.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-lg border border-gray-200 bg-[#F9FAFB] text-[13px] placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#6366F1]"
              autoComplete="email"
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-lg border border-gray-200 bg-[#F9FAFB] text-[13px] placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-[#6366F1]"
              autoComplete="current-password"
              disabled={isSubmitting}
            />
          </div>

          {errorMessage ? (
            <p className="text-[12px] font-medium text-red-500">{errorMessage}</p>
          ) : null}

          <Button
            type="submit"
            className="mt-1.5 h-11 w-full rounded-full bg-[#4F46E5] text-[14px] font-medium hover:bg-[#4338CA] disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : t("common.continue")}
            <span className="ml-2 text-[15px] leading-none">▸</span>
          </Button>
        </form>

        <button
          type="button"
          className="mt-3 w-full text-center text-[12px] font-medium text-[#6366F1] hover:underline"
        >
          {t("signIn.usePasskey")}
        </button>
      </div>

      <div className="border-t border-gray-200 px-8 py-4 text-center text-[13px] text-gray-500">
        {t("signIn.dontHaveAccount")}{" "}
        <button
          type="button"
          className="font-medium text-[#6366F1] hover:underline"
          onClick={onSwitchToSignUp}
        >
          {t("signIn.signUpLink")}
        </button>
      </div>
    </div>
  );
}