export default function CRTOverlay() {
  return (
    <>
      {/* Scanlines — very subtle on cream */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.028) 0px, rgba(0,0,0,0.028) 1px, transparent 1px, transparent 3px)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      {/* Warm vignette */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 52%, rgba(80,40,10,0.12) 100%)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  );
}
