import prisma from "../db.ts";
import { RequestHandler } from "../types.ts";

export const getUpdates: RequestHandler = async (req, res, next) => {
  try {
    // const { products } = await prisma.user.findUnique({
    //   where: {
    //     id: req.user.id,
    //   },
    //   include: {
    //     products: {
    //       include: {
    //         updates: true,
    //       },
    //     },
    //   },
    // });
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user?.id,
      },
      include: {
        updates: true,
      },
    });

    // this is a sign you should update your schema
    // db should be doing this - not optimal to do this in memory
    const updates = products.reduce(
      (allUpdates, { updates }) => [...allUpdates, ...updates],
      []
    );

    res.json({ data: updates });
  } catch (error) {
    next(error);
  }
};

export const getOneUpdate: RequestHandler = async (req, res, next) => {
  try {
    // Should we also ensure the update ID is associated with a product
    // owned by the currently logged-in user?
    const userId = req.user.id;
    const updateId = req.params.id;
    const update = await prisma.update.findUnique({
      where: {
        id: updateId,
        product: {
          belongsToId: userId,
        },
      },
    });
    res.json({ data: update });
  } catch (error) {
    next(error);
  }
};

// TODO: separate the try-catches for the two async functions
export const updateUpdate: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updateId = req.params.id;
    // 1st: ensure the update ID is associated with a product
    // owned by the currently logged-in user.
    const products = await prisma.product.findMany({
      where: {
        belongsToId: userId,
      },
      include: {
        updates: true,
      },
    });

    // this is a sign you should update your schema
    // db should be doing this - not optimal to do this in memory
    const updates = products.reduce(
      (allUpdates, { updates }) => [...allUpdates, ...updates],
      []
    );

    const match = updates.find((update) => update.id === updateId);

    if (!match) {
      // update id does not belong to the user
      // TODO: handle error
      res.json({ message: "nope" });
      return;
    }

    // 2nd: update the update
    const updatedUpdate = await prisma.update.update({
      where: {
        id: updateId,
      },
      data: req.body,
    });

    // const userId = req.user.id;
    // const updateId = req.params.id;
    // const update = await prisma.update.update({
    //   where: {
    //     id: updateId,
    //     product: {
    //       belongsToId: userId,
    //     },
    //   },
    //   data: req.body,
    // });
    res.json({ data: updatedUpdate });
  } catch (error) {
    next(error);
  }
};

// TODO: separate the try-catches for the two async functions
export const createNewUpdate: RequestHandler = async (req, res, next) => {
  try {
    // 1st: make sure that the product id belongs to the logged-in user
    const userId = req.user.id;
    const { productId } = req.body;
    const product = await prisma.product.findUnique({
      where: {
        id_belongsToId: {
          id: productId,
          belongsToId: userId,
        },
      },
    });
    if (!product) {
      // product does not belong to the user
      // TODO: handle error
      res.json({ message: "nope" });
      return;
    }
    // 2nd: create the update if product belongs to the signed in user
    const update = await prisma.update.create({
      data: req.body,
    });
    res.json({ data: update });
  } catch (error) {
    next(error);
  }
};

// TODO: separate the try-catches for the two async functions
export const deleteUpdate: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updateId = req.params.id;
    const products = await prisma.product.findMany({
      where: {
        belongsToId: userId,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce(
      (allUpdates, { updates }) => [...allUpdates, ...updates],
      []
    );

    const match = updates.find((update) => update.id === updateId);

    if (!match) {
      // TODO: handle error
      res.json({ message: "nope" });
      return;
    }

    const deleted = await prisma.update.delete({
      where: {
        id: updateId,
      },
    });
    // const deleted = await prisma.update.delete({
    //   where: {
    //     id: updateId,
    //     product: {
    //       belongsToId: userId,
    //     },
    //   },
    // });
    res.json({ data: deleted });
  } catch (error) {
    next(error);
  }
};
