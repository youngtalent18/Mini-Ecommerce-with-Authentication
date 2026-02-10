import stripe from "../lib/stripe.js";
import Coupon from "../models/couponModel.js";
import Order from "../models/orderModel.js";

/* =====================================================
   CREATE CHECKOUT SESSION
===================================================== */
export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    // 1️⃣ Validate cart
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    // 2️⃣ Build Stripe line items
    const lineItems = products.map((product) => {
      const unitAmount = Math.round(product.price * 100); // cents
      totalAmount += unitAmount * product.quantity;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: unitAmount,
        },
        quantity: product.quantity,
      };
    });

    // 3️⃣ Validate coupon (MongoDB)
    let coupon = null;

    if (couponCode) {
      coupon = await Coupon.findOne({
        code: couponCode,
        userId: req.user._id,
        isActive: true,
      });

      if (coupon) {
        totalAmount -= Math.round(
          (totalAmount * coupon.discountPercentage) / 100
        );
      }
    }

    // 4️⃣ Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,

      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,

      discounts: coupon
        ? [{ coupon: await createStripeCoupon(coupon.discountPercentage) }]
        : [],

      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(products),
      },
    });

    // 5️⃣ Reward coupon for large orders
    if (totalAmount > 20000) {
      await createGiftCoupon(req.user._id);
    }

    res.json({
      id: session.id,
      totalAmount: totalAmount / 100,
    });
  } catch (error) {
    console.error("Checkout session error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* =====================================================
   STRIPE COUPON CREATOR
===================================================== */
async function createStripeCoupon(discountPercentage) {
  const coupon = await stripe.coupons.create({
    percent_off: discountPercentage,
    duration: "once",
  });

  return coupon.id;
}

/* =====================================================
   LOCAL (MONGODB) COUPON CREATOR
===================================================== */
async function createGiftCoupon(userId) {
  const newCoupon = new Coupon({
    code: "GIFT-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: Math.floor(Math.random() * 40) + 10,
    userId,
    expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isActive: true,
  });

  await newCoupon.save();
  return newCoupon;
}

/* =====================================================
   CHECKOUT SUCCESS → CREATE ORDER
===================================================== */
export const getCheckoutSuccess = async (req, res) => {
  try {
    const { session_id } = req.body;

    // 1️⃣ Retrieve session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (!session || session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    // 2️⃣ Disable used coupon
    if (session.metadata.couponCode) {
      await Coupon.findOneAndUpdate(
        {
          code: session.metadata.couponCode,
          userId: session.metadata.userId,
        },
        { isActive: false }
      );
    }

    // 3️⃣ Create order in MongoDB
    const products = JSON.parse(session.metadata.products);

    const newOrder = new Order({
      userId: session.metadata.userId,
      products: products.map((p) => ({
        productId: p.id,
        quantity: p.quantity,
        price: p.price,
      })),
      totalAmount: session.amount_total / 100,
      stripeSessionId: session.id,
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      orderId: newOrder._id,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Checkout success error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
