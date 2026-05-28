const SITE_LEADS_EMAIL = 'bdlindustriesllc@gmail.com';

async function postFormSubmit(recipient, payload) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ _captcha: false, ...payload }),
  });
  if (!res.ok) {
    console.warn(`FormSubmit to ${recipient} returned`, res.status);
    return false;
  }
  return true;
}

/** Short plain-text alert for carrier SMS gateways (~160 char limit). */
function buildSmsAlert(fields) {
  const parts = [
    fields.formType,
    fields.name,
    fields.phone,
    fields.email,
    fields.deliveryZip || fields.zip,
    fields.product || fields.productTitle,
  ].filter(Boolean);

  const text = `SCS Lead: ${parts.join(' | ')}`;
  return text.length > 155 ? `${text.slice(0, 152)}...` : text;
}

/**
 * Sends SMS via our API route using Gmail SMTP → Verizon vtext.
 * FormSubmit does not reliably deliver to carrier gateways; manual Gmail → vtext works.
 */
async function sendSmsAlert(fields) {
  const message = buildSmsAlert(fields);
  const res = await fetch('/api/lead-sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    console.warn('SMS lead alert failed:', res.status, await res.text().catch(() => ''));
    return false;
  }
  return true;
}

/**
 * Sends lead alerts on every form submit:
 * 1. Full table email → FormSubmit → SITE_LEADS_EMAIL
 * 2. Short text alert → /api/lead-sms → Gmail SMTP → 9852374667@vtext.com
 */
export async function sendSiteLeadEmail(subject, fields) {
  const emailOk = await postFormSubmit(SITE_LEADS_EMAIL, {
    _subject: subject,
    _template: 'table',
    ...fields,
  });

  const smsOk = await sendSmsAlert(fields);

  if (!emailOk) {
    throw new Error('Primary lead email failed to send.');
  }
  if (!smsOk) {
    console.warn('SMS lead alert failed. Configure LEAD_ALERT_GMAIL_* env vars for text alerts.');
  }
}
