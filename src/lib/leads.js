const SITE_LEADS_EMAIL = 'bdlindustriesllc@gmail.com';

/** FormSubmit → SITE_LEADS_EMAIL (confirm inbox once at formsubmit.co on first submission). */
export async function sendSiteLeadEmail(subject, fields) {
  const body = {
    _subject: subject,
    _template: 'table',
    _captcha: false,
    ...fields,
  };
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(SITE_LEADS_EMAIL)}`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) console.warn('Site lead email returned', res.status);
}
