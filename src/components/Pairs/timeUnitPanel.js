const TimeButton = ({ timeUnit, displaytext, timeChange }) => {
  return (
    <button onClick={() => timeChange(+timeUnit)} className="flex mr-2">
      {displaytext}
    </button>
  );
};

const TimeUnitPanel = ({ timeChange }) => {
  return (
    <span className="flex  text-gray-600">
      <TimeButton timeUnit="7" displaytext="WK" timeChange={timeChange} />
      <TimeButton timeUnit="30" displaytext="1M" timeChange={timeChange} />
      <TimeButton timeUnit="90" displaytext="3M" timeChange={timeChange} />
      <TimeButton timeUnit="180" displaytext="6M" timeChange={timeChange} />
      <TimeButton timeUnit="365" displaytext="YR" timeChange={timeChange} />
    </span>
  );
};

export { TimeUnitPanel };
