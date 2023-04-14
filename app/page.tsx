import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'
import React from 'react'

function page() {
    return (
        <div className='text-white flex flex-col items-center justify-center h-screen px-2'>
            <h1 className='text-5xl font-bold  mb-16'>Ithalli</h1>

            <div className='flex text-center space-x-4 mb-16'>
                <div>
                    <div className='flex flex-col items-center justify-center mb-5'>
                        {/* Sunicon */}
                        <SunIcon className="h-8 w-8" />
                        <h2>Examples</h2>
                    </div>

                    <div className='space-y-4'>
                        <p className='infotext in'>"Explain quantum computing in simple terms"→</p>
                        <p className='infotext in'>"Got any creative ideas for a 10 year old's birthday?"→</p>
                        <p className='infotext in'>"How do I make an HTTP request in Javascript?"→</p>
                    </div>
                </div>

                <div>
                    <div className='flex flex-col items-center justify-center mb-5'>
                        {/* Bolticon */}
                        <BoltIcon className="h-8 w-8" />
                        <h2>Capabilities</h2>
                    </div>

                    <div className='space-y-4'>
                        <p className='infotext'>Trained to decline inappropriate requests</p>
                        <p className='infotext'>Messages are stored in Firebase's Firestore</p>
                        <p className='infotext'>Hot Toast notifications when Ithalli is thinking!</p>
                    </div>
                </div>

                <div>
                    <div className='flex flex-col items-center justify-center mb-5'>
                        {/* ExclamationTriangleIcon */}
                        <ExclamationTriangleIcon className="h-8 w-8" />
                        <h2>Limitations</h2>
                    </div>

                    <div className='space-y-4'>
                        <p className='infotext'>May occasionally generate incorrect information</p>
                        <p className='infotext'>May occasionally produce harmful instructions or biased content</p>
                        <p className='infotext'>Limited knowledge of world and events</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page