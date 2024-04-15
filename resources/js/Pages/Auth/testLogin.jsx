import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { useState } from "react";

const Login = () => {
  const { errors } = usePage().props;
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm({
      ...form,
      [id]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Inertia.post('/login', form);
  };

  return (
    <div className="max-w-7x1 mx-auto">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-12">
        <div>
          {/* Your form fields go here */}
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={form.email} onChange={handleChange} />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={form.password} onChange={handleChange} />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
