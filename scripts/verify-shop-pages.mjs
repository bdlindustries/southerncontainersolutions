/**
 * Post-build smoke test: shop product pages return 200 and include product imagery metadata.
 */
const BASE = process.env.VERIFY_BASE_URL || "http://localhost:3000";
const SLUGS = [
  "scs-40-office",
  "scs-20-office",
  "scs-40-combo",
  "scs-40-climate-storage",
  "scs-20-climate-storage",
];

const failures = [];

for (const slug of SLUGS) {
  const url = `${BASE}/shop/${slug}`;
  let res;
  try {
    res = await fetch(url, { redirect: "follow" });
  } catch (err) {
    failures.push(`${url}: fetch failed — ${err.message}`);
    continue;
  }
  if (res.status !== 200) {
    failures.push(`${url}: expected 200, got ${res.status}`);
    continue;
  }
  const html = await res.text();
  const hasFirebaseImage =
    html.includes("firebasestorage.googleapis.com") &&
    (html.includes('property="og:image"') || html.includes('name="twitter:image"'));
  const jsonLdHasImage =
    html.includes('"@type":"Product"') && html.includes('"image"') && html.includes("firebasestorage");
  if (!hasFirebaseImage) {
    failures.push(`${url}: missing Firebase og/twitter product image`);
  }
  if (!jsonLdHasImage) {
    failures.push(`${url}: Product JSON-LD missing Firebase image`);
  }
}

if (failures.length) {
  console.error("Shop page verification failed:");
  for (const line of failures) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(`Shop verification passed for ${SLUGS.length} products at ${BASE}`);
