import { DateRange, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
type stateType = {
  state: Range[]
  setState: React.Dispatch<React.SetStateAction<Range[]>>
}

function Calendario({state, setState}: stateType) {

  function handleOnChange(item:any) {
    console.log(item.selection.startDate)
    setState([item.selection])
  }
  return (
    <div className='absolute right-0 bottom-12 border border-zinc-200 overflow-hidden rounded-lg'>
      <DateRange
        editableDateInputs={true}
        onChange={item => handleOnChange(item)}
        moveRangeOnFirstSelection={false}
        months={2}
        direction='horizontal'
        ranges={state}
      />
    </div>
  )
}

export default Calendario