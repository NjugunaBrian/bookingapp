import { notFound } from "next/navigation";

type Props = {
    searchParams: SearchParams;
}

type SearchParams  = {
    url: URL,
    group_adults: string,
    group_children: string,
    no_room: string,
    checkin: string,
    checkout: string
}



function Searchpage({ searchParams } : Props) {
    /*if (!searchParams.url) return notFound();

    const results = await fetchResults(searchParams)
    if (!results) return <div>No results...</div>;
*/
  return (
    <div>SearchPage</div>
  )
}


export default Searchpage