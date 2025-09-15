import Tenant from "../models/Tenant.js";

export const upgradeTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ slug: req.params.slug });
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    tenant.plan = "pro";
    await tenant.save();

    res.json({ message: "Tenant upgraded to Pro", tenant });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
