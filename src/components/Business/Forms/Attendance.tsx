"use client";
import { addAttendance } from "@/actions/business";
import { BusinessAttendanceSchemaError } from "@/types/zod-errors";
import cn from "classnames";
import { useState } from "react";
import { toastSuccess, toastError } from "@/helpers/toast";


interface Props {
  businessId: string;
}
const AttendanceForm = ({ businessId }: Props) => {

  const [formErrors, setFormErrors] = useState<BusinessAttendanceSchemaError>(
    {} as BusinessAttendanceSchemaError,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData)
    setIsSubmitting(true);
    const result = await addAttendance(formData);
    console.log(result.errors)


    if (!result.success) {
      if (result.errors) {
        setFormErrors(result.errors); // Set field-level errors
      } else {
        toastError(result.errorMessage || "Something went wrong!");
        console.error(result.errorMessage);
      }
    } else {
      setFormErrors({} as BusinessAttendanceSchemaError);
      toastSuccess("Attendance added successfully!");
    }
    setIsSubmitting(false);
  };


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Add Attendance
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="businessId" value={businessId} />
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Name
              </label>
              <input
                name="fullName"
                type="text"
                placeholder="Name"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.fullName,
                    "border-red-500": formErrors.fullName,
                  },
                )}
              />
              {formErrors.fullName && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.fullName._errors[0]}
                </p>
              )}
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Mobile
              </label>
              <input
                name="mobile"
                type="number"
                placeholder="Mobile"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.mobile,
                    "border-red-500": formErrors.mobile,
                  },
                )}
              />
              {formErrors.mobile && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.mobile._errors[0]}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                In time
              </label>
              <input
                name="inTime"
                type="text"
                placeholder="In time"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.inTime,
                    "border-red-500": formErrors.inTime,
                  },
                )}
              />
              {formErrors.inTime && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.inTime._errors[0]}
                </p>
              )}
            </div>
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Out time
              </label>
              <input
                name="outTime"
                type="text"
                placeholder="Out Time"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.outTime,
                    "border-red-500": formErrors.outTime,
                  },
                )}
              />
              {formErrors.outTime && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.outTime._errors[0]}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Subscription
              </label>
              <input
                name="subscriptionId"
                type="text"
                placeholder="Subscription"
                className={cn(
                  "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
                  {
                    "border-stroke": !formErrors.subscriptionId,
                    "border-red-500": formErrors.subscriptionId,
                  },
                )}
              />
              {formErrors.subscriptionId && (
                <p className="pt-1 text-xs text-red-500">
                  {formErrors.subscriptionId._errors[0]}
                </p>
              )}
            </div>
          </div>

          <div className="flex">
            <button className="rounded bg-black px-10 py-4 text-center font-medium text-white hover:bg-opacity-90" disabled={isSubmitting}
              onClick={() => {
                setFormErrors({} as BusinessAttendanceSchemaError);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "ml-auto rounded bg-primary px-10 py-4 font-medium text-gray hover:bg-opacity-90",
                {
                  "opacity-50 cursor-not-allowed": isSubmitting,
                }
              )}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;



// "use client";
// import { addAttendance } from "@/actions/business";
// import { BusinessAttendanceSchemaError } from "@/types/zod-errors";
// import cn from "classnames";
// import { useState } from "react";

// interface Props {
//   businessId: string;
// }
// const AttendanceForm = ({ businessId }: Props) => {

//   const [formErrors, setFormErrors] = useState<BusinessAttendanceSchemaError>(
//     {} as BusinessAttendanceSchemaError,
//   );


//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     const result = await addAttendance(formData);
//     console.log(result.errors)

//     if (!result.success) {
//       if (result.errors) {
//         setFormErrors(result.errors); // Set field-level errors
//       } else {
//         console.error(result.errorMessage);
//       }
//     } else {
//       setFormErrors({} as BusinessAttendanceSchemaError);
//     }
//   };


