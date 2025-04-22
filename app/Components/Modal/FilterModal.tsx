import React from "react";

type FilterModalProps = {
  children: React.ReactNode;
  setFilterMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterModal = ({ children, setFilterMenuActive }: FilterModalProps) => {
  return (
    <section
      className="md:hidden absolute top-0 left-0 bg-black/40 h-full w-full flex items-center justify-center"
      onClick={() => setFilterMenuActive(false)}
    >
      {children}
    </section>
  );
};

export default FilterModal;
