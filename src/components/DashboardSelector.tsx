const DashboardSelector = ({
  ...props
}) => {
  return (
    <button type="button" className={`hover:bg-gray-300 text-sm md:text-md text-left w-full px-2 py-2 cursor-pointer font-medium rounded-xl`}
      {...props}>
    </button>
  );
};

export default DashboardSelector;