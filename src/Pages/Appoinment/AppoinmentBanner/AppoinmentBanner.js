import { DayPicker } from 'react-day-picker';
import chair from '../../../assets/images/chair.png';

const AppoinmentBanner = ({selectedDate, setSelectedDate}) => {
    
    return (
        <div>
            <div className='banner-bg mt-5 p-10 rounded-lg'>
                <div className='banner-bg-overlay'></div>
                <div className="hero ">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt='' />
                        <div>
                            <h2 className='text-primary text-lg font-bold'>Select a date when you want to checkup</h2>
                            <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            ></DayPicker>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AppoinmentBanner;