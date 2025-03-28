import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './AddEmployee.css';

const apiUrl = "http://localhost:5000/employees";

function AddEmployee() {
    const [form, setForm] = useState({ name: "", dob: "", gender: "", email: "", phone: "", address: "", city: "", state: "", department: "", position: "", salary: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(`${apiUrl}/${id}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Error fetching employee: ${res.status} ${res.statusText}`);
                    }
                    return res.json();
                })
                .then(data => setForm(data))
                .catch(err => {
                    console.error("Fetch Error:", err.message);
                    setError(err.message);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const method = id ? "PUT" : "POST";
        const endpoint = id ? `${apiUrl}/${id}` : apiUrl;

        try {
            console.log("Submitting data:", form); 
            const response = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Server Response: ${errorText}`);
                throw new Error(`Failed to ${id ? "update" : "add"} employee: ${errorText}`);
            }

            navigate("/");
        } catch (err) {
            console.error("Request Error:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-addemployee">
            <h2>{id ? "Edit Employee" : "Add Employee"}</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
                <input type="text" name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} required />
                <input type="text" name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
                <input type="text" name="position" placeholder="Position" value={form.position} onChange={handleChange} required />
                <input type="number" name="salary" placeholder="Salary" value={form.salary} onChange={handleChange} required />
                <button className="add-button" type="submit" disabled={loading}>
                    {loading ? "Submitting..." : id ? "Update Employee" : "Add Employee"}
                </button>
            </form>
        </div>
    );
}

export default AddEmployee;
