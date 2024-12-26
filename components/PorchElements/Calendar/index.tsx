import { useState, useEffect, FC } from 'react';
import { PorchCalendarProps } from '@/Types/PorchTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';

export const PorchCalendar: FC<PorchCalendarProps> = ({ learningDates }) => {
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    
    const months = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];

    const handlePrevMonth = () => {
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear((prev) => prev - 1);
        } else {
            setSelectedMonth((prev) => prev - 1);
        }
    };

    const handleNextMonth = () => {
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear((prev) => prev + 1);
        } else {
            setSelectedMonth((prev) => prev + 1);
        }
    };

    const handleMonthChange = (month: string) => {
        setSelectedMonth(months.indexOf(month));
    };

    const handleYearChange = (year: string) => {
        setSelectedYear(Number(year));
    };

    const getMarkedDates = () => {
        const markedDates: { [key: string]: { selected: boolean; selectedColor: string } } = {};
        
        learningDates.forEach((learningDate) => {
            const date = new Date(learningDate.date);
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            
            markedDates[formattedDate] = {
                selected: true,
                selectedColor: learningDate.count === 1 ? 'green' : 'white',
            };
        });

        return markedDates;
    };

    useEffect(() => {
        // You can handle any side-effects here
    }, [selectedMonth, selectedYear]);

    return (
        <View className="flex flex-col">
            {/* CALENDAR NAVIGATION */}
            <View className="flex-row items-center justify-between mb-4">
                {/* Month & Year Picker */}
                <View className="flex-col">
                    <Picker
                        selectedValue={months[selectedMonth]}
                        onValueChange={handleMonthChange}
                        style={{ fontSize: 16 }}
                    >
                        {months.map((month, index) => (
                            <Picker.Item key={index} label={month} value={month} />
                        ))}
                    </Picker>
                    <Picker
                        selectedValue={String(selectedYear)}
                        onValueChange={handleYearChange}
                        style={{ fontSize: 12 }}
                    >
                        {Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i).map((year) => (
                            <Picker.Item key={year} label={String(year)} value={String(year)} />
                        ))}
                    </Picker>
                </View>
                <View>
                    <TouchableOpacity onPress={handlePrevMonth} className="border rounded-md p-2 text-sm">
                        <Icon name="" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNextMonth} className="border rounded-md p-2 text-sm">
                        <Icon name="" size={20} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* React Native Calendar */}
            <Calendar
                current={`${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-01`}
                markedDates={getMarkedDates()}
                onMonthChange={(month) => {
                    const newMonth = new Date(month.dateString).getMonth();
                    const newYear = new Date(month.dateString).getFullYear();
                    setSelectedMonth(newMonth);
                    setSelectedYear(newYear);
                }}
                onDayPress={(day) => {
                    console.log('Selected day:', day);
                    // You can add your logic here to handle day selection
                }}
                monthFormat={'yyyy MM'}
                hideArrows={false}
                renderArrow={(direction) => {
                    if (direction === 'left') {
                        return <Icon name="" size={20} />;
                    } else {
                        return <Icon name="" size={20} />;
                    }
                }}
            />
        </View>
    );
};
