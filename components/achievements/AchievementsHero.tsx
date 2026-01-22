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
    <div className="w-full">
      <EditableImage
        src={data.image}
        alt="Achievements"
        editMode={editMode}
        className="w-full h-auto object-cover"
        onChange={(newSrc) => updateData({ ...data, image: newSrc })}
      />
    </div>
  );
}
