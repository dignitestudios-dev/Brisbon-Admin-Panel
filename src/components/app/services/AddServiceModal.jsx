import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { serviceSchema } from "../../../schema/authentication/dummyLoginSchema"; // Yup validation schema
import { useCreateService } from "./../../../hooks/api/Post"; // Custom hook to post data
import { initialServiceValues } from "./../../../init/authentication/dummyLoginValues";
import { SuccessToast } from "../../global/Toaster";

const AddServiceModal = ({ showModal, setShowModal }) => {
  const { createService, loading } = useCreateService();

  // Helper to convert "14:00" to "2:00 PM"
  const formatTimeTo12Hour = (time24) => {
    const [hour, minute] = time24.split(":");
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formattedValues = {
      ...values,
      startTime: formatTimeTo12Hour(values.startTime),
      endTime: formatTimeTo12Hour(values.endTime),
    };

    await createService(formattedValues, () => {
      resetForm();
      setShowModal(false);
      SuccessToast("Service created successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1500); // reload after 1.5 seconds
    });

    setSubmitting(false);
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
          <h3 className="text-lg font-semibold mb-4 ">Add New Service</h3>

          <Formik
            initialValues={initialServiceValues}
            validationSchema={serviceSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-3">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Title
                  </label>
                  <Field
                    type="text"
                    name="title"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (hours)
                  </label>
                  <Field
                    type="number"
                    name="duration"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="duration"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Duration Metric */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration Metric (hr or min)
                  </label>
                  <Field
                    as="select"
                    name="durationMetric"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  >
                    <option value="hr">Hour</option>
                    <option value="min">Minute</option>
                  </Field>
                  <ErrorMessage
                    name="durationMetric"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price per Hour
                  </label>
                  <Field
                    type="number"
                    name="price"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Start Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <Field
                    type="time"
                    name="startTime"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="startTime"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <Field
                    type="time"
                    name="endTime"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                  />
                  <ErrorMessage
                    name="endTime"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className={`px-4 py-2 bg-[#074F57] text-white rounded-md ${
                      isSubmitting || loading ? "opacity-50" : ""
                    }`}
                  >
                    {isSubmitting || loading ? "Creating..." : "Add Service"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  );
};

export default AddServiceModal;
