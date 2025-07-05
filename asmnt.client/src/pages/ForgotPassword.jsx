import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "../context/ToastContext";
import api from "../axios";

export default function ForgotPassword() {
  const toast = useToast();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await api.post("/auth/forgot-password", values);
        toast.success("Reset link sent to your email");
      } catch (err) {
        toast.error("Email not found or failed to send reset link");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-4">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            name="email"
            type="email"
            className="input input-bordered w-full mb-2"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mb-2">{formik.errors.email}</div>
          )}

          <button type="submit" className="btn btn-primary w-full">
            {formik.isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
