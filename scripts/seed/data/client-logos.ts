/**
 * 24 client logos seeded WITHOUT image assets — Sanity Studio is the right place
 * to upload actual logo PNGs after seeding. Each record is created with a 1×1
 * placeholder so the schema's `validation: required` doesn't fail.
 *
 * After seeding, Nitish replaces the placeholder logo in Studio per row.
 */

interface SeedClientLogo {
  _id: string;
  clientName: string;
  industryId: string;
  status: "flagship" | "active" | "past";
  website?: string;
}

export const CLIENT_LOGOS: SeedClientLogo[] = [
  // ─── Flagship (full case studies) ───
  {
    _id: "logo-wise-market",
    clientName: "Wise Market",
    industryId: "industry-ecommerce-dtc",
    status: "flagship",
    website: "https://wisemarket.com.au",
  },
  {
    _id: "logo-tru-aquapolis",
    clientName: "Tru Aquapolis",
    industryId: "industry-real-estate",
    status: "flagship",
  },
  {
    _id: "logo-mini-leaves",
    clientName: "Mini Leaves",
    industryId: "industry-ecommerce-dtc",
    status: "flagship",
  },

  // ─── Active clients ───
  { _id: "logo-invest-in-sharjah", clientName: "Invest in Sharjah", industryId: "industry-real-estate", status: "active" },
  { _id: "logo-crafthives", clientName: "Crafthives", industryId: "industry-ecommerce-dtc", status: "active" },
  { _id: "logo-aishwarya", clientName: "Aishwarya Foods", industryId: "industry-ecommerce-dtc", status: "active" },
  { _id: "logo-truspace", clientName: "Truspace", industryId: "industry-real-estate", status: "active" },
  { _id: "logo-altius", clientName: "Altius Realty", industryId: "industry-real-estate", status: "active" },
  { _id: "logo-himalayan", clientName: "Himalayan Wellness", industryId: "industry-healthcare-wellness", status: "active" },
  { _id: "logo-greendot", clientName: "GreenDot Health", industryId: "industry-healthcare-wellness", status: "active" },
  { _id: "logo-northstar", clientName: "Northstar Education", industryId: "industry-edtech-education", status: "active" },
  { _id: "logo-bridge", clientName: "Bridge Learning", industryId: "industry-edtech-education", status: "active" },
  { _id: "logo-axis", clientName: "Axis Legal", industryId: "industry-professional-services", status: "active" },
  { _id: "logo-meridian", clientName: "Meridian Advisory", industryId: "industry-professional-services", status: "active" },
  { _id: "logo-cloudkey", clientName: "CloudKey", industryId: "industry-saas-tech", status: "active" },

  // ─── Past clients ───
  { _id: "logo-flowboard", clientName: "Flowboard", industryId: "industry-saas-tech", status: "past" },
  { _id: "logo-vector", clientName: "Vector Tech", industryId: "industry-saas-tech", status: "past" },
  { _id: "logo-sapphire", clientName: "Sapphire Realty", industryId: "industry-real-estate", status: "past" },
  { _id: "logo-bloomwell", clientName: "Bloomwell", industryId: "industry-healthcare-wellness", status: "past" },
  { _id: "logo-paragon", clientName: "Paragon Education", industryId: "industry-edtech-education", status: "past" },
  { _id: "logo-keystone", clientName: "Keystone Legal", industryId: "industry-professional-services", status: "past" },
  { _id: "logo-veridia", clientName: "Veridia D2C", industryId: "industry-ecommerce-dtc", status: "past" },
  { _id: "logo-trinity", clientName: "Trinity Capital", industryId: "industry-professional-services", status: "past" },
];
