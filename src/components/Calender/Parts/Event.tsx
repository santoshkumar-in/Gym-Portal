import cn from "classnames";
import { isPastDay } from "@/helpers";

interface EventType {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
}

interface EventProps {
  event: EventType;
  onClick: (event: EventType) => void;
}

const Event: React.FC<EventProps> = ({ event, onClick }) => {
  const isPast = isPastDay(event.date);

  return (
    <div
      onClick={(e) => {
        if (isPast) return;
        e.stopPropagation();
        onClick(event);
      }}
      className={cn(
        "mb-1 truncate rounded bg-blue-100 px-2 py-1 text-sm text-blue-800 hover:bg-blue-200",
        { "cursor-pointer": !isPast, "cursor-not-allowed": isPast },
      )}
    >
      {event.startTime} - {event.title}
    </div>
  );
};

export default Event;
