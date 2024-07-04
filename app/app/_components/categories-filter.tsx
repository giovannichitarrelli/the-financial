"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "../despesas/actions";
import { useEffect, useState } from "react";
import { Categories } from "@prisma/client";

const CategoriesFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const categoriesId = params.get("categoriesId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const onChange = (newValue: string) => {
    const query = {
      categoriesId: newValue,
      from,
      to,
    };

    if (newValue === "all") {
      query.categoriesId = "";
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  };

  return (
    <Select value={categoriesId} onValueChange={onChange} disabled={false}>
      <SelectTrigger
        className="flex h-9 w-full items-center justify-center gap-2 rounded-md border-none bg-white/10 px-3 font-normal text-white outline-none
        transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto"
      >
        <SelectValue placeholder="Selecione a categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" className="bg-black ">
          Todas as categorias
        </SelectItem>
        {categories?.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoriesFilter;
