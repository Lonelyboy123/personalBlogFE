import type { Route } from "./+types/login";
import { useNavigate } from "react-router";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Sign in to your account" },
  ];
}

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message =
          data?.message || data?.error || (res.status === 401 ? "Sai tài khoản hoặc mật khẩu" : "Đăng nhập thất bại");
        throw new Error(message);
      }

      const data = await res.json().catch(() => ({}));
      // Lưu token/tt người dùng nếu backend trả về
      if (data?.token) {
        localStorage.setItem("authToken", data.token);
      }
      // Điều hướng về trang chủ hoặc dashboard
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container mx-auto max-w-md py-10">
      <h1 className="text-2xl font-semibold mb-6">Đăng nhập</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        {error && (
          <div className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm">Tên đăng nhập</label>
          <input
            id="username"
            type="text"
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-950"
            placeholder="yourname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm">Mật khẩu</label>
          <input
            id="password"
            type="password"
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-950"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full h-10 rounded bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </section>
  );
}


