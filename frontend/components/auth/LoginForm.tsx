"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import RoleToggle from "@/components/auth/RoleToggle";
import PasswordInput from "@/components/auth/PasswordInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormData,
} from "@/lib/validations/login.schema";
import { authService } from "@/services/auth.service";

const roles = ["Student", "Alumni", "Admin"] as const;

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "Student",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setApiError("");

      const response = await authService.login(data);

      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...response.data,
          role: data.role,
        })
      );

      switch (data.role) {
        case "Student":
          router.push("/student/dashboard");
          break;

        case "Alumni":
          router.push("/alumni/dashboard");
          break;

        case "Admin":
          router.push("/admin/dashboard");
          break;
      }
    } catch (error: any) {
      setApiError(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* Role Toggle */}
      <RoleToggle
        roles={roles}
        selectedRole={selectedRole}
        onChange={(role) => setValue("role", role)}
      />

      {/* API Error */}
      {apiError && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {apiError}
        </p>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-foreground"
        >
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="h-11"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <PasswordInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        registration={register("password")}
        error={errors.password?.message}
      />

      {/* Remember me + Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <label
            htmlFor="remember"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Remember me
          </label>
        </div>
        <button
          type="button"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Forgot Password?
        </button>
      </div>

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      {/* OR Divider */}
      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Create Account */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary transition-colors hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>

    </form>
  );
}