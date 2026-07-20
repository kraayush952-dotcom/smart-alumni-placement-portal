import api from "@/lib/axios";
import type { LoginFormData } from "@/lib/validations/login.schema";
import type { RegisterFormData } from "@/lib/validations/register.schema";

export const authService = {
  async login(data: LoginFormData) {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  async register(data: RegisterFormData) {
    const response = await api.post("/auth/register", {
      role: data.role,
      full_name: data.fullName,
      registration_number: data.registrationNumber,
      email: data.email,
      mobile: data.mobile,
      department: data.department,
      batch_year: data.batchYear,
      password: data.password,
    });

    return response.data;
  },
};