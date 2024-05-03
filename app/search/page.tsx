import { fetchResults } from "@/lib/fetchResults";
import Link from "next/link";
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
    <section>
      <div className="max-w-4xl mx-auto p-6 lg:px-8">
        <h1 className="text-4xl font-bold pb-3">Your Trip Results</h1>

        <h2 className="pb-3">
          Dates of your trip:
          <span className="italic ml-2">{searchParams.checkin} to {searchParams.checkout}</span>
        </h2>

        <hr className="mb-5" /> 

        <h3 className="font-semibold text-xl">
          {results.content.total_listings}
        </h3>

        <div className="space-y-2 mt-5">
          {results.content.listings.map((item, i) => (
            <div key={i} className="flex space-y-2 justify-between space-x-4 p-5 border rounded-xl">
              <img  src={item.url} className="h-44 w-44 rounded-xl" alt="image of property" />

              <div className="flex flex-1 justify-between space-x-5">
                <div>
                <Link href={item.link} className="font-bold text-blue-800 hover:text-blue-900 hover:underline">{item.title}</Link>
                <p className="text-xs">{item.description}</p>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex items-start justify-end space-x-2">
                    <div>
                    <p className="font-bold">{item.rating_word}</p>
                    <p className="text-xs">{item.rating_count}</p>
                    </div>

                    <p className="bg-blue-900 flex items-center justify-center font-bold text-sm w-10 h-10 text-white flex-shrink-0 rounded-xl">{item.rating || "N/A"}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs">{item.booking_metadata}</p>
                    <p className="font-bold text-2xl">{item.price}</p>
                  </div>
                  
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  )
}


export default Searchpage