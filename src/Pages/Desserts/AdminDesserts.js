import React, { useState, useEffect } from 'react';
import { getAllDesserts, createDessert, editDessert, deleteDessert } from '../../APIFunctions/Desserts'
import { useSCE } from '../../Components/context/SceContext';

export default function DessertsPage() {
  const [desserts, setDesserts] = useState([]);
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [rating, setRating] = useState();
  const [reloadTable, setReloadTable] = useState(false);
  const { user } = useSCE();

  async function getDessertsFromDB() {
    const dessertsFromDB = await getAllDesserts();
    if (!dessertsFromDB.error) {
      setDesserts(dessertsFromDB.responseData);
    }
  }

  async function handleCreate(name, description, rating) {
    const result = await createDessert({name, description, rating}, user.token);
    setReloadTable((prev) => !prev);
  }

  async function handleEdit(name, description, rating, _id) {
    const result = await editDessert({name, description, rating, _id}, user.token);
    setReloadTable((prev) => !prev);
  }

  async function handleDelete(dessert) {
    const result = await deleteDessert(dessert, user.token);
    setReloadTable((prev) => !prev);
  }

  useEffect(() => {
    getDessertsFromDB();
  }, [reloadTable]);

  const INPUT_CLASS = 'indent-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-white';
  return (
    <div className='m-10'>
      <h1 class="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Welcome to the Desserts Admin Page!!
      </h1>

{/* /////////////////////////////////////////////////////////////////////////////////////// */}

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 grid-cols-full sm:grid-cols-6">
        <div className="col-span-full sm:col-span-4">
          <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-300'>
            Dessert Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="For example, Cake"
              value={name}
              onChange={e => setName(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div className="col-span-full sm:col-span-4">
          <label htmlFor="description" className='block text-sm font-medium leading-6 text-gray-300'>
            Description
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div className="col-span-full sm:col-span-4">
          <label htmlFor="rating" className='block text-sm font-medium leading-6 text-gray-300'>
            Rating
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="rating"
              id="rating"
              value={rating}
              onChange={e => setRating(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>
        <div className="col-span-full sm:col-span-4">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 m-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => handleCreate(
              name,
              description,
              rating
            )}
          >
            Save
          </button>
        </div>
      </div>

{/* /////////////////////////////////////////////////////////////////////////////////////// */}

      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Dessert name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Edit/Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {desserts.map((dessert) => {
              return (
                <tr key={dessert._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {dessert.name}
                  </th>
                  <td className="px-6 py-4">
                    {dessert.description}
                  </td>
                  <td className="px-6 py-4">
                    {dessert.rating}
                  </td>

                  <button 
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 mx-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleEdit(
                      name ? name : dessert.name,
                      description ? description : dessert.description,
                      rating ? rating : dessert.rating,
                      dessert._id
                    )}
                  >
                    Edit
                  </button>

                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 mx-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleDelete(
                      dessert
                    )}
                  >
                    Delete
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

