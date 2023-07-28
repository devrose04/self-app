export const getBackgroundColor = feeling => {

  if ([
    "Sad",
    "Sleepy", "Bored", "Lonely", "Depressed", "Ashamed", "Guilty",
    "Apathetic", "Inferior", "Inadequate", "Miserable", "Stupid", "Bashful"].includes(feeling)) return "#6D358E";

  if (["Mad",
    "Hurt", "Hostile", "Angry", "Rage", "Hateful", "Critical",
    "Jealous", "Selfish", "Frustrated", "Furious", "Irritated", "Skeptical"].includes(feeling)) return "#E62325"

  if (["Scared",
    "Rejected", "Confused", "Helpless", "Submissive", "Insecure", "Anxious",
    "Bewildered", "Discouraged", "Insignificant", "Weak", "Foolish", "Embarrassed"].includes(feeling)) return "#F19020"

  if ([
    "Joyful",
    "Aware", "Creative", "Playful", "Energetic", "Sexy", "Excited",
    "Delightful", "Extravagant", "Amused", "Stimulating", "Fascinating", "Daring"].includes(feeling)) return "#F0E70D"

  if (["Powerful",
    "Faithful", "Important", "Hopeful", "Appreciated", "Respected", "Proud",
    "Confident", "Intelligent", "Worthwhile", "Valuable", "Satisfied", "Cheerful"].includes(feeling)) return "#04905A"

  if (["Peaceful",
    "Content", "Thoughtful", "Intimate", "Loving", "Trusting", "Nurturing",
    "Pensive", "Relaxed", "Responsive", "Serene", "Sentimental", "Thankful"
  ].includes(feeling)) return "#1870B3"
  return "#ccc";
}

export const getColorForFeeling = (feeling) => {
  if ([
    "Sad",
    "Sleepy", "Bored", "Lonely", "Depressed", "Ashamed", "Guilty",
    "Apathetic", "Inferior", "Inadequate", "Miserable", "Stupid", "Bashful"].includes(feeling)) return "purple";

  if (["Mad",
    "Hurt", "Hostile", "Angry", "Rage", "Hateful", "Critical",
    "Jealous", "Selfish", "Frustrated", "Furious", "Irritated", "Skeptical"].includes(feeling)) return "red"

  if (["Scared",
    "Rejected", "Confused", "Helpless", "Submissive", "Insecure", "Anxious",
    "Bewildered", "Discouraged", "Insignificant", "Weak", "Foolish", "Embarrassed"].includes(feeling)) return "orange"

  if ([
    "Joyful",
    "Aware", "Creative", "Playful", "Energetic", "Sexy", "Excited",
    "Delightful", "Extravagant", "Amused", "Stimulating", "Fascinating", "Daring"].includes(feeling)) return "yellow"

  if (["Powerful",
    "Faithful", "Important", "Hopeful", "Appreciated", "Respected", "Proud",
    "Confident", "Intelligent", "Worthwhile", "Valuable", "Satisfied", "Cheerful"].includes(feeling)) return "green"

  if (["Peaceful",
    "Content", "Thoughtful", "Intimate", "Loving", "Trusting", "Nurturing",
    "Pensive", "Relaxed", "Responsive", "Serene", "Sentimental", "Thankful"
  ].includes(feeling)) return "blue"
  return false;
}