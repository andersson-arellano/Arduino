import { doc } from 'firebase/firestore';
import { useMemo } from 'react';
import { useFirestoreDocData, useFirestore } from 'reactfire';
import { z } from 'zod';

interface AlertInformation {
  distance: string,
  color_500: string,
  color_900: string,
  color_100: string,
  message: string
}

export const div = (
  <>
    <div className='h-0 w-0 bg-blue-500 text-blue-500 border-blue-500'></div>
    <div className='h-0 w-0 bg-blue-900 text-blue-900 border-blue-900'></div>
    <div className='h-0 w-0 bg-blue-100 text-blue-100 border-blue-100'></div>

    <div className='h-0 w-0 bg-teal-500 text-teal-500 border-teal-500'></div>
    <div className='h-0 w-0 bg-teal-900 text-teal-900 border-teal-900'></div>
    <div className='h-0 w-0 bg-teal-100 text-teal-100 border-teal-100'></div>

    <div className='h-0 w-0 bg-yellow-500 text-yellow-500 border-yellow-500'></div>
    <div className='h-0 w-0 bg-yellow-900 text-yellow-900 border-yellow-900'></div>
    <div className='h-0 w-0 bg-yellow-100 text-yellow-100 border-yellow-100'></div>

    <div className='h-0 w-0 bg-red-500 text-red-500 border-red-500'></div>
    <div className='h-0 w-0 bg-red-900 text-red-900 border-red-900'></div>
    <div className='h-0 w-0 bg-red-100 text-red-100 border-red-100'></div>
  </>
)

export default function Distance() {
  const firestore = useFirestore();
  const ref = doc(firestore, 'data', 'currentData');

  const { status, data: data } = useFirestoreDocData(ref);

  const info = useMemo<AlertInformation>(() => {
    if (status === "loading") return {
      color_500: "blue-500",
      color_900: "blue-900",
      color_100: "blue-100",
      distance: "Loading...",
      message: "Please wait."
    };
    const distance = z.number().parse(data.distance);
    if (distance > 3) return {
      color_500: "teal-500",
      color_900: "teal-900",
      color_100: "teal-100",
      distance: `${distance}m`,
      message: "It's all good, you're clear to move.",
    };
    if (distance <= 3 && distance > 2) return {
      color_500: "yellow-500",
      color_900: "yellow-900",
      color_100: "yellow-100",
      distance: `${distance}m`,
      message: "Objects getting closer! Be aware.",
    };
    return {
      color_500: "red-500",
      color_900: "red-900",
      color_100: "red-100",
      distance: `${distance}m`,
      message: "Alright, this is getting dangerous, I better jump off the car.",
    };
  }, [data, status]);

  return (
    <div className={`container w-auto mx-auto h-auto my-auto`}>
      <div className={`bg-${info.color_100} border-t-4 border-${info.color_500} rounded-b text-${info.color_900} px-4 py-3 shadow-md`} role="alert">
        <div className="flex">
          <div className="py-1">
            <svg className={`fill-current h-6 w-6 text-${info.color_500} mr-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">{info.distance}</p>
            <p className="text-sm">{info.message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}