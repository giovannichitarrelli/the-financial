import DateFilter from "./date-filter";

export const Filters = () => {
  return (
    <div className="flex flex-col items-center gap-y-2 lg:flex-row lg:gap-x-2">
      {/* <SearchFilter />*/}
      <DateFilter />
    </div>
  );
};
