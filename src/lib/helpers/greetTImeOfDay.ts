export function greetTimeOfDay() {
  const hour = new Date().getHours();
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 24) return "evening";
  return "morning";
}