//   return (
//     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//       <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
//         <h3 className="font-medium text-black dark:text-white">
//           Add Attendance
//         </h3>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <input type="hidden" name="businessId" value={businessId} />
//         <div className="p-6.5">
//           <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//             <div className="w-full xl:w-1/2">
//               <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                 Name
//               </label>
//               <input
//                 name="fullName"
//                 type="text"
//                 placeholder="Name"
//                 className={cn(
//                   "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
//                   {
//                     "border-stroke": !formErrors.fullName,
//                     "border-red-500": formErrors.fullName,
//                   },
//                 )}
//               />
//               {formErrors.fullName && (
//                 <p className="pt-1 text-xs text-red-500">
//                   {formErrors.fullName._errors[0]}
//                 </p>
//               )}
//             </div>
//             <div className="w-full xl:w-1/2">
//               <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                 Mobile
//               </label>
//               <input
//                 name="mobile"
//                 type="number"
//                 placeholder="Mobile"
//                 className={cn(
//                   "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
//                   {
//                     "border-stroke": !formErrors.mobile,
//                     "border-red-500": formErrors.mobile,
//                   },
//                 )}
//               />
//               {formErrors.mobile && (
//                 <p className="pt-1 text-xs text-red-500">
//                   {formErrors.mobile._errors[0]}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//             <div className="w-full xl:w-1/2">
//               <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                 In time
//               </label>
//               <input
//                 name="inTime"
//                 type="text"
//                 placeholder="In time"
//                 className={cn(
//                   "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
//                   {
//                     "border-stroke": !formErrors.inTime,
//                     "border-red-500": formErrors.inTime,
//                   },
//                 )}
//               />
//               {formErrors.inTime && (
//                 <p className="pt-1 text-xs text-red-500">
//                   {formErrors.inTime._errors[0]}
//                 </p>
//               )}
//             </div>
//             <div className="w-full xl:w-1/2">
//               <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                 Out time
//               </label>
//               <input
//                 name="outTime"
//                 type="text"
//                 placeholder="Out Time"
//                 className={cn(
//                   "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
//                   {
//                     "border-stroke": !formErrors.outTime,
//                     "border-red-500": formErrors.outTime,
//                   },
//                 )}
//               />
//               {formErrors.outTime && (
//                 <p className="pt-1 text-xs text-red-500">
//                   {formErrors.outTime._errors[0]}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//             <div className="w-full xl:w-1/2">
//               <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                 Subscription
//               </label>
//               <input
//                 name="subscriptionId"
//                 type="text"
//                 placeholder="Subscription"
//                 className={cn(
//                   "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
//                   {
//                     "border-stroke": !formErrors.subscriptionId,
//                     "border-red-500": formErrors.subscriptionId,
//                   },
//                 )}
//               />
//               {formErrors.subscriptionId && (
//                 <p className="pt-1 text-xs text-red-500">
//                   {formErrors.subscriptionId._errors[0]}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex">
//             <button className="rounded bg-black px-10 py-4 text-center font-medium text-white hover:bg-opacity-90">
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="ml-auto rounded bg-primary px-10 py-4 font-medium text-gray hover:bg-opacity-90"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AttendanceForm;









































// "use client";

// import { addAttendance } from "@/actions/business";
// import { BusinessAttendanceSchemaError } from "@/types/zod-errors";
// import cn from "classnames";
// import { useState } from "react";
// // import { toast } from "sonner";
// import { toastSuccess, toastError } from "@/helpers/toast";

// // make sure you have 'sonner' installed

// interface Props {
//   businessId: string;
// }

// const AttendanceForm = ({ businessId }: Props) => {
//   const [formErrors, setFormErrors] = useState<BusinessAttendanceSchemaError>({} as BusinessAttendanceSchemaError);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const formData = new FormData(form);

//     setIsSubmitting(true);

//     const result = await addAttendance(formData);
//     console.log(result.errors);

