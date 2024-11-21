// OrderDetail.js
import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import { HomeIcon, ArchiveBoxIcon } from "@heroicons/react/24/solid";

export function Pickup_Drop_Detail({ type, name, address, phoneNumber }) {
  return (
    <div className="w-[50rem] mt-1">
      <Timeline>
        <TimelineItem className="h-28">
          <TimelineConnector className="!w-[78px]" />
          <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
            <TimelineIcon className="p-3 ml-5" variant="ghost" color={type === 'pickup' ? 'blue' : 'red'}>
              {type === 'pickup' ? <HomeIcon className="h-4 w-4" /> : <ArchiveBoxIcon className="h-4 w-4" />}
            </TimelineIcon>
            <div className="flex flex-col gap-1 ml-5">
              <Typography variant="h5" color="blue-gray">
                {type === 'pickup' ? 'Pickup Details' : 'Drop Details'}
              </Typography>
              <p>{name}</p>
              <Typography variant="small" color="gray" className="font-normal">
                <address>{address}</address>
              </Typography>
              <p>{phoneNumber}</p>
            </div>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
