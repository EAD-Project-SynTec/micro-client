import { Navbar, Typography, Input } from "@material-tailwind/react";

export function SearchBar({ setSearch }) {
  return (
    <Navbar
      variant="gradient"
      color="white"
      className="mx-auto max-w-screen-xl from-blue-gray-900 to-blue-gray-800 px-4 py-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-y-4 text-white">
        {/* Title for the search bar */}
        <Typography
          as="a"
          href="#"
          variant="h6"
          color="blue-gray"
          className="mr-4 ml-2 cursor-pointer py-1.5"
        >
          Search Courier
        </Typography>
        
        {/* Search input field */}
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="blue-gray"
            label="Type here..."
            containerProps={{
              className: "min-w-[288px]", 
            }}
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
      </div>
    </Navbar>
  );
}
