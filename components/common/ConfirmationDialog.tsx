"use client";

import React from "react";
import { X, AlertCircle, CheckCircle, Info, AlertTriangle, Eye, EyeOff, User, Lock } from "lucide-react";

export type ConfirmationDialogType = "info" | "success" | "warning" | "danger";

interface ConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    type?: ConfirmationDialogType;
    isLoading?: boolean;
    // Password verification props
    requirePassword?: boolean;
    username?: string;
    expectedPassword?: string;
    onPasswordValidation?: (password: string) => boolean | Promise<boolean>;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "info",
    isLoading = false,
    requirePassword = false,
    username = "",
    expectedPassword = "",
    onPasswordValidation,
}) => {
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState("");

    // Reset password when dialog opens/closes
    React.useEffect(() => {
        if (!isOpen) {
            setPassword("");
            setPasswordError("");
            setShowPassword(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case "success":
                return {
                    icon: CheckCircle,
                    iconColor: "text-green-600",
                    iconBg: "bg-green-100",
                    confirmBg: "bg-green-600 hover:bg-green-700",
                };
            case "warning":
                return {
                    icon: AlertTriangle,
                    iconColor: "text-yellow-600",
                    iconBg: "bg-yellow-100",
                    confirmBg: "bg-yellow-600 hover:bg-yellow-700",
                };
            case "danger":
                return {
                    icon: AlertCircle,
                    iconColor: "text-red-600",
                    iconBg: "bg-red-100",
                    confirmBg: "bg-red-600 hover:bg-red-700",
                };
            default:
                return {
                    icon: Info,
                    iconColor: "text-blue-600",
                    iconBg: "bg-blue-100",
                    confirmBg: "bg-blue-600 hover:bg-blue-700",
                };
        }
    };

    const typeStyles = getTypeStyles();
    const Icon = typeStyles.icon;

    const handleConfirm = async () => {
        if (requirePassword) {
            // Validate password
            let isValid = false;

            if (onPasswordValidation) {
                // Use custom validation function
                isValid = await onPasswordValidation(password);
            } else if (expectedPassword) {
                // Use simple string comparison
                isValid = password === expectedPassword;
            }

            if (!isValid) {
                setPasswordError("Incorrect password. Please try again.");
                return;
            }
        }

        // Clear error and proceed
        setPasswordError("");
        onConfirm();
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (passwordError) {
            setPasswordError("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !isLoading) {
            handleConfirm();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative px-6 pt-6 pb-4">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        disabled={isLoading}
                    >
                        <X size={20} className="text-gray-500" />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${typeStyles.iconBg} flex-shrink-0`}>
                            <Icon size={24} className={typeStyles.iconColor} />
                        </div>
                        <div className="flex-1 pt-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                            <p className="text-gray-600 leading-relaxed">{message}</p>
                        </div>
                    </div>
                </div>

                {/* Password Verification Section */}
                {requirePassword && (
                    <div className="px-6 pb-4">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                            <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                                <Lock size={16} className="text-blue-600" />
                                Please verify your identity to continue
                            </p>

                            {/* Username (Read-only) */}
                            {username && (
                                <div className="mb-3">
                                    <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                            <User size={18} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            value={username}
                                            readOnly
                                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password Input */}
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                        <Lock size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Enter your password"
                                        disabled={isLoading}
                                        className={`w-full pl-10 pr-12 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${passwordError
                                                ? "border-red-300 focus:ring-red-200 bg-red-50"
                                                : "border-gray-300 focus:ring-blue-200 bg-white"
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} className="text-gray-500" />
                                        ) : (
                                            <Eye size={18} className="text-gray-500" />
                                        )}
                                    </button>
                                </div>
                                {passwordError && (
                                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 animate-in slide-in-from-top-1">
                                        <AlertCircle size={12} />
                                        {passwordError}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="px-6 pb-6 pt-2 flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isLoading || (requirePassword && !password)}
                        className={`px-5 py-2.5 rounded-lg font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${typeStyles.confirmBg} shadow-lg hover:shadow-xl`}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="animate-spin h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
