import { formatDistance } from 'date-fns';


const RelativeDate = ({ date }) => (
    <span title={date}>
        {formatDistance(date, new Date(), { addSuffix: true })}
    </span>
);


export default RelativeDate;
