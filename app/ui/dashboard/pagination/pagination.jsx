"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import styles from "./pagination.module.css";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const ITEM_BY_PAGE = 2;

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);

  const hasPrev = ITEM_BY_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_BY_PAGE * (parseInt(page) - 1) + ITEM_BY_PAGE < count;

  const handleChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);

    replace(`${pathName}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
