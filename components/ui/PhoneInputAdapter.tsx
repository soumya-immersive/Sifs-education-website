import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneInputAdapterProps {
  name: string;
  value: string;
  onChange: (e: any) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

export default function PhoneInputAdapter({
  name,
  value,
  onChange,
  className,
  placeholder,
  required,
}: PhoneInputAdapterProps) {
  return (
    <div className="relative w-full">
      <style>
        {`
                    .react-tel-input .form-control {
                        height: auto !important;
                        line-height: inherit !important;
                        border-radius: 8px !important;
                    }
                    .react-tel-input .flag-dropdown {
                        border: none !important;
                        background: transparent !important;
                    }
                `}
      </style>
      <PhoneInput
        country={"in"}
        value={value}
        onChange={(phone) => {
          const prefixedPhone = phone.startsWith("+") ? phone : "+" + phone;
          onChange({ target: { name, value: prefixedPhone, type: "tel" } });
        }}
        inputClass={`${className || ""} !h-auto !w-full`}
        containerClass="w-full relative"
        placeholder={placeholder}
        inputProps={{
          name,
          required,
        }}
        buttonClass="!border-0 !bg-transparent !absolute !left-0 !top-0 !bottom-0 !pl-2 hover:!bg-transparent focus:!bg-transparent"
        dropdownStyle={{ width: "300px" }}
      />
    </div>
  );
}
