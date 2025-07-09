
import crypto from "crypto";

export interface ResetTokenResult {
  resetToken: string;
  resetTokenHash: string;
  resetTokenExpires: Date;
}

export function generateResetToken(): ResetTokenResult {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  return {
    resetToken,
    resetTokenHash,
    resetTokenExpires,
  };
}
