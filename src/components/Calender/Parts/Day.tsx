import { isToday, isPastDay } from "@/helpers";
import Event from "./Event";

interface EventType {
  id: string;
  isHoliday: boolean;
  title: string;
  startTime?: string;
  endTime?: string;
  date: Date;
}

interface DayProps {
  date: Date;
  events: EventType[];
  onEventClick: (event: EventType) => void;
  onDayClick: (date: Date, markedHoliday: EventType | null) => void;
  isHoliday: boolean;
}

const Day: React.FC<DayProps> = ({
  date,
  events,
  onEventClick,
  onDayClick,
  isHoliday,
}) => {
  const isCurrentDay = isToday(date);
  const isPast = isPastDay(date);

  const dayClassNames = `
      h-32 border p-1 overflow-y-auto relative 
      ${isPast ? "cursor-not-allowed" : "cursor-pointer"}
      ${isPast ? "bg-gray-100" : "hover:bg-gray-100"}
      ${isCurrentDay ? "border-blue-500 border-2" : ""}
      ${isHoliday ? "bg-red-100" : ""}
    `;

  return (
    <div
      className={dayClassNames}
      onClick={() => !isPast && onDayClick(date, isHoliday ? events[0] : null)}
    >
      <div className="mb-1 flex items-center justify-between">
        <span
          className={`text-sm ${isCurrentDay ? "font-bold text-blue-600" : ""}`}
        >
          {date.getDate()}
        </span>
        {!isPast && (
          <i className="fas fa-plus text-xs text-gray-400 hover:text-gray-600"></i>
        )}
        {isHoliday && (
          <span className="text-xs font-medium text-red-600">
            {events[0].title}
          </span>
        )}
      </div>
      {!isHoliday && (
        <div className="space-y-1">
          {events.map((event) => (
            <Event
              key={event.id}
              event={event}
              onClick={() => onEventClick(event)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Day;
