import type { ReactNode } from "react";

type FeatureCardProps = {
  emoji: ReactNode;
  title: string;
  text: string;
};

const FeatureCard = ({ emoji, title, text }: FeatureCardProps) => {
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition">
      <div className="text-3xl">{emoji}</div>
      <h3 className="mt-3 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-gray-600">{text}</p>
    </div>
  );
}

export default FeatureCard
