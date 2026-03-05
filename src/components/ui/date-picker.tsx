import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface DatePickerProps {
  date?: Date;
  onSelect?: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DatePicker({
  date,
  onSelect,
  placeholder,
}: DatePickerProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    date,
  );
  const [viewMonth, setViewMonth] = React.useState(selectedDate || new Date());

  const handleDateSelect = (day: Date) => {
    setSelectedDate(day);
    onSelect?.(day);
    setIsOpen(false);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1));
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-3 py-1.5 text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700",
            !selectedDate && "text-gray-400 dark:text-gray-500",
          )}
        >
          <CalendarIcon className="h-3 w-3 text-gray-400 dark:text-gray-500" />
          {selectedDate
            ? format(selectedDate, "MM/dd/yyyy hh:mm a")
            : placeholder || t("datePicker.pickDate")}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="z-50 w-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-0 shadow-lg"
          sideOffset={5}
        >
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={handlePreviousMonth}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-700 dark:text-gray-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {format(viewMonth, "MMMM yyyy")}
              </div>
              <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-700 dark:text-gray-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {[
                t("datePicker.weekdays.sun"),
                t("datePicker.weekdays.mon"),
                t("datePicker.weekdays.tue"),
                t("datePicker.weekdays.wed"),
                t("datePicker.weekdays.thu"),
                t("datePicker.weekdays.fri"),
                t("datePicker.weekdays.sat")
              ].map((day) => (
                <div
                  key={day}
                  className="p-1 font-medium text-gray-500 dark:text-gray-400"
                >
                  {day}
                </div>
              ))}
              {getDaysInMonth(viewMonth).map((day, index) => (
                <div key={index} className="p-1">
                  {day ? (
                    <button
                      onClick={() => handleDateSelect(day)}
                      className={cn(
                        "w-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-sm text-gray-900 dark:text-gray-100",
                        selectedDate &&
                          day.toDateString() === selectedDate.toDateString() &&
                          "bg-gray-900 dark:bg-blue-600 text-white hover:bg-gray-800 dark:hover:bg-blue-700",
                      )}
                    >
                      {day.getDate()}
                    </button>
                  ) : (
                    <div className="w-full p-1"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 border-t border-gray-200 dark:border-gray-700 pt-2">
              <div className="flex items-center gap-2 text-xs">
                <input
                  type="time"
                  defaultValue={
                    selectedDate ? format(selectedDate, "HH:mm") : "12:00"
                  }
                  onChange={(e) => {
                    if (selectedDate) {
                      const [hours, minutes] = e.target.value.split(":");
                      const newDate = new Date(selectedDate);
                      newDate.setHours(parseInt(hours), parseInt(minutes));
                      setSelectedDate(newDate);
                    }
                  }}
                  className="px-2 py-1 border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-black text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={() => {
                    const now = new Date();
                    handleDateSelect(now);
                  }}
                  className="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  {t("datePicker.now")}
                </button>
              </div>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
