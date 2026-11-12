
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const getDashboard = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {

                const response = await fetch(
                    "http://localhost:3000/api/auth/dashboard",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {

                    setUser(data.user);

                } else {

                    localStorage.removeItem("token");
                    navigate("/login");

                }

            } catch (error) {

                alert("Unable to connect to server");

            }

        };

        getDashboard();

    }, [navigate]);


    const handleLogout = () => {

        localStorage.removeItem("token");

        alert("Logged out successfully");

        navigate("/login");

    };


    if (!user) {
        return <h2>Loading...</h2>;
    }


    return (

        <div className="container">

            <h2>Dashboard</h2>

            <h3>Welcome, {user.username}!</h3>

            <p>Email: {user.email}</p>

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>

    );

}

export default Dashboard;
