import Link from "next/link";

export default function AddLocationAdminPage() {
  return (
    <div className="px-3 py-1.5">
      <div className="breadcrumbs text-sm">
        <ul>
          <li><Link href="/admin">Admin</Link></li>
          <li><Link href="/admin/locations">Locations</Link></li>
          <li>Add a location</li>
        </ul>
      </div>
      <div>
        <h1 className="font-bold text-2xl border-0 border-black border-b-2">Add a Location</h1>
        <div className="my-3">
          <form
            // action={action}
            className="flex flex-col w-full"
          >
            <div className="flex flex-col">
              <label className="label flex" htmlFor="name">
                Location name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="input flex w-full"
                autoComplete="off"
              />
            </div>
            {/* {state?.errors?.username && <p>{state.errors.username}</p>} */}

            <div className="flex flex-col mt-4">
              <label htmlFor="description" className="label flex">
                Description
              </label>
              <input
                id="description"
                name="description"
                type="text"
                className="input flex w-full"
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="street-address" className="label flex">
                Street Address
              </label>
              <input
                id="street-address"
                name="street-address"
                type="text"
                className="input flex w-full"
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="city" className="label flex">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                className="input flex w-full"
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="state" className="label flex">
                State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                className="input flex w-full"
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col mt-4">
              <label htmlFor="zip" className="label flex">
                ZIP Code
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                className="input flex w-full"
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col mt-4">
              <label className="label flex">
                Images
              </label>
              <div>
                <div className="p-3 border border-gray-400 rounded">
                  TODO: add image listing
                </div>
                <button className="link">Add an image</button>
              </div>
            </div>
            <div className="flex mt-12 justify-center">
              <button className="btn" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}