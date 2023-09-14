import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Paginator = ({
  onChange,
  totalPages,
}: {
  onChange: (currentPage: number) => void;
  totalPages: number;
}) => {
  const [page, setPage] = useState(1);
  const disableNextPage = () => {
    if (page === 1) return true
    return false
  }

  const disablePreviousPage = () => {
    if (totalPages === page) return true
    return false
  }
  return (
    <section className="flex w-full justify-end mt-[8px]">
      <button
      disabled={disablePreviousPage()}
        onClick={() => {
          if (disablePreviousPage()) return
          let newPage = page - 1;
          setPage(newPage);
          onChange(newPage);
        }}
      >
        <ChevronLeft size={18} className={`mr-[12px] ${disablePreviousPage() ? 'text-gray-200' : 'text-black'}`} />
      </button>
      <button
        disabled={disableNextPage()}
        onClick={() => {
            if (disableNextPage()) return
          let newPage = page + 1;
          setPage(newPage);
          onChange(newPage);
        }}
      >
        <ChevronRight size={18} className={`${disableNextPage() ? 'text-gray-200' : 'text-black'}`} />
      </button>
    </section>
  );
};

export default Paginator;
