"use client";

interface AchievementsHeroProps {
  data: {
    image: string;
  };
}

export default function AchievementsHero({
  data,
}: AchievementsHeroProps) {
  if (!data) return null;

  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <img
        src={data.image || "/placeholder.png"}
        alt="Achievements"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
