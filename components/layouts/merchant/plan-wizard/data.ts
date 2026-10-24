const DEFAULT_PLAN = {
  planName: "",
  description: "",
  price: 25,
  billingInterval: "Monthly",
  minAllowance: 300,
  starts: new Date().toISOString().slice(0, 10),
  expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
}

export { DEFAULT_PLAN }
