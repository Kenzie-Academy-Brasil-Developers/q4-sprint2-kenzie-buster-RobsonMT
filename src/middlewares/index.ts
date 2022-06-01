import validateToken from "./validateToken.middleware";
import validadeSchema from "./validateSchema.middleware";
import validateAdminAuth from "./validateAdminAuth.middleware";
import validateCreateAdminPermission from "./validateCreateAdminPermission.middleware";
import errorHandling from "./errorHandling.middleware";
import getDvdByIdOr404 from "./getDvdByIdOr44.middleware";

export {
  validateToken,
  validadeSchema,
  validateAdminAuth,
  validateCreateAdminPermission,
  errorHandling,
  getDvdByIdOr404,
};
