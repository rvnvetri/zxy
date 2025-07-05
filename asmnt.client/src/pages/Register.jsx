import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../axiosService";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import NProgress from "nprogress";

const Register =()=> {
  const navigate = useNavigate();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      UniversityName: "",      
      UniversityState: "",
      Role: "Student"            
    },
    validationSchema: Yup.object({
      FirstName: Yup.string().trim().required("First name is required"),
      LastName: Yup.string().trim().required("Last name is required"),
      Email: Yup.string().trim().email("Invalid email address").required("Email is required"),
      Password: Yup.string().trim().required("Password is required"),
      UniversityName: Yup.string().trim().required("University Name is required"),
      UniversityState: Yup.string().trim().required("University State is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
         NProgress.start();
        await api.post("/Auth/register", values);
         toast.success("User Registered successfully!");
        //alert("Registration successful. Please log in.");
        navigate("/login/0");
      } catch (err) 
      {
        //console.log(err);
        //alert(err.response?.data?.message)  ;
        if (err.response?.data?.message === "USER_EXISTS") 
            {
                toast.error("User already registred with this email.");
        }
        else 
        {
            toast.error("Registration failed =>" + err.response?.data[0]?.Description);
        }       
      } finally {
        //setSubmitting(false);
        NProgress.done();
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Student Register</h2>

          <form onSubmit={formik.handleSubmit}>
            <input
              name="FirstName"
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.FirstName}
            />
            {formik.touched.FirstName && formik.errors.FirstName && (
              <div className="text-red-500 text-sm mb-2">{formik.errors.FirstName}</div>
            )}

            <input
              name="LastName"
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.LastName}
            />
            {formik.touched.LastName && formik.errors.LastName && (
              <div className="text-red-500 text-sm mb-2">{formik.errors.LastName}</div>
            )}

            <input
              name="Email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Email}              
            />
            {formik.touched.Email && formik.errors.Email && (
              <div className="text-red-500 text-sm mb-2">{formik.errors.Email}</div>
            )}

            <input
              name="Password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Password}
            />
            {formik.touched.Password && formik.errors.Password && (
              <div className="text-red-500 text-sm mb-2">{formik.errors.password}</div>
            )}
            <input
              name="UniversityName"
              type="text"
              placeholder="Univerisity Name"
              className="input input-bordered w-full mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.UniversityName}
            />
            {formik.touched.UniversityName && formik.errors.UniversityName && (
              <div className="text-red-500 text-sm mb-2">{formik.errors.UniversityName}</div>
            )}

            <input
              name="UniversityState"
              type="text"
              placeholder="Univerisity State"
              className="input input-bordered w-full mb-2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.UniversityState}
            />
            {formik.touched.UniversityState && formik.errors.UniversityState && (
              <div className="text-red-500 text-sm mb-2">{formik.errors.UniversityState}</div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full mt-2"                       
            >
              {formik.isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register