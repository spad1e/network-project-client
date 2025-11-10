interface FloatPanelProps {
  component: React.ReactNode;
}
export default function FloatPanel({ component }: FloatPanelProps) {
  return (
    <div className="absolute top-1/2 left-1/2 h-60 w-40 rounded-2xl border-2 bg-white">
      {component}
    </div>
  );
}
