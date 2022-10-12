import Select from "react-select";

const ChartSelect = ({ chartChange }) => {
  return (
    <Select
      styles={{
        input: (base) => ({
          ...base,
          color: "rgb(var(--color-foreground-alt-200))",
        }),
        control: (base) => ({
          ...base,
          maxWidth: 350,
          marginLeft: 5,
          backgroundColor: "rgb(var(--color-background))",
          borderWidth: "1px",
          borderColor: "rgb(var(--color-foreground-alt-200))",
          color: "rgb(var(--color-foreground-alt-200))",
        }),
        menu: (provided) => ({
          ...provided,
          //   top: 40,
          maxWidth: 400,
          marginLeft: 5,
          borderRadius: 10,
          borderWidth: "2px",
          borderColor: "rgb(var(--color-foreground-alt-400))",
          //   backgroundColor: "rgb(var(--color-background))",
          color: "rgb(var(--color-foreground-alt-200))",
        }),
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          text: "rgb(var(--color-foreground-alt-200))",
          primary: "rgb(var(--color-foreground-alt-300))",
          primary25: "rgb(var(--color-foreground-alt-400))",
          primary50: "black",
          primary75: "black",
          neutral10: "black",
          neutral80: "rgb(var(--color-foreground-alt-200))",
        },
      })}
      defaultValue={{ label: "Price History", value: "priceHistory" }}
      onChange={(chart) => chartChange(chart)}
      options={Charts}
      className="flex ml-2 mb-2 text-gray-600"
      isSearchable={false}
    />
  );
};

const Charts = [
  {
    value: "priceHistory",
    label: "Price History",
  },
  {
    value: "updateHistory",
    label: "Update History",
  },
  {
    value: "JSONExample",
    label: "JSON Data Example",
  },
  {
    value: "CSVExample",
    label: "CSV Data Example",
  },
  {
    value: "customRange",
    label: "Build Custom Range",
  },
  {
    value: "DateLookup",
    label: "Date/Time Lookup",
  },
];

export { ChartSelect };
