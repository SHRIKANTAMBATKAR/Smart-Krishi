function LoadingSpinner({ message = 'Analyzing your crop...' }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-5 animate-fade-in max-w-xs mx-4">
                {/* Spinner */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin" />
                    <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-emerald-400 animate-spin-slow" />
                    <div className="absolute inset-0 flex items-center justify-center text-xl">
                        🌿
                    </div>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-gray-800">{message}</p>
                    <p className="text-xs text-gray-400 mt-1">This may take a few seconds</p>
                </div>

                {/* Pulsing dots */}
                <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary-400 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LoadingSpinner;
