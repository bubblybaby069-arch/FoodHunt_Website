import stripe from "../config/stripe.js";
import Order from "../models/Order.js";


export const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems, address } = req.body;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.menuItem.name,
        },
        unit_amount: item.menuItem.offerPrice * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/my-orders?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        userId: req.user._id.toString(),
        address: JSON.stringify(address),
        cartItems: JSON.stringify(
          cartItems.map((i) => ({
            menuItem: i.menuItem._id,
            quantity: i.quantity,
            price: i.menuItem.offerPrice,
          }))
        ),
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stripe checkout failed" });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { session_id } = req.body;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const address = JSON.parse(session.metadata.address);
    const items = JSON.parse(session.metadata.cartItems);

    const totalAmount = session.amount_total / 100;

    const order = await Order.create({
      user: session.metadata.userId,
      items,
      address,
      totalAmount,
      paymentMethod: "ONLINE",
      paymentStatus: "PAID",
      orderStatus: "CONFIRMED",
    });

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment confirmation failed" });
  }
};
