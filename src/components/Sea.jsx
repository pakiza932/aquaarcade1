export function Octopus({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g stroke="#ff4d6d" strokeWidth="7" strokeLinecap="round" fill="none">
        <path d="M14 40 Q6 50 14 57" />
        <path d="M24 44 Q20 56 28 59" />
        <path d="M40 44 Q44 56 36 59" />
        <path d="M50 40 Q58 50 50 57" />
      </g>
      <circle cx="32" cy="28" r="21" fill="#ff4d6d" />
      <ellipse cx="24" cy="14" rx="7" ry="3.5" fill="#fff" opacity=".3" />
      <circle cx="23" cy="28" r="6" fill="#fff" />
      <circle cx="41" cy="28" r="6" fill="#fff" />
      <circle cx="24" cy="29" r="3" fill="#0a1128" />
      <circle cx="42" cy="29" r="3" fill="#0a1128" />
      <path d="M27 39 Q32 44 37 39" stroke="#0a1128" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="15" cy="36" r="3" fill="#0a1128" opacity=".25" />
      <circle cx="49" cy="36" r="3" fill="#0a1128" opacity=".25" />
    </svg>
  );
}

export function Fish({ className = "", color = "#22d3ee" }) {
  return (
    <svg className={className} viewBox="0 0 64 40" aria-hidden="true">
      <path d="M46 20 L62 6 Q57 20 62 34 Z" fill={color} />
      <path d="M22 10 Q30 1 38 10 Z" fill={color} opacity=".8" />
      <ellipse cx="26" cy="21" rx="22" ry="14" fill={color} />
      <circle cx="15" cy="17" r="5" fill="#fff" />
      <circle cx="14" cy="18" r="2.5" fill="#0a1128" />
      <path d="M8 26 Q12 30 17 27" stroke="#0a1128" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M31 14 Q37 21 31 28" stroke="#0a1128" strokeWidth="2" opacity=".3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Gator() {
  return (
    <div className="gator">
      <div className="say pixel">GAME ON!</div>
      <svg viewBox="0 0 320 270" role="img" aria-label="Alligator playing video games">
        <g className="g-tail">
          <path d="M215 215 Q285 195 292 245 Q255 232 215 238 Z" fill="#22d3ee" />
        </g>
        <ellipse cx="122" cy="252" rx="26" ry="11" fill="#22d3ee" />
        <ellipse cx="198" cy="252" rx="26" ry="11" fill="#22d3ee" />
        <ellipse cx="160" cy="195" rx="70" ry="58" fill="#22d3ee" />
        <ellipse cx="160" cy="205" rx="44" ry="42" fill="#fff" opacity=".28" />

        <ellipse cx="160" cy="98" rx="72" ry="54" fill="#22d3ee" />
        <path d="M92 92 Q88 10 160 12 Q232 10 228 92" stroke="#ff4d6d" strokeWidth="9" strokeLinecap="round" fill="none" />
        <rect x="82" y="76" width="20" height="36" rx="9" fill="#ff4d6d" />
        <rect x="218" y="76" width="20" height="36" rx="9" fill="#ff4d6d" />

        <circle cx="122" cy="54" r="20" fill="#22d3ee" />
        <circle cx="198" cy="54" r="20" fill="#22d3ee" />
        <g className="g-eye"><circle cx="122" cy="54" r="13" fill="#fff" /><circle cx="124" cy="58" r="6" fill="#0a1128" /></g>
        <g className="g-eye"><circle cx="198" cy="54" r="13" fill="#fff" /><circle cx="196" cy="58" r="6" fill="#0a1128" /></g>

        <ellipse cx="160" cy="122" rx="50" ry="32" fill="#fff" opacity=".28" />
        <circle cx="144" cy="110" r="3.5" fill="#0a1128" />
        <circle cx="176" cy="110" r="3.5" fill="#0a1128" />
        <circle cx="106" cy="114" r="8" fill="#ff4d6d" opacity=".6" />
        <circle cx="214" cy="114" r="8" fill="#ff4d6d" opacity=".6" />
        <path d="M122 130 Q160 156 198 130" stroke="#0a1128" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M138 140 L143 148 L148 142 Z" fill="#fff" />
        <path d="M172 142 L177 148 L182 140 Z" fill="#fff" />

        <path d="M98 185 Q88 232 132 236" stroke="#22d3ee" strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M222 185 Q232 232 188 236" stroke="#22d3ee" strokeWidth="22" strokeLinecap="round" fill="none" />

        <rect x="114" y="218" width="92" height="38" rx="19" fill="#ff4d6d" />
        <path d="M130 237h14M137 230v14" stroke="#0a1128" strokeWidth="4" strokeLinecap="round" />
        <circle cx="180" cy="232" r="4" fill="#0a1128" />
        <circle cx="192" cy="242" r="4" fill="#0a1128" />
        <circle className="g-thumb" cx="137" cy="233" r="7" fill="#22d3ee" />
        <circle className="g-thumb t2" cx="186" cy="237" r="7" fill="#22d3ee" />
      </svg>
    </div>
  );
}
