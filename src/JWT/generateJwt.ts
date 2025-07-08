export interface JwtPayload {
  id: string;
  role: "admin" | "mentor" | "mentee";
}

export const generateJwtPayload = (user: {
  id: string;
  role: "admin" | "mentor" | "mentee";
  email?: string;
}): JwtPayload => {
  return {
    id: user.id,
    role: user.role,
  };
};
