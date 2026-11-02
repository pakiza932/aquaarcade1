const PATH =
  "M0,100 C180,150 360,50 720,100 C900,150 1080,50 1440,100 C1620,150 1800,50 2160,100 C2340,150 2520,50 2880,100 L2880,200 L0,200 Z";

export default function Waves() {
  return (
    <div className="waves">
      {["w1", "w2", "w3"].map((c) => (
        <svg key={c} className={c} viewBox="0 0 2880 200" preserveAspectRatio="none">
          <path d={PATH} />
        </svg>
      ))}
    </div>
  );
}
