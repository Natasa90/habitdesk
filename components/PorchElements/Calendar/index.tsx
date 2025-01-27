import { FC, useState } from "react";
import { PorchCalendarProps } from "@/Types/PorchTypes";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";

export const UserCalendar: FC<PorchCalendarProps> = ({ learningDates }) => {
 const [selectedMonth, setSelectedMonth] = useState<number>(
  new Date().getMonth()
 );
 const [selectedYear, setSelectedYear] = useState<number>(
  new Date().getFullYear()
 );

 const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
 ];

 const getMarkedDates = () => {
  const markedDates: { [key: string]: { marked: boolean; dotColor?: string } } =
   {};
  learningDates.forEach((ld) => {
   const [year, month, day] = ld.date.split("-").map(Number);
   if (year === selectedYear && month === selectedMonth) {
    markedDates[ld.date] = {
     marked: true,
     dotColor: ld.count === 1 ? "green" : "blue",
    };
   }
  });

  return markedDates;
 };

 return (
    <View className="bg-gray-50 rounded-lg shadow-lg">
      {/* Calendar Section */}
      <Calendar
        monthFormat={"MMMM yyyy"}
        onMonthChange={(month) => {
          setSelectedMonth(month.month);
          setSelectedYear(month.year);
        }}
        markedDates={getMarkedDates()}
        theme={{
          selectedDayBackgroundColor: "#3498db",
          todayTextColor: "#e74c3c",
          arrowColor: "#3498db",
          textMonthFontWeight: "bold",
        }}
        className="rounded-lg shadow-md"
      />
    </View>
  );
};