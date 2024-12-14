"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState("");

  const queryValue = searchParams.get("q") || "";

  const handleSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", 1);

    setSearch(value);

    if (!value) {
      replace(pathName);
      return;
    }

    value.length > 2 && params.set("q", value);

    replace(`${pathName}?${params}`);
  }, 300);

  const onInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value);
  };

  useEffect(() => {
    setSearch(queryValue);
  }, [queryValue]);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        onChange={onInputChange}
        value={search}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};

export default Search;
