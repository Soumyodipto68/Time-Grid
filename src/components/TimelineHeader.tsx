export default function TimelineHeader() {
  const hours = [
    "12 AM",
    "6 AM",
    "12 PM",
    "6 PM",
    "12 AM",
  ];

  return (
    <div className="ml-32 flex justify-between text-xs text-gray-500">
      {hours.map((hour, index) => (
  <span key={`${hour}-${index}`}>{hour}</span>
))}
    </div>
  );
}