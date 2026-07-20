"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterFormData,
} from "@/lib/validations/register.schema";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import RoleToggle from "@/components/auth/RoleToggle";
import PasswordInput from "@/components/auth/PasswordInput";
import { authService } from "@/services/auth.service";
import { useState } from "react";

const roles = ["Student", "Alumni"] as const;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      registrationNumber: "",
      email: "",
      mobile: "",
      department: "",
      batchYear: "",
      password: "",
      confirmPassword: "",
      role: "Student",
      acceptTerms: false,
    },
  });

  const selectedRole = watch("role");

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setApiError("");

      const response = await authService.register(data);

      console.log("Register Success:", response);

    } catch (error: any) {
      setApiError(
        error?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Role Toggle */}
      <RoleToggle
        roles={roles}
        selectedRole={selectedRole}
        onChange={(role) =>
          setValue("role", role as "Student" | "Alumni", {
            shouldValidate: true,
            shouldDirty: true,
          })
        }
        maxWidth="max-w-sm"
      />

      {/* Full Name Field */}
      <div className="space-y-2">
        <label htmlFor="fullName" className="text-sm font-medium text-foreground">
          Full Name
        </label>
        <Input
          id="fullName"
          type="text"
          placeholder="Enter your full name"
          className="h-11"
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
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

      {/* Registration Number */}
      <div className="space-y-2">
        <label
          htmlFor="registrationNumber"
          className="text-sm font-medium text-foreground"
        >
          Registration Number
        </label>
        <Input
          id="registrationNumber"
          type="text"
          placeholder="Enter your registration number"
          className="h-11"
          {...register("registrationNumber")}
        />
        {errors.registrationNumber && (
          <p className="text-sm text-destructive">
            {errors.registrationNumber.message}
          </p>
        )}
      </div>

      {/* Mobile Number */}
      <div className="space-y-2">
        <label
          htmlFor="mobile"
          className="text-sm font-medium text-foreground"
        >
          Mobile Number
        </label>
        <Input
          id="mobile"
          type="tel"
          placeholder="Enter your mobile number"
          className="h-11"
          {...register("mobile")}
        />
        {errors.mobile && (
          <p className="text-sm text-destructive">
            {errors.mobile.message}
          </p>
        )}
      </div>

      {/* Department */}
      <div className="space-y-2">
        <label
          htmlFor="department"
          className="text-sm font-medium text-foreground"
        >
          Department
        </label>
        <Input
          id="department"
          type="text"
          placeholder="Enter your department"
          className="h-11"
          {...register("department")}
        />
        {errors.department && (
          <p className="text-sm text-destructive">
            {errors.department.message}
          </p>
        )}
      </div>

      {/* Batch Year */}
      <div className="space-y-2">
        <label
          htmlFor="batchYear"
          className="text-sm font-medium text-foreground"
        >
          Batch Year
        </label>
        <Input
          id="batchYear"
          type="text"
          placeholder="2026"
          className="h-11"
          {...register("batchYear")}
        />
        {errors.batchYear && (
          <p className="text-sm text-destructive">
            {errors.batchYear.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Create a password"
          registration={register("password")}
          error={errors.password?.message}
        />
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>

      {/* Terms & Conditions */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id="acceptTerms"
            checked={watch("acceptTerms")}
            onCheckedChange={(checked) =>
              setValue("acceptTerms", checked === true, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
          />
          <label htmlFor="acceptTerms" className="text-sm text-muted-foreground">
            I agree to the Terms & Conditions
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-destructive">
            {errors.acceptTerms.message}
          </p>
        )}
      </div>

      {/* API Error */}
      {apiError && (
        <p className="text-center text-sm text-destructive">
          {apiError}
        </p>
      )}

      {/* Create Account Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* OR Divider */}
      <div className="mt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Already Have Account */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            className="font-semibold text-primary transition-colors hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>

    </form>
  );
}