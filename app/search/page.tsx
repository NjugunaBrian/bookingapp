import { fetchResults } from "@/lib/fetchResults";
import { notFound } from "next/navigation";

type Props = {
    searchParams: SearchParams;
}

export type SearchParams  = {
    url: URL,
    group_adults: string,
    group_children: string,
    no_room: string,
    checkin: string,
    checkout: string
}



async function Searchpage({ searchParams } : Props) {
    if (!searchParams.url) return notFound();

    const results = await fetchResults(searchParams)
      if (!results) return <div>No results...</div>;

      console.log(results);

  return (
    <div>SearchPage</div>
  )
}


export default Searchpage