/* eslint-disable no-unused-vars */
import * as React from 'react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DatePickerProps {
    onDateChange?: (date: Date | undefined) => void
    initialDate?: Date
    placeholderText?: string
}

export const DatePicker: React.FC<DatePickerProps> = ({ onDateChange, initialDate, placeholderText = 'Chọn ngày' }) => {
    const [date, setDate] = React.useState<Date | undefined>(initialDate)

    React.useEffect(() => {
        if (onDateChange) {
            onDateChange(date)
        }
    }, [date, onDateChange])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'h-[48px] w-[280px] justify-start gap-2 text-left font-normal',
                        !date && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, 'dd/MM/yyyy', { locale: vi }) : <span>{placeholderText}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
        </Popover>
    )
}
