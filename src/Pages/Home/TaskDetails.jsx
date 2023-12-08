import React from 'react'
// task colors
// add remainder
export default function TaskDetails({data, index}) {
  return (
        <div className='details' key={index}>
            <ul>
                <li>
                    {data.step} <br /> {data.date}
                </li>
            </ul>
        </div>
    )
}