//     if (!result.success) {
//       if (result.errors) {
//         setFormErrors(result.errors);
//       } else {
//         toastError(result.errorMessage || "Something went wrong!");
//       }
//     } else {
//       setFormErrors({} as BusinessAttendanceSchemaError);
//       toastSuccess("Attendance added successfully!");
//       form.reset(); // Clear form after successful submit
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//       <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
//         <h3 className="font-medium text-black dark:text-white">
//           Add Attendance
//         </h3>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <input type="hidden" name="businessId" value={businessId} />
//         <div className="p-6.5">
//           {/* Name and Mobile */}
//           <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//             {/* Name */}
//             <div className="w-full xl:w-1/2">
//               <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                 Name
//               </label>
//               <input
//                 name="fullName"
//                 type="text"
//                 placeholder="Name"
//                 className={cn(
//                   "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
//                   {
//                     "border-stroke": !formErrors.fullName,
//                     "border-red-500": formErrors.fullName,
//                   }
//                 )}
//               />
//               {formErrors.fullName && (
//                 <p className="pt-1 text-xs text-red-500">
//                   {formErrors.fullName._errors[0]}
//                 </p>
//               )}
//             </div>
//             {/* Mobile */}
//             <div className="w-full xl:w-1/2">
//               <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                 Mobile
//               </label>
//               <input
//                 name="mobile"
//                 type="number"
//                 placeholder="Mobile"
//                 className={cn(
//                   "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
//                   {
//                     "border-stroke": !formErrors.mobile,
//                     "border-red-500": formErrors.mobile,
//                   }
//                 )}
//               />
//               {formErrors.mobile && (
//                 <p className="pt-1 text-xs text-red-500">
//                   {formErrors.mobile._errors[0]}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* In time and Out time */}
//           <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//             {/* In Time */}
//             <div className="w-full xl:w-1/2">
//               <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                 In time
//               </label>
//               <input
//                 name="inTime"
//                 type="text"
//                 placeholder="In time"
//                 className={cn(
//                   "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
//                   {
//                     "border-stroke": !formErrors.inTime,
//                     "border-red-500": formErrors.inTime,
//                   }
//                 )}
//               />
//               {formErrors.inTime && (
//                 <p className="pt-1 text-xs text-red-500">
//                   {formErrors.inTime._errors[0]}
//                 </p>
//               )}
//             </div>
//             {/* Out Time */}
//             <div className="w-full xl:w-1/2">
//               <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                 Out time
//               </label>
//               <input
//                 name="outTime"
//                 type="text"
//                 placeholder="Out Time"
//                 className={cn(
//                   "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
//                   {
//                     "border-stroke": !formErrors.outTime,
//                     "border-red-500": formErrors.outTime,
//                   }
//                 )}
//               />
//               {formErrors.outTime && (
//                 <p className="pt-1 text-xs text-red-500">
//                   {formErrors.outTime._errors[0]}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Subscription */}
//           <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//             <div className="w-full xl:w-1/2">
//               <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                 Subscription
//               </label>
//               <input
//                 name="subscriptionId"
//                 type="text"
//                 placeholder="Subscription"
//                 className={cn(
//                   "w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
//                   {
//                     "border-stroke": !formErrors.subscriptionId,
//                     "border-red-500": formErrors.subscriptionId,
//                   }
//                 )}
//               />
//               {formErrors.subscriptionId && (
//                 <p className="pt-1 text-xs text-red-500">
//                   {formErrors.subscriptionId._errors[0]}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex">
//             <button
//               type="button"
//               className="rounded bg-black px-10 py-4 text-center font-medium text-white hover:bg-opacity-90"
//               onClick={() => {
//                 setFormErrors({} as BusinessAttendanceSchemaError);
//               }}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={cn(
//                 "ml-auto rounded bg-primary px-10 py-4 font-medium text-gray hover:bg-opacity-90",
//                 {
//                   "opacity-50 cursor-not-allowed": isSubmitting,
//                 }
//               )}
//             >
//               {isSubmitting ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AttendanceForm;
