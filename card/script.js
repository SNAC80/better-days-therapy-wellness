const flipCard = document.getElementById('flipCard');
const saveContact = document.getElementById('saveContact');

if (flipCard) {
  const setFlippedState = (isFlipped) => {
    flipCard.classList.toggle('is-flipped', isFlipped);
    flipCard.setAttribute('aria-pressed', String(isFlipped));
  };

  const revealContactSide = () => setFlippedState(true);

  flipCard.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    revealContactSide();
  });

  flipCard.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    revealContactSide();
  });

  flipCard.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (event) => event.stopPropagation());
  });

  window.setTimeout(revealContactSide, 1800);
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
