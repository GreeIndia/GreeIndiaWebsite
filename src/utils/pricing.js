// ─── Pricing Utilities ────────────────────────────────────────────────────────
// DB mrp = actual selling price
// Display MRP = DB mrp inflated by 30-35% (deterministic per product via ID hash)
// Discount badge = the same % used to inflate

// Returns the discount percentage for the product
export const getDiscountPercent = (product) => {
  if (!product) return 55;
  if (product.discount) return product.discount;
  
  // Fallback to deterministic 50-60% based on ID if not in DB
  const idStr = product._id ? String(product._id) : '';
  const hash = idStr.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return 50 + (hash % 11); // gives 50 to 60
};

// The crossed out MRP shown to user = DB's actual MRP
export const getDisplayMRP = (product) => {
  if (!product || !product.mrp || isNaN(product.mrp)) return null;
  return Math.round(Number(product.mrp));
};

// Actual selling price = DB mrp reduced by discount percentage
export const getSellingPrice = (product) => {
  if (!product || !product.mrp || isNaN(product.mrp)) return null;
  const pct = getDiscountPercent(product);
  const discountAmount = (Number(product.mrp) * pct) / 100;
  return Math.round(Number(product.mrp) - discountAmount);
};

export const formatPrice = (amount) => {
  if (!amount && amount !== 0) return 'TBD';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
};
