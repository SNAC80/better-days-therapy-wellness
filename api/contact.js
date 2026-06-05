const CRLF = '\r\n';

function escapeVCard(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

module.exports = function handler(req, res) {
  if (req.method && req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    res.end('Method Not Allowed');
    return;
  }

  const fields = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVCard('Booker')};${escapeVCard('Stephanie')};;;`,
    `FN:${escapeVCard('Dr. Stephanie Booker')}`,
    `ORG:${escapeVCard('Better Days Therapy & Wellness')}`,
    `TITLE:${escapeVCard('Founder')}`,
    'TEL;TYPE=WORK,VOICE:+13462547322',
    `EMAIL;TYPE=INTERNET,WORK,PREF:${escapeVCard('betterdaystherapywellness@gmail.com')}`,
    `URL;TYPE=WORK:${escapeVCard('https://www.betterdaystherapywellness.com/')}`,
    `URL;TYPE=Google Business:${escapeVCard('https://share.google/lAQb2FB6BQLs1FHpq')}`,
    `NOTE:${escapeVCard('Remember that every stumbling block is merely a stepping stone on your pathway to success.')}`,
    'END:VCARD'
  ];

  const body = fields.join(CRLF) + CRLF;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/vcard; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="BetterDays_contact.vcf"');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.end(body);
};
