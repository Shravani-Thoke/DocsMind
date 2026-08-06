export const avatarColors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-emerald-500 to-green-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-teal-500 to-cyan-500",
  "from-yellow-500 to-orange-500",
];
export const getAvatarGradient = (name) => {
  const index =
    name
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    avatarColors.length;

  return avatarColors[index];
};