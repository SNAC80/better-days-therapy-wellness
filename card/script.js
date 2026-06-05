const flipCard = document.getElementById('flipCard');
const saveContact = document.getElementById('saveContact');

if (flipCard) {
  flipCard.addEventListener('click', () => {
    const isFlipped = flipCard.classList.toggle('is-flipped');
    flipCard.setAttribute('aria-pressed', String(isFlipped));
  });
}

if (saveContact) {
  saveContact.addEventListener('click', async (event) => {
    event.preventDefault();

    const serverlessUrl = '/api/contact';
    const staticFallbackUrl = 'assets/BetterDays_contact.vcf';

    try {
      const response = await fetch(serverlessUrl, { method: 'GET', cache: 'no-store' });
      if (!response.ok) throw new Error('Serverless contact endpoint unavailable.');
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      triggerDownload(objectUrl, 'BetterDays_contact.vcf');
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 4000);
    } catch (error) {
      triggerDownload(staticFallbackUrl, 'BetterDays_contact.vcf');
    }
  });
}

function triggerDownload(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
