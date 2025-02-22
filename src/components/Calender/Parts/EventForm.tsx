import { useState } from "react";
import cn from "classnames";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

interface EventType {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
}

interface EventFormProps {
  event?: EventType | null;
  onSubmit: (eventData: Omit<EventType, "id" | "date">) => void;
  onDelete: (eventId: string) => void;
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  event,
  onSubmit,
  onDelete,
  onClose,
}) => {
  const [title, setTitle] = useState<string>(event?.title || "");
  const [startTime, setStartTime] = useState<string>(
    event?.startTime || "09:00",
  );
  const [endTime, setEndTime] = useState<string>(event?.endTime || "10:00");

  const [isHoliday, setIsHoliday] = useState<boolean>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title, startTime, endTime });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="w-full">
        <label className="mb-3 block text-left text-sm font-medium text-black dark:text-white">
          Event title
        </label>
        <input
          name="eventTitle"
          type="text"
          placeholder="Enter Title"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>

      <div className="w-full">
        <label className="mb-3 block text-left text-sm font-medium text-black dark:text-white">
          Gym Holiday?
        </label>
        <SwitcherThree
          name="status"
          onChange={(e) => setIsHoliday(e.target.checked)}
        />
      </div>

      {!isHoliday && (
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-left text-sm font-medium text-black dark:text-white">
              Start Time
            </label>
            <input
              name="startTime"
              type="time"
              placeholder="Start time"
              defaultValue={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mb-3 block text-left text-sm font-medium text-black dark:text-white">
              End Time
            </label>
            <input
              name="endTime"
              type="time"
              defaultValue={endTime}
              placeholder="End time"
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
      )}
      <div
        className={cn("mt-4.5 flex w-full", {
          "justify-between": event,
          "justify-center": !event,
        })}
      >
        {event && (
          <button
            className="rounded bg-red-500 px-5 py-1 text-center font-medium text-white hover:bg-opacity-90"
            type="button"
            onClick={() => onDelete(event.id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Delete
          </button>
        )}
        <div className="flex gap-2">
          <button
            className="rounded border border-red-500 px-5 py-1 text-center font-medium text-red-500 hover:bg-opacity-90"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded bg-primary px-5 py-2 text-center font-medium text-white hover:bg-opacity-90"
            type="submit"
          >
            {event ? "Update" : "Create"} Event
          </button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
