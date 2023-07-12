import clsx from "clsx";

/* eslint-disable react/prop-types */
const Input = ({ label, type, id, required, register, errorMessage, disabled, initialValue }) => {
    return (
        <div className="flex flex-col gap-1 flex-1">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                autoComplete={id}
                className={clsx(
                    "form-input appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
                    errorMessage && "ring-rose-600 border-rose-600"
                )}
                {...required}
                {...register(id)}
                {...disabled}
                defaultValue={initialValue}
            />
            <div className="flex flex-col gap-0.5 mt-2">
                {errorMessage &&
                    errorMessage.map((error) => (
                        <p className="text-sm text-red-600" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default Input;
