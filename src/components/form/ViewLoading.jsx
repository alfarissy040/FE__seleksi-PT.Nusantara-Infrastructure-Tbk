const ViewLoading = () => {
    return (
        <div className="w-full h-screen z-50 bg-zinc-900 bg-opacity-60 absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-3xl rounded-lg shadow-md bg-white px-4 py-2 relative">
                {/* content */}
                <div className="mb-2">
                    <div className="h-12 w-72 animate-pulse bg-gray-600" />
                    <div className="h-6 mt-1 w-40 animate-pulse bg-gray-600" />
                </div>
                <div className="grid grid-cols-6 gap-y-2">
                    <div className="w-full h-52 animate-pulse bg-gray-600 col-span-6" />
                    <div className="gap-x-3 md:col-span-3 col-span-6 grid grid-cols-3 items-start">
                        <div className="h-8 w-24 animate-pulse bg-gray-600" />
                        <div className="h-8 w-52 animate-pulse bg-gray-600" />
                    </div>
                    <div className="gap-x-3 md:col-span-3 col-span-6 grid grid-cols-3 items-start">
                        <div className="h-8 w-24 animate-pulse bg-gray-600" />
                        <div className="h-8 w-52 animate-pulse bg-gray-600" />
                    </div>
                    <div className="gap-x-3 md:col-span-3 col-span-6 grid grid-cols-3 items-start">
                        <div className="h-8 w-24 animate-pulse bg-gray-600" />
                        <div className="h-8 w-52 animate-pulse bg-gray-600" />
                    </div>
                    <div className="gap-x-3 md:col-span-3 col-span-6 grid grid-cols-3 items-start">
                        <div className="h-8 w-24 animate-pulse bg-gray-600" />
                        <div className="h-8 w-52 animate-pulse bg-gray-600" />
                    </div>
                    <div className="gap-x-3 md:col-span-3 col-span-6 grid grid-cols-3 items-start">
                        <div className="h-8 w-24 animate-pulse bg-gray-600" />
                        <div className="h-8 w-52 animate-pulse bg-gray-600" />
                    </div>
                    <div className="gap-x-3 md:col-span-3 col-span-6 grid grid-cols-3 items-start">
                        <div className="h-8 w-24 animate-pulse bg-gray-600" />
                        <div className="h-8 w-52 animate-pulse bg-gray-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewLoading;
