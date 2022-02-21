import { useNavigate } from "react-router-dom";

function requireAuth() {
  const navigate = useNavigate();
  fetch("/api/admin/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return;
      } else {
        navigate("/");
      }
    })
    .catch(() => {
      navigate("/");
    });
}

export default requireAuth;
