import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Mic,
  Image,
  Paperclip,
  MessageSquare,
  Globe2,
  Sparkles,
  ArrowUp,
} from "lucide-react";

interface ChatInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  selectedModel?: string;
  onModelChange?: (model: string) => void;
}

export function ChatInputBar({
  value,
  onChange,
  onSend,
  disabled = false,
  selectedModel = "auto",
  onModelChange
}: ChatInputBarProps) {
  const { t } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) {
        onSend();
      }
    }
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    // Add voice recording functionality here
    console.log('Mic clicked - Voice recording not implemented yet');
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      // Add file upload functionality here
    }
  };

  const handleAttachmentClick = () => {
    console.log('Attachment clicked - File attachment not implemented yet');
  };

  const handleCreateArtifact = () => {
    console.log('Create artifact clicked');
    onChange(value + "\n\nPlease create an artifact for this request.");
  };

  const handleModelToggle = () => {
    if (onModelChange) {
      const newModel = selectedModel === "auto" ? "manual" : "auto";
      onModelChange(newModel);
    }
  };

  const handleGlobalSettingsClick = () => {
    console.log('Global settings clicked');
  };

  return (
    <section className="flex w-full flex-col gap-1 pb-2.5 pt-3">
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCreateArtifact}
          className="h-7 rounded-full bg-white px-3 text-[11px] font-medium text-gray-600 shadow-sm hover:bg-gray-50 dark:bg-black dark:text-gray-100 dark:hover:bg-gray-900"
        >
          <Sparkles className="mr-1 h-3.5 w-3.5 text-purple-500" />
          {t("chatPage.createArtifact", "Create Artifact")}
        </Button>
      </div>

      <Card className="rounded-2xl border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-black">
        <CardContent className="px-2.5 pt-2 pb-1.5">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("chatPage.startMessage", "Start typing your message...")}
            className="min-h-[44px] resize-none border-0 bg-transparent p-0 text-sm text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 dark:text-gray-100 dark:placeholder:text-gray-500"
            disabled={disabled}
          />

          <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <button
                onClick={handleMicClick}
                disabled={disabled}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700 ${
                  isRecording ? 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-800'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <Mic className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleImageClick}
                disabled={disabled}
                className={`flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 ${
                  disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <Image className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleAttachmentClick}
                disabled={disabled}
                className={`flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 ${
                  disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <Paperclip className="h-3.5 w-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleModelToggle}
                className="flex items-center gap-1 text-xs cursor-pointer hover:opacity-80"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[10px] font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-100">
                  {selectedModel === "auto" ? "A" : "M"}
                </span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400">
                  {selectedModel === "auto" ? t("chatPage.auto", "Auto") : t("chatPage.manual", "Manual")}
                </span>
              </button>
              <div className="flex items-center gap-1 text-xs">
                <MessageSquare className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                <span>8</span>
              </div>
              <button
                onClick={handleGlobalSettingsClick}
                className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-[10px] text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                <Globe2 className="h-3 w-3" />
                <span>{t("chatPage.global", "Global")}</span>
              </button>
              <Button
                onClick={onSend}
                disabled={disabled || !value.trim()}
                className={`flex h-7 w-7 items-center justify-center rounded-full p-0 ${
                  disabled || !value.trim()
                    ? 'bg-gray-300 cursor-not-allowed dark:bg-gray-700'
                    : 'bg-[#6467F2] hover:bg-indigo-600 dark:bg-[#6366F1] dark:hover:bg-indigo-500'
                }`}
              >
                <ArrowUp className="h-3.5 w-3.5 text-white" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}