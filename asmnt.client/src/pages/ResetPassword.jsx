import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../axios";
import { useToast } from "../context/ToastContext";

export default function ResetPassword() {
  const toast = useToast();
  const [params] = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: Yup.object({
      password: Yup.string().min(6).required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await api.post("/auth/reset-password", {
          email,
          token,
          newPassword: values.password,
        });
        toast.success("Password reset successful");
      } catch (err) {
        toast.error("Failed to reset password");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-4">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            className="input input-bordered w-full mb-2"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input input-bordered w-full mb-2"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          <button type="submit" className="btn btn-primary w-full">
            {formik.isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
