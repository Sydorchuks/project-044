import { describe, expect, it } from "vitest";

import { userFormSchema } from "./user-form-schema";

const validValues = {
  firstName: "Олег",
  lastName: "Сидорчук",
  phone: "+380501112233",
  email: "user@example.com",
  domainUrl: "ficus2026",
  description: "Опис",
};

describe("userFormSchema", () => {
  it("accepts valid values and trims strings", () => {
    const result = userFormSchema.parse({
      ...validValues,
      firstName: "  Олег  ",
      email: "  user@example.com  ",
      description: "  Опис  ",
    });

    expect(result.firstName).toBe("Олег");
    expect(result.email).toBe("user@example.com");
    expect(result.description).toBe("Опис");
  });

  it.each(["firstName", "lastName", "phone", "email", "domainUrl"] as const)(
    "rejects an empty %s",
    (field) => {
      const result = userFormSchema.safeParse({
        ...validValues,
        [field]: "   ",
      });

      expect(result.success).toBe(false);
    },
  );

  it.each([
    "+38050111223",
    "+3805011122334",
    "380501112233",
    "+38 (050) 111-22-33",
    "+380abcdefghg",
  ])("rejects invalid phone %s", (phone) => {
    const result = userFormSchema.safeParse({
      ...validValues,
      phone,
    });

    expect(result.success).toBe(false);
  });

  it.each(["user", "user@", "@example.com", "user@example"])(
    "rejects invalid email %s",
    (email) => {
      const result = userFormSchema.safeParse({
        ...validValues,
        email,
      });

      expect(result.success).toBe(false);
    },
  );

  it.each(["Ficus", "ficus-app", "ficus_app", "ficus app", "фікус"])(
    "rejects invalid company slug %s",
    (domainUrl) => {
      const result = userFormSchema.safeParse({
        ...validValues,
        domainUrl,
      });

      expect(result.success).toBe(false);
    },
  );

  it("allows an empty description", () => {
    const result = userFormSchema.safeParse({
      ...validValues,
      description: "",
    });

    expect(result.success).toBe(true);
  });
});
