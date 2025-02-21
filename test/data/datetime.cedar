// datetime(), offset, durationSince, toDate, toTime
// duration(), toMilliseconds, toSeconds, toMinutes, toHours, toDays
// see https://github.com/cedar-policy/rfcs/blob/main/text/0080-datetime-extension.md
permit (principal, action, resource)
when
{
  datetime("2024-08-21T") == datetime("2024-08-21T00:00:00.000Z") && duration("1d2h3m4s5ms").toSeconds() == 0 &&
  datetime("2024-08-21T") == datetime("2024-08-21T23:59:59.999Z").toDate() && 
  datetime("2024-08-21T").offset(duration("1d")) == datetime("2024-08-22T") &&
  datetime("2024-08-21T").toTime() == datetime("2024-08-21T").durationSince(datetime("2024-08-21T").toDate())
};

permit (principal, action, resource)
when
{
  duration("1d").toDays() * 24 == duration("1d").toHours() &&
  duration("1h").toHours() * 60 == duration("1h").toMinutes() &&
  duration("1m").toMinutes() * 60 == duration("1m").toSeconds() &&
  duration("1s").toSeconds() * 1000 == duration("1s").toMilliseconds() &&
  duration("1ms").toMilliseconds() == 1
};