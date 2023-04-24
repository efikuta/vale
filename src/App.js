import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function App() {
  const [searchParams,] = useSearchParams();
  const [selected, setSelected] = useState(-1);
  const [finish, setFinish] = useState(false);

  const time = searchParams.get('time') || '9';

  function getTimeRanges(startTime, interval = 10, language = window.navigator.language) {
    const ranges = [];
    const date = new Date();
    const format = {
      hour: 'numeric',
      minute: 'numeric',
    };

    for (let minutes = (startTime * 60) - 60; minutes < ((startTime * 60) + 60); minutes = minutes + interval) {
      date.setHours(0);
      date.setMinutes(minutes);
      ranges.push(date.toLocaleTimeString(language, format));
    }

    return ranges;
  }

  return (
    <div className='container mx-auto max-w-screen-lg py-3'>
      <h1 className="text-3xl font-bold  text-center">
        {searchParams.get('bn') || 'None'}
      </h1>
      {!finish &&
        <>
          <div className='mt-5 text-center'>
            {getTimeRanges(parseInt(time)).map((val, idx) => {
              return (
                <span key={idx} className={`border border-black rounded-lg p-2 mx-1 cursor-pointer hover:bg-cyan-600 hover:text-white my-2 inline-block ${selected === idx ? 'bg-cyan-600 text-white' : ''}`} onClick={(e) => { setSelected(idx); }}>
                  {val}
                </span>);
            })}
          </div>
          {selected > -1 &&
            <div className='mt-5' style={{ direction: 'rtl' }}>
              <div className='font-bold text-lg'>חשוב לדעת</div>
              <div className='text-xs'><span className='w-[8px] h-[8px] bg-blue-400 inline-block'></span> המקום יעמוד לרשותכם עד השעה 20:45 וישמר עבורכם ל-15 דק' ממועד ההזמנה.</div>
              <div className='text-xs'><span className='w-[8px] h-[8px] bg-blue-400 inline-block'></span> ניתן לבטל את הזמנתכם דרך הלינק שיישלח אליכם בסמס.</div>

              <div className='text-center'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => { setFinish(true); }}>המשך</button>
              </div>
            </div>}
        </>
      }
      {finish &&
        <div className='mt-3 text-lg text-center' style={{ direction: 'rtl' }}>
          הזמנה מספר 243 אושרה בהצלחה מחכים לראותך!
        </div>}
    </div>
  );
}

export default App;
