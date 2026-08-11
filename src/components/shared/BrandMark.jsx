import React from 'react';
import { SiCognizant, SiGithub, SiMacys } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

// Real Claude mark path data (Simple Icons, CC0) — split across lines
// purely to satisfy the lint line-length rule; it's one path.
const CLAUDE_MARK_PATH = [
  'm4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2',
  '646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972',
  ' 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.',
  '4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.36',
  '43.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.25',
  '5-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3',
  '.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.',
  '9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.24',
  '29.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3',
  '478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.83',
  '18.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618',
  '.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.32',
  '79h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.65',
  '75-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-',
  '.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4',
  '614-.3218-.7468.3218-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328',
  ' 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-',
  '1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9',
  '064-1.3114Z',
].join('');

// Real Hono mark path data (Simple Icons, CC0) — used as a tag icon since
// this version of react-icons doesn't export it yet.
const HONO_MARK_PATH = [
  'M12.445.002a45.529 45.529 0 0 0-5.252 8.146 8.595 8.595 0 0 1-.555-.53 27.796 27.796 0 0 0-1.205-1.5',
  '42 8.762 8.762 0 0 0-1.205-1.5',
  '42 8.762 8.762 0 0 0-1.251 2.12 20.743 20.743 0 0 0-1.448 5.88 8.867 8.867 0 0 0 .338 3.468c1.312 3.',
  '48 3.794 5.593 7.445 6.337 3.055.438 5.755-.333 8.097-2.312 2.677-2.59 3.359-5.634 2.047-9.132a33.28',
  '7 33.287 0 0 0-2.988-5.59A91.34 91.34 0 0 0 12.615.053a.216.216 0 0 0-.17-.051Zm-.336 3.906a50.93 50',
  '.93 0 0 1 4.794 6.552c.448.767.817 1.57 1.108 2.41.606 2.386-.044 4.354-1.951 5.904-1.845 1.298-3.87',
  ' 1.683-6.072 1.156-2.376-.737-3.75-2.335-4.121-4.794a5.107 5.107 0 0 1 .242-2.266c.358-.908.79-1.774',
  ' 1.3-2.601l1.446-2.121a397.33 397.33 0 0 0 3.254-4.24Z',
].join('');

export const SiHono = ({ className, 'aria-hidden': ariaHidden }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d={HONO_MARK_PATH} />
  </svg>
);

// Brand identity marks — real SVGs per company. Reused unchanged from
// the previous Work implementation for both the enterprise project
// centerpieces and the Engineering Record below.
const BrandMark = ({ brand, label }) => {
  const marks = {
    alignerr: (
      <div className="brand-mark brand-mark--alignerr" aria-label={label} title={label}>
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M24 7.5 36.5 29H28l-4-6.9-4 6.9h-8.5L24 7.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M19.7 29h8.6L24 36.4 19.7 29Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M24 7.5h8.7L19.6 29h-8.1L24 7.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    // Real Claude mark (Simple Icons, CC0) — the previous version drew a
    // generic six-dot "AI atom" glyph that didn't read as any specific
    // product. This is the actual Anthropic/Claude asterisk.
    claude: (
      <div className="brand-mark brand-mark--claude" aria-label={label} title={label}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor">
          <path d={CLAUDE_MARK_PATH} />
        </svg>
      </div>
    ),
    cognizant: (
      <div className="brand-mark brand-mark--cognizant" aria-label={label} title={label}>
        <SiCognizant />
      </div>
    ),
    debut: (
      <div className="brand-mark brand-mark--debut" aria-label={label} title={label}>
        <span className="brand-mark__initials">DI</span>
      </div>
    ),
    // DIRECTV's own media-assets page restricts usage to press/media outlets,
    // so the graphic mark isn't licensed for a personal portfolio. This
    // renders the real product name as a styled wordmark instead of a copied
    // logo — still unmistakable, without reproducing a trademarked asset.
    directv: (
      <div className="brand-mark brand-mark--wordmark" aria-label={label} title={label}>
        <span className="brand-mark__wordmark">DIRECTV</span>
      </div>
    ),
    // Same reasoning as DIRECTV: LexisNexis's mark is trademarked and its
    // brand-guidelines page is login-gated to authorized partners/press,
    // not freely licensed — so this is the real name as styled text, not
    // a copied logo.
    lexisnexis: (
      <div className="brand-mark brand-mark--wordmark" aria-label={label} title={label}>
        <span className="brand-mark__wordmark">LexisNexis</span>
      </div>
    ),
    payments: (
      <div className="brand-mark brand-mark--payments" aria-label={label} title={label}>
        <span className="brand-mark__card" />
      </div>
    ),
    macys: (
      <div className="brand-mark brand-mark--macys" aria-label={label} title={label}>
        <SiMacys />
      </div>
    ),
    aws: (
      <div className="brand-mark brand-mark--aws" aria-label={label} title={label}>
        <FaAws />
      </div>
    ),
    github: (
      <div className="brand-mark brand-mark--github" aria-label={label} title={label}>
        <SiGithub />
      </div>
    ),
  };

  return marks[brand] ?? <span>{label?.slice(0, 1)}</span>;
};

export default BrandMark;
