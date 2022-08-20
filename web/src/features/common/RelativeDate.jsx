import { formatDistance } from 'date-fns';


const RelativeDate = ({ date }) => (
    <time dateTime={date.toISOString()} title={date}>
        {formatDistance(date, new Date(), { addSuffix: true })}
    </time>
);


export default RelativeDate;
