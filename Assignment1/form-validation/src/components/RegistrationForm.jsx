import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhar: ""
  });



  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const countries = {
    India: ["Mumbai", "Delhi", "Bangalore"],
    USA: ["New York", "Los Angeles", "Chicago"]
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const phoneRegex = /^\+\d{2}\s\d{10}$/;
    const aadharRegex = /^\d{4}\s\d{4}\s\d{4}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;


    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password is required";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Phone must be in format +XX XXXXXXXXXX";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!panRegex.test(formData.pan)) newErrors.pan = "Invalid PAN number";
    if (!aadharRegex.test(formData.aadhar)) newErrors.aadhar = "Invalid Aadhar number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: formData });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Reset button
  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      country: "",
      city: "",
      pan: "",
      aadhar: ""
    });
    setErrors({});
    setShowPassword(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem", maxWidth: "500px", margin: "auto" }}>
      <h2>Registration Form</h2>

      {[
        { label: "First Name", name: "firstName", placeholder: "John" },
        { label: "Last Name", name: "lastName", placeholder: "Doe" },
        { label: "Username", name: "username", placeholder: "john112" },
        { label: "Email", name: "email", type: "email", placeholder: "john112@gmail.com" },
        { label: "Phone No.", name: "phone", placeholder: "+91 9876543210" },
        { label: "PAN No.", name: "pan", placeholder: "ABCDE1234f" },
        { label: "Aadhar No.", name: "aadhar", placeholder: "Enter 12 digit number (123456788765)" }
      ].map(({ label, name, type = "text", placeholder }) => (
        <div key={name} style={{ marginBottom: "1rem" }}>
          <label>{label}</label><br />
          <input
            type={type}
            name={name}
            placeholder={placeholder || ""}
            value={formData[name]}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          {errors[name] && <div style={{ color: "red", fontSize: "0.8rem" }}>{errors[name]}</div>}
        </div>
      ))}

      <div style={{ marginBottom: "1rem" }}>
        <label>Password</label><br />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{ marginTop: "4px", fontSize: "0.8rem" }}
        >
          {showPassword ? "Hide" : "Show"} Password
        </button>
        {errors.password && <div style={{ color: "red", fontSize: "0.8rem" }}>{errors.password}</div>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Country</label><br />
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="">Select Country</option>
          {Object.keys(countries).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        {errors.country && <div style={{ color: "red", fontSize: "0.8rem" }}>{errors.country}</div>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>City</label><br />
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="">Select City</option>
          {countries[formData.country]?.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <div style={{ color: "red", fontSize: "0.8rem" }}>{errors.city}</div>}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="submit"
          disabled={Object.keys(errors).length > 0}
          style={{
            backgroundColor: "#007BFF",
            color: "white",
            padding: "10px",
            width: "100%",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>

        <button
          type="button"
          onClick={handleReset}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            padding: "10px",
            width: "100%",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Reset
        </button>
      </div>

    </form>
  );
}
