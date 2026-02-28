import Order from "../models/Order.js";

/* ================= CREATE ORDER (USER) ================= */
export const createOrder = async (req, res) => {
  try {
    const { items, address, paymentMethod, paymentStatus } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart items are required" });
    }

    // Calculate total amount
    const totalAmount = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    // ✅ Set initial orderStatus as "Pending" for both COD and ONLINE
    const order = await Order.create({
      user: req.user._id,
      items,
      address,
      totalAmount,
      paymentMethod,
      paymentStatus, // COD: PAID, ONLINE: PENDING
      orderStatus: "Pending", // Admin will Accept/Reject/Deliver
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

/* ================= GET USER ORDERS ================= */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.menuItem", "name offerPrice")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/* ================= ADMIN: ALL ORDERS ================= */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.menuItem", "name")
      .sort({ createdAt: -1 });

    res.json({
      orders: orders.map((o) => ({
        _id: o._id,
        user: o.user,
        items: o.items,
        address: o.address,
        totalAmount: o.totalAmount,
        paymentMethod: o.paymentMethod,
        paymentStatus: o.paymentStatus,
        orderStatus: o.orderStatus, // ✅ consistent naming
        createdAt: o.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

/* ================= ADMIN: UPDATE STATUS ================= */
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status; // ✅ update correct field
    await order.save();

    res.json({ message: `Order status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ message: "Status update failed" });
  }
};
