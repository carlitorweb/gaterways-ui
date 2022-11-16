import LeftSidebar from './components/body/leftSidebar';
import RightSidebar from './components/body/rightSidebar';
import GaterwaysList from './components/gaterways/list';
import Navbar from './components/header/navbar';

function App() {
    return (
        <>
            <div className='fixed top-0 left-0 h-full w-1/2 bg-white' aria-hidden='true' />
            <div className='fixed top-0 right-0 h-full w-1/2 bg-gray-50' aria-hidden='true' />
            <div className='relative flex min-h-full flex-col'>
                <Navbar />

                {/* 3 column wrapper */}
                <div className='mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8'>
                    {/* Left sidebar & main wrapper */}
                    <div className='min-w-0 flex-1 bg-white xl:flex'>
                        <LeftSidebar />

                        {/* Gaterway List */}
                        <GaterwaysList />
                    </div>
                    {/* Right Sidebar */}
                    <RightSidebar />
                </div>
            </div>
        </>
    );
}
export default App;
