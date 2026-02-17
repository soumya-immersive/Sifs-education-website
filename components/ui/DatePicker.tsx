"use client";

import { useState, useRef, useEffect } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
    parseISO,
    isValid,
    setMonth as setDateMonth,
    setYear as setDateYear,
    getYear,
    getMonth
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ChevronDown } from "lucide-react";

interface DatePickerProps {
    label: string;
    value: string;
    onChange: (date: string) => void;
    maxDate?: string;
    required?: boolean;
    placeholder?: string;
}

export default function DatePicker({ label, value, onChange, maxDate, required, placeholder = "Select date" }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize current month based on value
    useEffect(() => {
        if (value && isValid(parseISO(value))) {
            setCurrentMonth(parseISO(value));
        }
    }, [isOpen]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
    const handleNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));

    const handleDateClick = (date: Date) => {
        // Check if disabled
        if (maxDate && date > parseISO(maxDate)) return;

        onChange(format(date, "yyyy-MM-dd"));
        setIsOpen(false);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value);
        setCurrentMonth(prev => setDateMonth(prev, newMonth));
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value);
        setCurrentMonth(prev => setDateYear(prev, newYear));
    };

    // Generate days
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfMonth(monthStart); // Start from the first day of the month

    const startDay = startDate.getDay(); // 0 is Sunday
    const calendarStart = new Date(startDate);
    calendarStart.setDate(startDate.getDate() - startDay);

    const calendarEnd = new Date(calendarStart);
    calendarEnd.setDate(calendarStart.getDate() + 41); // 6 weeks * 7 days = 42 days total

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    // Generate Year Options
    const currentYear = new Date().getFullYear();
    const maxYear = maxDate ? getYear(parseISO(maxDate)) : currentYear + 10;
    const minYear = 1950;
    const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="relative group" ref={containerRef}>
            <label className="block text-gray-700 text-sm font-semibold mb-2 ml-1">{label} {required && <span className="text-red-500">*</span>}</label>

            <div
                className="relative cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarIcon className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                </div>
                <div className={`
                    w-full pl-10 pr-4 py-3.5 border rounded-xl outline-none transition-all flex items-center
                    ${isOpen ? 'ring-2 ring-indigo-500 border-indigo-500 bg-white' : 'border-gray-200 bg-gray-50 hover:bg-white'}
                `}>
                    {value ? (
                        <span className="text-gray-800">{format(parseISO(value), "dd MMMM yyyy")}</span>
                    ) : (
                        <span className="text-gray-400">{placeholder}</span>
                    )}
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {/* Popup */}
            {isOpen && (
                <div className="absolute z-50 mt-2 p-4 bg-white rounded-2xl shadow-xl border border-gray-100 w-[340px] animate-in fade-in zoom-in-95 duration-200 left-0">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 px-1">
                        <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-1">
                            <div className="relative group">
                                <select
                                    value={getMonth(currentMonth)}
                                    onChange={handleMonthChange}
                                    className="appearance-none bg-transparent hover:bg-gray-50 rounded-md py-1 pl-2 pr-6 font-bold text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-center"
                                >
                                    {months.map((m, i) => (
                                        <option key={m} value={i}>{m}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative group">
                                <select
                                    value={getYear(currentMonth)}
                                    onChange={handleYearChange}
                                    className="appearance-none bg-transparent hover:bg-gray-50 rounded-md py-1 pl-2 pr-4 font-bold text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                >
                                    {years.map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-gray-100 rounded-full text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Weekdays */}
                    <div className="grid grid-cols-7 mb-2 border-b border-gray-100 pb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <div key={day} className="text-xs font-bold text-gray-400 text-center uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day, idx) => {
                            const isCurrentMonth = isSameMonth(day, currentMonth);
                            const isSelected = value ? isSameDay(day, parseISO(value)) : false;
                            const isCurrentDay = isToday(day);
                            const isDisabled = maxDate ? day > parseISO(maxDate) : false;

                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => !isDisabled && handleDateClick(day)}
                                    disabled={isDisabled}
                                    className={`
                                        h-9 w-9 rounded-full flex items-center justify-center text-sm transition-all relative
                                        ${!isCurrentMonth ? 'text-gray-300' : isDisabled ? 'text-gray-200 cursor-not-allowed decoration-slice' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium'}
                                        ${isSelected ? '!bg-indigo-600 !text-white shadow-md hover:!bg-indigo-700 transform hover:scale-105' : ''}
                                        ${isCurrentDay && !isSelected ? 'ring-1 ring-indigo-600 text-indigo-600 font-bold bg-indigo-50/50' : ''}
                                    `}
                                >
                                    {format(day, 'd')}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
