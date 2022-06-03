import { Request } from "express";
import { ErrorHTTP } from "../errors";
import { cartRepository, userRepository } from "../repositories";

class cartService {
  buyDvdService = async ({ body, dvd, decoded }: Request) => {
    try {
      const user = await userRepository.findOneBy({ id: decoded.id });

      if (body.quantity > dvd.stock.quantity) {
        throw new ErrorHTTP(
          422,
          `current stock: ${dvd.stock.quantity}, received demand ${body.quantity}`
        );
      }

      const cart = {
        paid: body.paid,
        total: body.quantity * dvd.stock.price,
        user: user,
        dvd: dvd,
      };

      await cartRepository.save(cart);

      delete cart.user["password"];

      return cart;
    } catch (err: any) {
      if (err instanceof Error) {
        throw new ErrorHTTP(409, "Dvd alrealdy exists in cart.");
      }
    }
  };

  payDvdService = async ({ decoded }: Request) => {
    const user = await userRepository.findOneBy({ id: decoded.id });

    const cart = await cartRepository.findOneBy({ id: user.cart.id });

    await cartRepository.update(cart.id, { paid: true });

    return { ...cart, ...{ paid: true } };
  };
}

export default new cartService();
