const PREPARATION_WINDOW_MINUTES = 60;

export function getDepartureStatus(targetTime, currentTime = new Date()) {
  const [targetHour, targetMinute] = targetTime.split(":").map(Number);
  const target = new Date(currentTime);

  target.setHours(targetHour, targetMinute, 0, 0);

  const diffMinutes = Math.ceil((target.getTime() - currentTime.getTime()) / 60000);
  const elapsedPreparationMinutes = PREPARATION_WINDOW_MINUTES - diffMinutes;
  const progress = Math.min(
    100,
    Math.max(0, (elapsedPreparationMinutes / PREPARATION_WINDOW_MINUTES) * 100)
  );

  if (diffMinutes <= 0) {
    return {
      primary: "지금 나가야 해요",
      secondary: `${targetTime} 외출 예정 시간이 지났어요.`,
      minutesLeft: 0,
      progress: 100,
      status: "expired",
    };
  }

  if (diffMinutes < 60) {
    return {
      primary: `${diffMinutes}분 남았어요`,
      secondary: `${targetTime}까지 준비를 마치면 돼요.`,
      minutesLeft: diffMinutes,
      progress,
      status: diffMinutes <= 10 ? "urgent" : "active",
    };
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return {
    primary: `${hours}시간 ${minutes}분 남았어요`,
    secondary: `${targetTime}까지 준비를 마치면 돼요.`,
    minutesLeft: diffMinutes,
    progress: 0,
    status: "waiting",
  };
}
