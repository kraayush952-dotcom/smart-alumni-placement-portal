"use client";

interface RoleToggleProps<T extends string> {
  roles: readonly T[];
  selectedRole: T;
  onChange: (role: T) => void;
  maxWidth?: string;
}

export default function RoleToggle<T extends string>({
  roles,
  selectedRole,
  onChange,
  maxWidth = "max-w-md",
}: RoleToggleProps<T>) {
  return (
    <div className={`mx-auto flex ${maxWidth} rounded-xl bg-muted p-1`}>
      {roles.map((role) => (
        <button
          key={role}
          type="button"
          onClick={() => onChange(role)}
          className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            selectedRole === role
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {role}
        </button>
      ))}
    </div>
  );
}