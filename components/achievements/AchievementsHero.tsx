"use client";

import EditableImage from "../editable/EditableImage";

interface AchievementsHeroProps {
  data: {
    image: string;
  };
  editMode: boolean;
  updateData: (data: any) => void;
}

export default function AchievementsHero({
  data,
  editMode,
  updateData,
}: AchievementsHeroProps) {
  if (!data) return null;

  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <EditableImage
        src={data.image}
        alt="Achievements"
        editMode={editMode}
        className="w-full h-full object-cover"
        onChange={(newSrc) => updateData({ ...data, image: newSrc })}
      />
    </div>
  );
}
