"use client";

import { ChevronDown } from "lucide-react";

import {
  END_TIME_OPTIONS,
  START_TIME_OPTIONS,
  WEEKDAYS,
  type Weekday,
} from "@/features/organizations/config/organization-form.config";
import type {
  OrganizationFormValues,
  WorkingDayValues,
} from "@/features/organizations/types/organization-form.types";
import { cn } from "@/lib/utils";

type OrganizationWorkingHoursProps = Readonly<{
  isOpenAllDay: boolean;
  workingHours: OrganizationFormValues["workingHours"];
  error?: string;
  onAllDayChange: (checked: boolean) => void;
  onDayChange: (day: Weekday, value: WorkingDayValues) => void;
}>;

const SELECT_CLASS_NAME =
  "h-10 w-full appearance-none rounded-2xl border border-border bg-form-control px-3 pr-9 text-[12px] leading-4 text-text-normal outline-none focus:border-primary focus:ring-3 focus:ring-primary/20 disabled:cursor-not-allowed disabled:text-text-disabled";

export function OrganizationWorkingHours({
  isOpenAllDay,
  workingHours,
  error,
  onAllDayChange,
  onDayChange,
}: OrganizationWorkingHoursProps) {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex h-8.25 items-center gap-3">
        <WorkingHoursSwitch
          checked={isOpenAllDay}
          label="Цілодобово, враховуючи вихідні дні"
          onChange={onAllDayChange}
        />

        <span className="text-[14px] leading-4 text-text-normal">
          Цілодобово, враховуючи вихідні дні
        </span>
      </div>

      {WEEKDAYS.map(({ key, label }) => {
        const day = workingHours[key];
        const disabled = isOpenAllDay || !day.enabled;

        return (
          <div key={key} className="grid h-15 grid-cols-[84px_minmax(0,1fr)_minmax(0,1fr)] gap-3.5">
            <div className="flex items-center gap-3">
              <span className="w-4 text-[14px] leading-4 text-text-normal">{label}</span>

              <WorkingHoursSwitch
                checked={isOpenAllDay || day.enabled}
                disabled={isOpenAllDay}
                label={`${label}: робочий день`}
                onChange={(checked) => onDayChange(key, { ...day, enabled: checked })}
              />
            </div>

            <TimeSelect
              label="Від"
              value={isOpenAllDay ? "0" : day.start}
              options={START_TIME_OPTIONS}
              disabled={disabled}
              onChange={(start) => onDayChange(key, { ...day, start })}
            />

            <TimeSelect
              label="До"
              value={isOpenAllDay ? "24" : day.end}
              options={END_TIME_OPTIONS}
              disabled={disabled}
              onChange={(end) => onDayChange(key, { ...day, end })}
            />
          </div>
        );
      })}

      {error ? <p className="text-[12px] leading-4 text-text-error">{error}</p> : null}
    </div>
  );
}

type WorkingHoursSwitchProps = Readonly<{
  checked: boolean;
  label: string;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}>;

function WorkingHoursSwitch({ checked, label, disabled, onChange }: WorkingHoursSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-8.25 w-14.5 shrink-0 rounded-full bg-text-subtle transition-colors outline-none focus-visible:ring-3 focus-visible:ring-primary/30 disabled:cursor-not-allowed",
        checked && "bg-organization-switch-active",
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 left-1 size-6.25 -translate-y-1/2 rounded-full bg-background shadow-organization-switch transition-transform",
          checked && "translate-x-6.25",
        )}
      />
    </button>
  );
}

type TimeSelectProps = Readonly<{
  label: string;
  value: string;
  options: readonly number[];
  disabled: boolean;
  onChange: (value: string) => void;
}>;

function TimeSelect({ label, value, options, disabled, onChange }: TimeSelectProps) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-[12px] leading-4 font-medium text-text-normal">{label}</span>

      <span className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className={SELECT_CLASS_NAME}
        >
          <option value="">Виберіть варіант</option>
          {options.map((hour) => (
            <option key={hour} value={hour}>
              {formatHour(hour)}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-text-muted"
        />
      </span>
    </label>
  );
}

function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}
