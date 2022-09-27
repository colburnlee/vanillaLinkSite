const TimeButton = ({ timeUnit, displaytext, timeChange }) => {
  return (
    <button onClick={() => timeChange(+timeUnit)} className="flex mr-2">
      {displaytext}
    </button>
  );
};

const TimeUnitPanel = ({ timeChange }) => {
  return (
    <span className="flex relative justify-end text-gray-600">
      <TimeButton timeUnit="7" displaytext="Wk" timeChange={timeChange} />
      <TimeButton timeUnit="30" displaytext="Mon" timeChange={timeChange} />
      <TimeButton timeUnit="90" displaytext="Qtr" timeChange={timeChange} />
      <TimeButton timeUnit="180" displaytext="6Mo" timeChange={timeChange} />
      <TimeButton timeUnit="365" displaytext="Yr" timeChange={timeChange} />
    </span>
  );
};

export { TimeUnitPanel };
