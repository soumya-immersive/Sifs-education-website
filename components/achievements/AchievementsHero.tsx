import Image from "next/image";

export default function AchievementsHero() {
  return (
    <div className="w-full">
      <Image
        src="/achievements/banner.png"
        alt="Achievements"
        width={1920}
        height={300}
        className="w-full object-cover"
        priority
      />
    </div>
  );
}
