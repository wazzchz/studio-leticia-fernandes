const ITEMS = [
  'Fibra de vidro',
  'Babyboomer',
  'Francesinha reversa',
  'Aura nails',
  'Esmaltação em gel',
  'Spa dos pés',
  'Blindagem IBX',
  'Almond perfeita',
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ink py-3" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.2em] text-cream/90">
            {t} <span className="text-rose">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
